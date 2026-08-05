import { createHash } from 'node:crypto'
import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises'
import { inflateRawSync } from 'node:zlib'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'

const ZIP_END = 0x06054b50
const ZIP_CENTRAL_FILE = 0x02014b50
const ZIP_LOCAL_FILE = 0x04034b50

const exists = async (path) =>
  access(path)
    .then(() => true)
    .catch(() => false)

function safeRelativePath(value) {
  if (typeof value !== 'string' || !value.trim())
    throw new Error('Leerer Dateipfad im Patchpaket.')
  const normalized = value.replaceAll('\\', '/')
  if (
    normalized.startsWith('/') ||
    isAbsolute(normalized) ||
    normalized.split('/').some((part) => part === '..' || part === '')
  )
    throw new Error(`Unsicherer Dateipfad im Patchpaket: ${value}`)
  return normalized
}

function inside(root, value) {
  const destination = resolve(root, ...safeRelativePath(value).split('/'))
  const fromRoot = relative(resolve(root), destination)
  if (
    fromRoot.startsWith(`..${sep}`) ||
    fromRoot === '..' ||
    isAbsolute(fromRoot)
  )
    throw new Error(`Dateipfad verlässt den Zielordner: ${value}`)
  return destination
}

function findEndRecord(buffer) {
  const minimum = Math.max(0, buffer.length - 65_557)
  for (let offset = buffer.length - 22; offset >= minimum; offset -= 1) {
    if (buffer.readUInt32LE(offset) === ZIP_END) return offset
  }
  throw new Error('Das ZIP-Endverzeichnis fehlt.')
}

function readZip(buffer) {
  const end = findEndRecord(buffer)
  const count = buffer.readUInt16LE(end + 10)
  let cursor = buffer.readUInt32LE(end + 16)
  const entries = new Map()
  for (let index = 0; index < count; index += 1) {
    if (buffer.readUInt32LE(cursor) !== ZIP_CENTRAL_FILE)
      throw new Error('Das ZIP-Inhaltsverzeichnis ist beschädigt.')
    const flags = buffer.readUInt16LE(cursor + 8)
    const method = buffer.readUInt16LE(cursor + 10)
    const compressedSize = buffer.readUInt32LE(cursor + 20)
    const uncompressedSize = buffer.readUInt32LE(cursor + 24)
    const nameLength = buffer.readUInt16LE(cursor + 28)
    const extraLength = buffer.readUInt16LE(cursor + 30)
    const commentLength = buffer.readUInt16LE(cursor + 32)
    const localOffset = buffer.readUInt32LE(cursor + 42)
    const rawName = buffer.subarray(cursor + 46, cursor + 46 + nameLength)
    const name = rawName.toString(flags & 0x800 ? 'utf8' : 'utf8')
    cursor += 46 + nameLength + extraLength + commentLength
    const portableName = name.replaceAll('\\', '/')
    if (portableName.endsWith('/')) continue
    const safeName = safeRelativePath(portableName)
    if (flags & 1)
      throw new Error(`Verschlüsselte ZIP-Datei nicht erlaubt: ${name}`)
    if (![0, 8].includes(method))
      throw new Error(`Nicht unterstützte ZIP-Komprimierung für ${name}.`)
    if (buffer.readUInt32LE(localOffset) !== ZIP_LOCAL_FILE)
      throw new Error(`Lokaler ZIP-Eintrag beschädigt: ${name}`)
    const localNameLength = buffer.readUInt16LE(localOffset + 26)
    const localExtraLength = buffer.readUInt16LE(localOffset + 28)
    const dataOffset = localOffset + 30 + localNameLength + localExtraLength
    const compressed = buffer.subarray(dataOffset, dataOffset + compressedSize)
    const data =
      method === 0 ? Buffer.from(compressed) : inflateRawSync(compressed)
    if (data.length !== uncompressedSize)
      throw new Error(`Falsche Dateigröße nach dem Entpacken: ${name}`)
    if (entries.has(safeName)) throw new Error(`Doppelter ZIP-Eintrag: ${name}`)
    entries.set(safeName, data)
  }
  return entries
}

function parseJson(entries, name) {
  const data = entries.get(name)
  if (!data) throw new Error(`${name} fehlt im Patchpaket.`)
  try {
    return JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''))
  } catch {
    throw new Error(`${name} enthält kein gültiges JSON.`)
  }
}

function validateManifest(manifest) {
  const requiredStrings = [
    'patchId',
    'type',
    'fromVersion',
    'toVersion',
    'minimumAppVersion',
    'contentVersion',
    'payloadRoot',
  ]
  if (
    !manifest ||
    typeof manifest !== 'object' ||
    requiredStrings.some((key) => typeof manifest[key] !== 'string') ||
    !Array.isArray(manifest.files) ||
    !Array.isArray(manifest.removeBeforeInstall)
  )
    throw new Error('Das Patch-Manifest ist unvollständig.')
  if (manifest.payloadRoot !== 'payload')
    throw new Error('Dieses Werkzeug erwartet payload als Paketwurzel.')
  manifest.removeBeforeInstall.forEach(safeRelativePath)
}

