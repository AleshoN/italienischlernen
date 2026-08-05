export type OpenDictionaryEntry = {
  id: string
  lemma: string
  partsOfSpeech: string[]
  meanings: string[]
  ipa: string | null
  forms: string[]
  examples: { italian: string; german: string }[]
  sourceUrl: string
}

export type OpenDictionaryPack = {
  schemaVersion: 1
  source: {
    name: string
    pageUrl: string
    downloadUrl: string
    lastModified: string | null
    license: string
    licenseUrl: string
    attributionRequired: boolean
    extractionTool: string
  }
  sourceRecords: number
  distinctWords: number
  entries: OpenDictionaryEntry[]
}
