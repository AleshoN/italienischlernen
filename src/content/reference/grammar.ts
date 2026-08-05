import type { GrammarRule } from '../../types/reference'
import { generatedGrammarRules } from '../a0/grammar-rules'
import { projectSource } from './source'

const coreGrammarRules: GrammarRule[] = [
  {
    id: 'grammar.it.register.greetings.001',
    title: 'Begrüßungen und Situation',
    category: 'Register',
    simpleExplanation:
      'Ciao ist informell. Buongiorno und buonasera sind höfliche Begrüßungen.',
    detailedExplanation:
      'Die Wahl hängt von der Beziehung zur Person und von der Tageszeit ab. Für den Einstieg reicht diese Unterscheidung; regionale Gewohnheiten werden später vertieft.',
    formation: 'Die Grußformeln werden zunächst als feste Wendungen gelernt.',
    usage: [
      'Ciao bei vertrauten Personen.',
      'Buongiorno morgens und tagsüber in höflichen Situationen.',
      'Buonasera am Abend in höflichen Situationen.',
    ],
    examples: [
      { italian: 'Ciao, Luca!', german: 'Hallo, Luca!', note: 'informell' },
      {
        italian: 'Buonasera, signora!',
        german: 'Guten Abend!',
        note: 'höflich',
      },
    ],
    counterExamples: [
      {
        text: 'Ciao in jeder formellen Situation verwenden.',
        explanation:
          'Für den Einstieg ist eine höfliche Grußformel dort die sicherere Wahl.',
      },
    ],
    exceptions: [
      'Tageszeitliche Grenzen können regional und situativ variieren.',
    ],
    commonErrors: [
      {
        error: 'Buonasera am Morgen',
        correction: 'Buongiorno',
        explanation: 'Buonasera gehört zur Begrüßung am Abend.',
      },
    ],
    germanComparison:
      'Wie im Deutschen unterscheiden sich vertraute und höfliche Situationen; die italienischen Wendungen werden jedoch nicht Wort für Wort zusammengesetzt.',
    relatedRuleIds: ['grammar.it.politeness.formulas.001'],
    lessonIds: ['lesson.it.a0.02.01'],
    exerciseIds: ['exercise.it.a0.02.01.001', 'exercise.it.a0.02.01.002'],
    vocabularyIds: ['word.it.ciao', 'word.it.buongiorno', 'word.it.buonasera'],
    sources: [projectSource],
  },
  {
    id: 'grammar.it.politeness.formulas.001',
    title: 'Feste Höflichkeitsformeln',
    category: 'Kommunikation',
    simpleExplanation:
      'Per favore macht eine Bitte höflich, grazie dankt und prego kann auf den Dank antworten.',
    detailedExplanation:
      'Diese Wendungen funktionieren als feste kommunikative Bausteine. Eine grammatische Zerlegung ist auf diesem Lernstand nicht nötig.',
    formation: 'per favore · grazie · prego',
    usage: [
      'Per favore bei einer Bitte.',
      'Grazie als Dank.',
      'Prego als mögliche Antwort auf grazie.',
    ],
    examples: [
      { italian: 'Un caffè, per favore.', german: 'Einen Kaffee, bitte.' },
      { italian: 'Grazie! — Prego!', german: 'Danke! — Bitte schön!' },
    ],
    counterExamples: [
      {
        text: 'Prego als Dank verwenden.',
        explanation: 'Der Dank lautet grazie; prego ist eine mögliche Antwort.',
      },
    ],
    exceptions: [
      'Prego besitzt weitere Bedeutungen, die erst später eingeführt werden.',
    ],
    commonErrors: [
      {
        error: 'Prego! sagen, wenn man selbst dankt.',
        correction: 'Grazie!',
        explanation: 'Grazie drückt den Dank aus.',
      },
    ],
    germanComparison:
      'Die Gesprächsfunktion entspricht „bitte“, „danke“ und „gern geschehen“, die Verwendung ist aber nicht in jeder Situation wortgleich.',
    relatedRuleIds: ['grammar.it.register.greetings.001'],
    lessonIds: ['lesson.it.a0.02.02', 'lesson.it.a0.02.03'],
    exerciseIds: ['exercise.it.a0.02.02.001', 'exercise.it.a0.02.02.002'],
    vocabularyIds: [
      'word.it.per-favore',
      'word.it.grazie',
      'word.it.prego',
      'word.it.piacere',
    ],
    sources: [projectSource],
  },
  {
    id: 'grammar.it.expression.mi-chiamo.001',
    title: 'Die feste Form „mi chiamo“',
    category: 'Feste Verbform',
    simpleExplanation: 'Mit mi chiamo und deinem Namen stellst du dich vor.',
    detailedExplanation:
      'Mi chiamo gehört zum reflexiven Verb chiamarsi. In dieser frühen Lektion wird nur die vollständige feste Form für io gelernt; die Konjugationstabelle dient als Nachschlagehilfe.',
    formation: 'Mi chiamo + Name.',
    usage: ['Den eigenen Namen nennen.'],
    examples: [{ italian: 'Mi chiamo Anna.', german: 'Ich heiße Anna.' }],
    counterExamples: [
      {
        text: 'Mi chiamo?',
        explanation:
          'Für die Frage an eine vertraute Person lautet die gelernte Wendung come ti chiami?',
      },
    ],
    exceptions: [
      'In einer knappen Vorstellung ist auch sono + Name möglich; diese Form wird später systematisch eingeführt.',
    ],
    commonErrors: [
      {
        error: 'Chiamo Anna.',
        correction: 'Mi chiamo Anna.',
        explanation: 'Bei der gelernten Form gehört mi dazu.',
      },
    ],
    germanComparison:
      'Italienisch verwendet wörtlich eine reflexive Verbform; die natürliche deutsche Übersetzung lautet „ich heiße“.',
    relatedRuleIds: [],
    lessonIds: ['lesson.it.a0.02.03'],
    exerciseIds: ['exercise.it.a0.02.03.001', 'exercise.it.a0.02.03.002'],
    vocabularyIds: ['word.it.mi-chiamo', 'word.it.come-ti-chiami'],
    sources: [projectSource],
  },
]

export const grammarRules: GrammarRule[] = [
  ...coreGrammarRules,
  ...generatedGrammarRules,
]

export const grammarRuleById = (id: string) =>
  grammarRules.find((item) => item.id === id)
