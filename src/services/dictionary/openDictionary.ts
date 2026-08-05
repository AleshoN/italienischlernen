import type {
  OpenDictionaryEntry,
  OpenDictionaryPack,
} from '../../types/open-dictionary'

const PACK_PATH = 'data/dictionary-it-de.wiktionary.json'
let packPromise: Promise<OpenDictionaryPack> | null = null

export const normalizeDictionaryText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('it')
    .trim()

export const openEntryMatches = (
  entry: OpenDictionaryEntry,
  normalizedQuery: string,
) => {
  if (!normalizedQuery) return true
  return normalizeDictionaryText(
    [
      entry.lemma,
      ...entry.partsOfSpeech,
      ...entry.meanings,
      ...entry.forms,
    ].join(' '),
  ).includes(normalizedQuery)
}

const isDictionaryPack = (value: unknown): value is OpenDictionaryPack => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<OpenDictionaryPack>
  return (
    candidate.schemaVersion === 1 &&
    typeof candidate.distinctWords === 'number' &&
    Array.isArray(candidate.entries) &&
    candidate.entries.length === candidate.distinctWords
  )
}

export function loadOpenDictionary() {
  packPromise ??= fetch(`${import.meta.env.BASE_URL}${PACK_PATH}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Wörterbuch konnte nicht geladen werden (${response.status}).`,
        )
      return response.json() as Promise<unknown>
    })
    .then((data) => {
      if (!isDictionaryPack(data))
        throw new Error('Das Wörterbuch-Datenpaket ist ungültig.')
      return data
    })
  return packPromise
}

export function resetOpenDictionaryCacheForTests() {
  packPromise = null
}
