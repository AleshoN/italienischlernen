import type { Lesson } from '../../types/content'

export const introductionsLesson: Lesson = {
  id: 'lesson.it.a0.02.03',
  moduleId: 'module.it.a0.02',
  order: 3,
  title: 'Sich vorstellen',
  eyebrow: 'Lektion 3 · A0',
  durationMinutes: 7,
  objectives: [
    'Den eigenen Namen nennen und nach dem Namen einer Person fragen.',
  ],
  prerequisites: ['lesson.it.a0.02.01', 'lesson.it.a0.02.02'],
  sections: [
    {
      id: 'section.it.a0.02.03.001',
      type: 'text',
      title: 'Dein Name auf Italienisch',
      body: 'Die feste Wendung mi chiamo verwendest du, um deinen Namen zu nennen. Für diese erste Begegnung lernst du sie als Ganzes.',
    },
    {
      id: 'section.it.a0.02.03.002',
      type: 'phrases',
      title: 'Name und Rückfrage',
      phrases: [
        { italian: 'Mi chiamo Anna.', german: 'Ich heiße Anna.' },
        {
          italian: 'Come ti chiami?',
          german: 'Wie heißt du?',
          note: 'informell',
        },
        { italian: 'Piacere!', german: 'Freut mich!' },
      ],
    },
    {
      id: 'section.it.a0.02.03.003',
      type: 'comparison',
      title: 'Ein Minidialog',
      rows: [
        {
          situation: 'Person A',
          italian: 'Ciao! Mi chiamo Anna.',
          german: 'Hallo! Ich heiße Anna.',
        },
        {
          situation: 'Person B',
          italian: 'Ciao! Mi chiamo Luca. Piacere!',
          german: 'Hallo! Ich heiße Luca. Freut mich!',
        },
      ],
    },
  ],
  vocabularyIds: [
    'word.it.mi-chiamo',
    'word.it.come-ti-chiami',
    'word.it.piacere',
  ],
  grammarIds: ['grammar.it.expression.mi-chiamo.001'],
  exerciseIds: ['exercise.it.a0.02.03.001', 'exercise.it.a0.02.03.002'],
  summary: [
    'Mi chiamo … nennt deinen Namen.',
    'Come ti chiami? fragt informell nach dem Namen.',
    'Piacere! passt beim Kennenlernen.',
  ],
  assessmentId: null,
  contentVersion: '0.6.0',
}
