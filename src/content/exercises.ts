import type { Exercise } from '../types/exercises'
import {
  lessonId,
  lessonSpecs,
  vocabularyForLesson,
  wordId,
} from './a0/curriculum'

const coreExercises: Exercise[] = [
  {
    id: 'exercise.it.a0.02.01.001',
    lessonId: 'lesson.it.a0.02.01',
    type: 'multiple-choice',
    prompt: 'Du triffst einen guten Freund. Welche Begrüßung passt?',
    options: [
      { id: 'ciao', text: 'Ciao!' },
      { id: 'buonasera', text: 'Buonasera!' },
      { id: 'grazie', text: 'Grazie!' },
    ],
    answer: 'ciao',
    explanation:
      'Ciao ist die informelle Begrüßung für Menschen, mit denen du per Du bist.',
    errorFeedback:
      'Achte auf die Situation: Es ist ein guter Freund. Dafür passt die informelle Begrüßung.',
    hints: ['Gesucht ist die informelle Begrüßung.'],
    grammarIds: ['grammar.it.register.greetings.001'],
    vocabularyIds: ['word.it.ciao'],
    difficulty: 1,
    contentVersion: '1.0.0',
  },
  {
    id: 'exercise.it.a0.02.01.002',
    lessonId: 'lesson.it.a0.02.01',
    type: 'matching',
    prompt: 'Ordne jeder Situation die passende Begrüßung zu.',
    pairs: [
      { id: 'friend', left: 'Ein Freund', right: 'Ciao!' },
      { id: 'shop', left: 'Morgens im Geschäft', right: 'Buongiorno!' },
      { id: 'restaurant', left: 'Abends im Restaurant', right: 'Buonasera!' },
    ],
    answer: { friend: 'friend', shop: 'shop', restaurant: 'restaurant' },
    explanation:
      'Ciao ist informell; buongiorno passt morgens und tagsüber; buonasera am Abend.',
    errorFeedback: 'Prüfe noch einmal Nähe zur Person und Tageszeit.',
    hints: [
      'Beginne mit dem Freund: Dafür kennst du eine informelle Begrüßung.',
    ],
    grammarIds: ['grammar.it.register.greetings.001'],
    vocabularyIds: ['word.it.ciao', 'word.it.buongiorno', 'word.it.buonasera'],
    difficulty: 2,
    contentVersion: '1.0.0',
  },
  {
    id: 'exercise.it.a0.02.02.001',
    lessonId: 'lesson.it.a0.02.02',
    type: 'fill-blank',
    prompt: 'Ergänze die höfliche Bitte.',
    template: 'Un caffè, ___ .',
    answer: 'per favore',
    acceptedAnswers: ['per favore'],
    explanation: 'Per favore bedeutet „bitte“ und ergänzt hier die Bestellung.',
    errorFeedback: 'Gesucht ist die feste Wendung für „bitte“.',
    hints: ['Die Wendung besteht aus zwei Wörtern.'],
    grammarIds: ['grammar.it.politeness.formulas.001'],
    vocabularyIds: ['word.it.per-favore'],
    difficulty: 1,
    contentVersion: '1.0.0',
  },
  {
    id: 'exercise.it.a0.02.02.002',
    lessonId: 'lesson.it.a0.02.02',
    type: 'free-text',
    prompt: 'Wie sagst du auf Italienisch „Danke“?',
    answer: 'Grazie',
    acceptedAnswers: ['grazie', 'grazie!'],
    explanation: 'Grazie bedeutet „Danke“.',
    errorFeedback:
      'Denke an die Wendung, auf die man mit prego antworten kann.',
    hints: ['Das Wort beginnt mit G.'],
    grammarIds: ['grammar.it.politeness.formulas.001'],
    vocabularyIds: ['word.it.grazie'],
    difficulty: 1,
    contentVersion: '1.0.0',
  },
  {
    id: 'exercise.it.a0.02.03.001',
    lessonId: 'lesson.it.a0.02.03',
    type: 'sentence-order',
    prompt: 'Bringe die Vorstellung in die richtige Reihenfolge.',
    tokens: [
      { id: 'anna', text: 'Anna.' },
      { id: 'chiamo', text: 'chiamo' },
      { id: 'mi', text: 'Mi' },
    ],
    answer: ['mi', 'chiamo', 'anna'],
    explanation: 'Die feste Wendung lautet: Mi chiamo Anna.',
    errorFeedback: 'Beginne mit Mi und setze danach chiamo vor den Namen.',
    hints: ['Das erste Wort ist Mi.'],
    grammarIds: ['grammar.it.expression.mi-chiamo.001'],
    vocabularyIds: ['word.it.mi-chiamo'],
    difficulty: 2,
    contentVersion: '1.0.0',
  },
  {
    id: 'exercise.it.a0.02.03.002',
    lessonId: 'lesson.it.a0.02.03',
    type: 'conjugation',
    prompt:
      'Ergänze nur die gelernte feste Form. Eine allgemeine Konjugationsregel brauchst du noch nicht.',
    infinitive: 'chiamarsi',
    subject: 'io',
    template: 'Io ___ Anna.',
    answer: 'mi chiamo',
    acceptedAnswers: ['mi chiamo'],
    explanation: 'Für „Ich heiße …“ hast du die feste Form mi chiamo gelernt.',
    errorFeedback: 'Verwende die ganze feste Wendung aus der Lektion: mi …',
    hints: ['Die Lösung besteht aus zwei Wörtern.'],
    grammarIds: ['grammar.it.expression.mi-chiamo.001'],
    vocabularyIds: ['word.it.mi-chiamo'],
    difficulty: 2,
    contentVersion: '1.0.0',
  },
]

