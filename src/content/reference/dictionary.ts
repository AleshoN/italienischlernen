import type { DictionaryEntry } from '../../types/reference'
import { allVocabulary } from '../a0/curriculum'
import { projectSource } from './source'

const entry = (
  data: Omit<
    DictionaryEntry,
    | 'language'
    | 'gender'
    | 'plural'
    | 'ipa'
    | 'synonyms'
    | 'antonyms'
    | 'sources'
    | 'license'
  >,
): DictionaryEntry => ({
  ...data,
  language: 'it',
  gender: null,
  plural: null,
  ipa: null,
  synonyms: [],
  antonyms: [],
  sources: [projectSource],
  license: projectSource.license,
})

const coreDictionaryEntries: DictionaryEntry[] = [
  entry({
    id: 'word.it.ciao',
    lemma: 'ciao',
    translations: ['hallo', 'tschüss'],
    partOfSpeech: 'Grußformel',
    pronunciation: 'tschau',
    meanings: ['Informelle Begrüßung oder Verabschiedung.'],
    examples: [{ italian: 'Ciao, Anna!', german: 'Hallo, Anna!' }],
    collocations: ['Ciao, come stai?'],
    register: 'informell',
    frequency: 'sehr häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.register.greetings.001'],
    lessonIds: ['lesson.it.a0.02.01'],
  }),
  entry({
    id: 'word.it.buongiorno',
    lemma: 'buongiorno',
    translations: ['guten Morgen', 'guten Tag'],
    partOfSpeech: 'Grußformel',
    pronunciation: 'buon-dschór-no',
    meanings: ['Höfliche Begrüßung am Morgen und tagsüber.'],
    examples: [
      {
        italian: 'Buongiorno, signora!',
        german: 'Guten Morgen, gnädige Frau!',
      },
    ],
    collocations: [],
    register: 'höflich',
    frequency: 'sehr häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.register.greetings.001'],
    lessonIds: ['lesson.it.a0.02.01'],
  }),
  entry({
    id: 'word.it.buonasera',
    lemma: 'buonasera',
    translations: ['guten Abend'],
    partOfSpeech: 'Grußformel',
    pronunciation: 'buo-na-sé-ra',
    meanings: ['Höfliche Begrüßung am Abend.'],
    examples: [{ italian: 'Buonasera!', german: 'Guten Abend!' }],
    collocations: [],
    register: 'höflich',
    frequency: 'sehr häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.register.greetings.001'],
    lessonIds: ['lesson.it.a0.02.01'],
  }),
  entry({
    id: 'word.it.per-favore',
    lemma: 'per favore',
    translations: ['bitte'],
    partOfSpeech: 'Höflichkeitsformel',
    pronunciation: 'per fa-vó-re',
    meanings: ['Feste Wendung, mit der eine Bitte höflich formuliert wird.'],
    examples: [
      { italian: 'Un caffè, per favore.', german: 'Einen Kaffee, bitte.' },
    ],
    collocations: [],
    register: 'höflich',
    frequency: 'sehr häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.politeness.formulas.001'],
    lessonIds: ['lesson.it.a0.02.02'],
  }),
  entry({
    id: 'word.it.grazie',
    lemma: 'grazie',
    translations: ['danke'],
    partOfSpeech: 'Höflichkeitsformel',
    pronunciation: 'grá-tsje',
    meanings: ['Dankesformel.'],
    examples: [{ italian: 'Grazie, Luca!', german: 'Danke, Luca!' }],
    collocations: ['grazie mille'],
    register: 'neutral',
    frequency: 'sehr häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.politeness.formulas.001'],
    lessonIds: ['lesson.it.a0.02.02'],
  }),
  entry({
    id: 'word.it.prego',
    lemma: 'prego',
    translations: ['bitte schön', 'gern geschehen'],
    partOfSpeech: 'Höflichkeitsformel',
    pronunciation: 'pré-go',
    meanings: ['Mögliche Antwort auf einen Dank.'],
    examples: [
      { italian: 'Grazie! — Prego!', german: 'Danke! — Bitte schön!' },
    ],
    collocations: [],
    register: 'neutral',
    frequency: 'sehr häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.politeness.formulas.001'],
    lessonIds: ['lesson.it.a0.02.02'],
  }),
  entry({
    id: 'word.it.mi-chiamo',
    lemma: 'mi chiamo',
    translations: ['ich heiße'],
    partOfSpeech: 'feste Verbform',
    pronunciation: 'mi kjá-mo',
    meanings: ['Feste Form, mit der die sprechende Person ihren Namen nennt.'],
    examples: [{ italian: 'Mi chiamo Anna.', german: 'Ich heiße Anna.' }],
    collocations: ['mi chiamo …'],
    register: 'neutral',
    frequency: 'sehr häufig',
    conjugationId: 'verb.it.chiamarsi',
    grammarIds: ['grammar.it.expression.mi-chiamo.001'],
    lessonIds: ['lesson.it.a0.02.03'],
  }),
  entry({
    id: 'word.it.come-ti-chiami',
    lemma: 'come ti chiami?',
    translations: ['wie heißt du?'],
    partOfSpeech: 'feste Frage',
    pronunciation: 'kó-me ti kjá-mi',
    meanings: [
      'Informelle Frage nach dem Namen einer vertrauten oder gleichaltrigen Person.',
    ],
    examples: [
      { italian: 'Ciao! Come ti chiami?', german: 'Hallo! Wie heißt du?' },
    ],
    collocations: [],
    register: 'informell',
    frequency: 'sehr häufig',
    conjugationId: 'verb.it.chiamarsi',
    grammarIds: ['grammar.it.expression.mi-chiamo.001'],
    lessonIds: ['lesson.it.a0.02.03'],
  }),
  entry({
    id: 'word.it.piacere',
    lemma: 'piacere',
    translations: ['freut mich'],
    partOfSpeech: 'feste Wendung',
    pronunciation: 'pja-tsché-re',
    meanings: ['Kurze höfliche Reaktion beim Kennenlernen.'],
    examples: [{ italian: 'Piacere, Anna!', german: 'Freut mich, Anna!' }],
    collocations: [],
    register: 'höflich',
    frequency: 'häufig',
    conjugationId: null,
    grammarIds: ['grammar.it.politeness.formulas.001'],
    lessonIds: ['lesson.it.a0.02.03'],
  }),
]

const coreIds = new Set(coreDictionaryEntries.map((item) => item.id))
const generatedDictionaryEntries: DictionaryEntry[] = allVocabulary
  .filter((item) => !coreIds.has(item.id))
  .map((item) =>
    entry({
      id: item.id,
      lemma: item.italian,
      translations: [item.german],
      partOfSpeech: 'A0-Wortschatz',
      pronunciation: 'nach den italienischen Lautregeln',
      meanings: [`Kursbedeutung: ${item.german}.`],
      examples: [{ italian: item.italian, german: item.german }],
      collocations: [],
      register: 'neutral',
      frequency: 'häufig',
      conjugationId: null,
      grammarIds: [],
      lessonIds: [item.lessonId],
    }),
  )

export const dictionaryEntries: DictionaryEntry[] = [
  ...coreDictionaryEntries,
  ...generatedDictionaryEntries,
]

export const dictionaryEntryById = (id: string) =>
  dictionaryEntries.find((item) => item.id === id)
