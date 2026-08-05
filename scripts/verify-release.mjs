import { readFile, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const root = resolve(process.cwd())
const read = (path) => readFile(join(root, path), 'utf8')
const checks = []
const check = (condition, message) => {
  if (!condition) throw new Error(message)
  checks.push(message)
}

const packageJson = JSON.parse(await read('package.json'))
const manifest = JSON.parse(await read('dist/manifest.webmanifest'))
const index = await read('dist/index.html')
const serviceWorker = await read('dist/sw.js')
const cssPath = index.match(/href="(\/assets\/[^"?]+\.css)"/)?.[1]
const scriptPath = index.match(/src="(\/assets\/[^"?]+\.js)"/)?.[1]

check(packageJson.version === '1.0.0', 'Paketversion ist 1.0.0')
check(
  manifest.start_url === '/#/' && manifest.scope === '/',
  'PWA-Start und Gültigkeitsbereich sind korrekt',
)
check(manifest.display === 'standalone', 'PWA startet eigenständig')
check(
  Array.isArray(manifest.icons) && manifest.icons.length > 0,
  'PWA-Symbol ist eingetragen',
)
check(
  serviceWorker.includes('piano-app-v1.0.0-r1'),
  'Service-Worker verwendet den Releasecache',
)
check(
  serviceWorker.includes('cacheAppShell'),
  'Service-Worker lädt die erzeugten Build-Dateien vor',
)
check(index.includes('<html lang="de">'), 'Dokumentsprache ist Deutsch')
check(index.includes('width=device-width'), 'Mobil-Viewport ist gesetzt')
check(Boolean(cssPath && scriptPath), 'Build verweist auf CSS und JavaScript')

for (const path of [
  cssPath,
  scriptPath,
  '/icons/icon.svg',
  '/data/dictionary-it-de.wiktionary.json',
]) {
  const file = join(root, 'dist', path.slice(1))
  check((await stat(file)).size > 0, `${path} ist im Offlinepaket enthalten`)
}

const css = await read(`dist${cssPath}`)
check(
  !css.includes('fonts.googleapis.com'),
  'Darstellung benötigt keine Online-Schrift',
)
check(css.includes('.skip-link'), 'Tastatur-Sprunglink ist gestaltet')
check(
  css.includes('prefers-reduced-motion'),
  'Reduzierte Bewegung wird berücksichtigt',
)

const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    )
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}
const contrast = (first, second) => {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}
for (const [foreground, background, name] of [
  ['#21332e', '#f6f4ee', 'heller Fließtext'],
  ['#586b63', '#f6f4ee', 'heller Sekundärtext'],
  ['#f0f2ed', '#111a17', 'dunkler Fließtext'],
  ['#a6b5ae', '#111a17', 'dunkler Sekundärtext'],
  ['#ffffff', '#1f6653', 'Text auf Akzentfläche'],
  ['#174d40', '#fffdf8', 'Primärknopf auf heller Fläche'],
]) {
  check(
    contrast(foreground, background) >= 4.5,
    `${name} erreicht mindestens 4,5:1`,
  )
}

console.log(`${checks.length} Releaseprüfungen erfolgreich.`)