const generatedExercises: Exercise[] = lessonSpecs
  .filter((spec) => !(spec.module === 2 && spec.lesson <= 3))
  .flatMap((spec) => {
    const vocabulary = vocabularyForLesson(spec.module, spec.lesson)
    const primary = vocabulary[0]
    const secondary = vocabulary[1] ?? primary
    const alternatives = vocabulary.slice(1, 4)
    const prefix = `exercise.it.a0.${String(spec.module).padStart(2, '0')}.${String(spec.lesson).padStart(2, '0')}`
    const linkedGrammar = spec.grammarIds
    const first: Exercise = {
      id: `${prefix}.001`,
      lessonId: lessonId(spec.module, spec.lesson),
      type: 'multiple-choice',
      prompt: `Was bedeutet „${primary.italian}“?`,
      options: [
        { id: 'correct', text: primary.german },
        ...alternatives.slice(0, 2).map((item, index) => ({
          id: `alternative-${index + 1}`,
          text: item.german,
        })),
      ],
      answer: 'correct',
      explanation: `„${primary.italian}“ bedeutet „${primary.german}“.`,
      errorFeedback:
        'Vergleiche die Form noch einmal mit der Wortschatzliste dieser Lerneinheit.',
      hints: [
        `Der deutsche Ausdruck beginnt mit „${primary.german.charAt(0)}“.`,
      ],
      grammarIds: linkedGrammar,
      vocabularyIds: [wordId(primary.italian)],
      difficulty: 1,
      contentVersion: '1.0.0',
    }
    const second: Exercise = {
      id: `${prefix}.002`,
      lessonId: lessonId(spec.module, spec.lesson),
      type: 'free-text',
      prompt: `Wie heißt „${secondary.german}“ auf Italienisch?`,
      answer: secondary.italian,
      acceptedAnswers: [secondary.italian],
      explanation: `Die passende Form lautet „${secondary.italian}“.`,
      errorFeedback: 'Achte auf alle Wörter und auf einen möglichen Akzent.',
      hints: [`Die Lösung beginnt mit „${secondary.italian.charAt(0)}“.`],
      grammarIds: linkedGrammar,
      vocabularyIds: [wordId(secondary.italian)],
      difficulty: spec.module >= 7 ? 2 : 1,
      contentVersion: '1.0.0',
    }
    return [first, second]
  })

export const exercises: Exercise[] = [...coreExercises, ...generatedExercises]

export const exerciseById = (id: string) =>
  exercises.find((exercise) => exercise.id === id)
export const exercisesForLesson = (lessonId: string) =>
  exercises.filter((exercise) => exercise.lessonId === lessonId)
