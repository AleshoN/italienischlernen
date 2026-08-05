import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { createInterface } from 'node:readline'

const SOURCE_URL =
  'https://kaikki.org/dewiktionary/Italienisch/kaikki.org-dictionary-Italienisch.jsonl'
const SOURCE_PAGE = 'https://kaikki.org/dewiktionary/Italienisch/index.html'
const LICENSE_URL =
  'https://de.wiktionary.org/wiki/Wiktionary:Lizenzbestimmungen'
const OUTPUT_PATH = 'public/data/dictionary-it-de.wiktionary.json'

const response = await fetch(SOURCE_URL, {
  headers: { 'User-Agent': 'Piano-Italian-Dictionary-Importer/1.0' },
})
if (!response.ok || !response.body) {
  throw new Error(`Wörterbuch-Download fehlgeschlagen: HTTP ${response.status}`)
}

const addUnique = (target, values, limit) => {
  for (const value of values) {
    const cleaned = typeof value === 'string' ? value.trim() : ''
    if (cleaned && !target.includes(cleaned)) target.push(cleaned)
    if (target.length >= limit) break
  }
}

const stableId = (word) => {
  const digest = createHash('sha256')
    .update(word.normalize('NFC'))
    .digest('hex')
    .slice(0, 16)
  return `word.it.dewiktionary.${digest}`
}

const entriesByWord = new Map()
let sourceRecords = 0
const lines = createInterface({
  input: Readable.fromWeb(response.body),
  crlfDelay: Infinity,
})

for await (const line of lines) {
  if (!line.trim()) continue
  const raw = JSON.parse(line)
  if (raw.lang_code !== 'it' || typeof raw.word !== 'string') continue
  sourceRecords += 1
  const lemma = raw.word.normalize('NFC').trim()
  if (!lemma) continue
  let entry = entriesByWord.get(lemma)
  if (!entry) {
    entry = {
      id: stableId(lemma),
      lemma,
      partsOfSpeech: [],
      meanings: [],
      ipa: null,
      forms: [],
      examples: [],
      sourceUrl: `https://de.wiktionary.org/wiki/${encodeURIComponent(lemma)}`,
    }
    entriesByWord.set(lemma, entry)
  }

  addUnique(entry.partsOfSpeech, [raw.pos_title || raw.pos], 8)
  addUnique(
    entry.meanings,
    (raw.senses || []).flatMap((sense) => sense.glosses || []),
    16,
  )
  addUnique(
    entry.forms,
    (raw.forms || []).map((form) => form.form),
    40,
  )
  if (!entry.ipa) {
    entry.ipa = (raw.sounds || [])
      .map((sound) => sound.ipa)
      .find((ipa) => typeof ipa === 'string' && !ipa.includes('…'))
  }
  for (const sense of raw.senses || []) {
    for (const example of sense.examples || []) {
      if (
        entry.examples.length < 2 &&
        typeof example.text === 'string' &&
        typeof example.translation === 'string' &&
        !entry.examples.some((item) => item.italian === example.text)
      ) {
        entry.examples.push({
          italian: example.text.trim(),
          german: example.translation.trim(),
        })
      }
    }
  }
}

const entries = [...entriesByWord.values()].sort((left, right) =>
  left.lemma.localeCompare(right.lemma, 'it', { sensitivity: 'base' }),
)
const lastModified = response.headers.get('last-modified')
const pack = {
  schemaVersion: 1,
  source: {
    name: 'Deutschsprachiges Wiktionary – Italienisch',
    pageUrl: SOURCE_PAGE,
    downloadUrl: SOURCE_URL,
    lastModified,
    license: 'CC BY-SA 4.0',
    licenseUrl: LICENSE_URL,
    attributionRequired: true,
    extractionTool: 'Wiktextract / Kaikki.org',
  },
  sourceRecords,
  distinctWords: entries.length,
  entries,
}

await mkdir('public/data', { recursive: true })
const output = JSON.stringify(pack)
await writeFile(OUTPUT_PATH, output)
console.log(
  `${OUTPUT_PATH}: ${entries.length.toLocaleString('de-DE')} Wörter, ${(Buffer.byteLength(output) / 1024 / 1024).toFixed(2)} MiB`,
)
