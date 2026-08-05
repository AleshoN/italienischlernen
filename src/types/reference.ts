export type SourceReference = {
  id: string
  sourceName: string
  sourceVersion: string
  license: string
  originalUrl: string | null
  modificationNote: string
  attributionRequired: boolean
}

export type DictionaryEntry = {
  id: string
  lemma: string
  language: 'it'
  translations: string[]
  partOfSpeech: string
  gender: null
  plural: null
  pronunciation: string
  ipa: string | null
  meanings: string[]
  examples: { italian: string; german: string }[]
  synonyms: string[]
  antonyms: string[]
  collocations: string[]
  register: 'informell' | 'neutral' | 'höflich'
  frequency: 'sehr häufig' | 'häufig'
  conjugationId: string | null
  grammarIds: string[]
  lessonIds: string[]
  sources: SourceReference[]
  license: string
}

export type GrammarRule = {
  id: string
  title: string
  category: string
  simpleExplanation: string
  detailedExplanation: string
  formation: string
  usage: string[]
  examples: { italian: string; german: string; note?: string }[]
  counterExamples: { text: string; explanation: string }[]
  exceptions: string[]
  commonErrors: { error: string; correction: string; explanation: string }[]
  germanComparison: string
  relatedRuleIds: string[]
  lessonIds: string[]
  exerciseIds: string[]
  vocabularyIds: string[]
  sources: SourceReference[]
}

export type Conjugation = {
  id: string
  lemma: string
  auxiliary: string
  isReflexive: boolean
  tense: 'presente'
  forms: { person: string; pronoun: string; form: string }[]
  notes: string[]
  grammarIds: string[]
  lessonIds: string[]
  sources: SourceReference[]
}

export type PersonalWordList = {
  id: string
  title: string
  wordIds: string[]
  createdAt: string
}
