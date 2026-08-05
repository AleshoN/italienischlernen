import type { Conjugation } from '../../types/reference'
import { projectSource } from './source'

const coreConjugations: Conjugation[] = [
  {
    id: 'verb.it.chiamarsi',
    lemma: 'chiamarsi',
    auxiliary: 'essere',
    isReflexive: true,
    tense: 'presente',
    forms: [
      { person: '1. Person Singular', pronoun: 'io', form: 'mi chiamo' },
      { person: '2. Person Singular', pronoun: 'tu', form: 'ti chiami' },
      {
        person: '3. Person Singular',
        pronoun: 'lui / lei / Lei',
        form: 'si chiama',
      },
      { person: '1. Person Plural', pronoun: 'noi', form: 'ci chiamiamo' },
      { person: '2. Person Plural', pronoun: 'voi', form: 'vi chiamate' },
      { person: '3. Person Plural', pronoun: 'loro', form: 'si chiamano' },
    ],
    notes: [
      'Die Lektion verlangt zunächst nur mi chiamo. Die übrigen Formen sind hier als Nachschlagehilfe sichtbar.',
      'Chiamarsi ist reflexiv; das kleine Reflexivpronomen ändert sich mit der Person.',
    ],
    grammarIds: ['grammar.it.expression.mi-chiamo.001'],
    lessonIds: ['lesson.it.a0.02.03'],
    sources: [projectSource],
  },
]

const forms = (values: string[]): Conjugation['forms'] =>
  ['io', 'tu', 'lui / lei / Lei', 'noi', 'voi', 'loro'].map(
    (pronoun, index) => ({
      person: `${index === 0 || index === 3 ? '1.' : index === 1 || index === 4 ? '2.' : '3.'} Person ${index < 3 ? 'Singular' : 'Plural'}`,
      pronoun,
      form: values[index],
    }),
  )

const verb = (
  id: string,
  lemma: string,
  values: string[],
  grammarIds: string[],
  lessonIds: string[],
  auxiliary = 'avere',
): Conjugation => ({
  id,
  lemma,
  auxiliary,
  isReflexive: false,
  tense: 'presente',
  forms: forms(values),
  notes: [
    'Diese Tabelle zeigt die sechs Präsensformen, die im A0-Kurs verwendet werden.',
  ],
  grammarIds,
  lessonIds,
  sources: [projectSource],
})

export const conjugations: Conjugation[] = [
  ...coreConjugations,
  verb(
    'verb.it.essere',
    'essere',
    ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
    ['grammar.it.verb.essere.001'],
    ['lesson.it.a0.04.02'],
    'essere',
  ),
  verb(
    'verb.it.avere',
    'avere',
    ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
    ['grammar.it.verb.avere.001'],
    ['lesson.it.a0.05.04'],
  ),
  verb(
    'verb.it.parlare',
    'parlare',
    ['parlo', 'parli', 'parla', 'parliamo', 'parlate', 'parlano'],
    ['grammar.it.verb.are.001'],
    ['lesson.it.a0.07.02'],
  ),
  verb(
    'verb.it.lavorare',
    'lavorare',
    ['lavoro', 'lavori', 'lavora', 'lavoriamo', 'lavorate', 'lavorano'],
    ['grammar.it.verb.are.001'],
    ['lesson.it.a0.07.02'],
  ),
  verb(
    'verb.it.prendere',
    'prendere',
    ['prendo', 'prendi', 'prende', 'prendiamo', 'prendete', 'prendono'],
    ['grammar.it.verb.ere.001'],
    ['lesson.it.a0.07.03'],
  ),
  verb(
    'verb.it.leggere',
    'leggere',
    ['leggo', 'leggi', 'legge', 'leggiamo', 'leggete', 'leggono'],
    ['grammar.it.verb.ere.001'],
    ['lesson.it.a0.07.03'],
  ),
  verb(
    'verb.it.dormire',
    'dormire',
    ['dormo', 'dormi', 'dorme', 'dormiamo', 'dormite', 'dormono'],
    ['grammar.it.verb.ire.001'],
    ['lesson.it.a0.07.04'],
  ),
  verb(
    'verb.it.partire',
    'partire',
    ['parto', 'parti', 'parte', 'partiamo', 'partite', 'partono'],
    ['grammar.it.verb.ire.001'],
    ['lesson.it.a0.07.04'],
  ),
  verb(
    'verb.it.andare',
    'andare',
    ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'],
    ['grammar.it.verb.andare.001'],
    ['lesson.it.a0.10.05'],
    'essere',
  ),
  verb(
    'verb.it.venire',
    'venire',
    ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono'],
    ['grammar.it.verb.venire.001'],
    ['lesson.it.a0.10.06'],
    'essere',
  ),
]

export const conjugationById = (id: string) =>
  conjugations.find((item) => item.id === id)