function compareVersions(first, second) {
  const parse = (version) => {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
    if (!match) throw new Error(`Ungültige Versionsnummer: ${version}`)
    return match.slice(1).map(Number)
  }
  const left = parse(first)
  const right = parse(second)
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index]
  }
  return 0
}

function validateChecksums(entries, checksums) {
  if (
    !checksums ||
    checksums.algorithm !== 'SHA-256' ||
    !checksums.files ||
    typeof checksums.files !== 'object'
  )
    throw new Error('Die SHA-256-Prüfsummenliste fehlt oder ist ungültig.')
  const payloadEntries = [...entries.keys()].filter((name) =>
    name.startsWith('payload/'),
  )
  const listed = Object.keys(checksums.files)
  if (payloadEntries.length !== listed.length)
    throw new Error(
      'Nicht alle Patchdateien sind in der Prüfsummenliste erfasst.',
    )
  for (const relativeName of listed) {
    const safeName = safeRelativePath(relativeName)
    const data = entries.get(`payload/${safeName}`)
    if (!data) throw new Error(`Patchdatei fehlt: ${safeName}`)
    const actual = createHash('sha256').update(data).digest('hex')
    if (actual !== checksums.files[relativeName])
      throw new Error(`Prüfsumme stimmt nicht: ${safeName}`)
  }
  return listed.map(safeRelativePath)
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const targetIndex = args.indexOf('--target')
  const targetArgument = targetIndex >= 0 ? args[targetIndex + 1] : undefined
  const patchPath = args.find(
    (value, index) => !value.startsWith('--') && index !== targetIndex + 1,
  )
  const target = resolve(targetArgument ?? process.cwd())
  if (!patchPath) {
    console.error(
      'Verwendung: npm run patch:import -- <patch.zip> [--target <ordner>] [--dry-run]',
    )
    process.exitCode = 2
    return
  }

  const entries = readZip(await readFile(resolve(patchPath)))
  const manifest = parseJson(entries, 'manifest.json')
  const checksums = parseJson(entries, 'checksums.json')
  validateManifest(manifest)
  const files = validateChecksums(entries, checksums)

  const targetPackagePath = inside(target, 'package.json')
  const targetPackage = JSON.parse(await readFile(targetPackagePath, 'utf8'))
  if (targetPackage.version !== manifest.fromVersion)
    throw new Error(
      `Das Patch erwartet Version ${manifest.fromVersion}; installiert ist ${targetPackage.version}.`,
    )
  if (compareVersions(targetPackage.version, manifest.minimumAppVersion) < 0)
    throw new Error(
      `Das Patch benötigt mindestens App-Version ${manifest.minimumAppVersion}.`,
    )
  if (compareVersions(manifest.toVersion, manifest.fromVersion) <= 0)
    throw new Error('Die Zielversion des Patches muss neuer sein.')

  const payloadPackage = JSON.parse(
    entries.get('payload/package.json')?.toString('utf8') ?? '{}',
  )
  if (payloadPackage.version !== manifest.toVersion)
    throw new Error('Zielversion und payload/package.json widersprechen sich.')

  console.log(
    `Patch ${manifest.patchId}: ${manifest.fromVersion} → ${manifest.toVersion}, ${files.length} Dateien geprüft.`,
  )
  if (dryRun) {
    console.log('Trockenlauf erfolgreich; es wurden keine Dateien verändert.')
    return
  }

  const stamp = new Date()
    .toISOString()
    .replaceAll(':', '-')
    .replaceAll('.', '-')
  const backupRoot = inside(
    target,
    `.piano-backups/${manifest.fromVersion}-to-${manifest.toVersion}-${stamp}`,
  )
  const staging = await mkdtemp(inside(target, '.piano-update-'))
  const changed = new Set([...files, ...manifest.removeBeforeInstall])
  const created = []
  try {
    for (const file of files) {
      const staged = inside(staging, file)
      await mkdir(dirname(staged), { recursive: true })
      await writeFile(staged, entries.get(`payload/${file}`))
    }
    for (const file of changed) {
      const current = inside(target, file)
      if (await exists(current)) {
        const backup = inside(backupRoot, file)
        await mkdir(dirname(backup), { recursive: true })
        await copyFile(current, backup)
      } else created.push(file)
    }
    for (const file of manifest.removeBeforeInstall) {
      await rm(inside(target, file), { force: true })
    }
    for (const file of files) {
      const destination = inside(target, file)
      await mkdir(dirname(destination), { recursive: true })
      await copyFile(inside(staging, file), destination)
    }
    await writeFile(
      inside(backupRoot, 'rollback.json'),
      JSON.stringify({ manifest, created }, null, 2),
    )
    console.log(`Patch erfolgreich installiert. Sicherung: ${backupRoot}`)
  } catch (error) {
    for (const file of created) await rm(inside(target, file), { force: true })
    for (const file of changed) {
      const backup = inside(backupRoot, file)
      if (await exists(backup)) {
        const destination = inside(target, file)
        await mkdir(dirname(destination), { recursive: true })
        await copyFile(backup, destination)
      }
    }
    throw error
  } finally {
    await rm(staging, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(`Patch-Import fehlgeschlagen: ${error.message}`)
  process.exitCode = 1
})
