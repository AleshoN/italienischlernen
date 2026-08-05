import type { Lesson } from '../../types/content'

export const politenessLesson: Lesson = {
  id: 'lesson.it.a0.02.02',
  moduleId: 'module.it.a0.02',
  order: 2,
  title: 'Höflichkeit',
  eyebrow: 'Lektion 2 · A0',
  durationMinutes: 6,
  objectives: ['Bitte sagen, danken und freundlich reagieren.'],
  prerequisites: ['lesson.it.a0.02.01'],
  sections: [
    {
      id: 'section.it.a0.02.02.001',
      type: 'text',
      title: 'Kleine Wörter, große Wirkung',
      body: 'Mit wenigen festen Wendungen klingst du auch mit sehr wenig Italienisch freundlich und respektvoll.',
    },
    {
      id: 'section.it.a0.02.02.002',
      type: 'phrases',
      title: 'Bitte und danke',
      phrases: [
        { italian: 'Per favore.', german: 'Bitte.' },
        { italian: 'Grazie.', german: 'Danke.' },
        { italian: 'Prego.', german: 'Bitte schön. / Gern geschehen.' },
      ],
    },
    {
      id: 'section.it.a0.02.02.003',
      type: 'list',
      title: 'Merke dir',
      items: [
        'Per favore ergänzt eine Bitte.',
        'Grazie ist der Dank.',
        'Prego ist eine mögliche Antwort auf grazie.',
      ],
    },
  ],
  vocabularyIds: ['word.it.per-favore', 'word.it.grazie', 'word.it.prego'],
  grammarIds: ['grammar.it.politeness.formulas.001'],
  exerciseIds: ['exercise.it.a0.02.02.001', 'exercise.it.a0.02.02.002'],
  summary: [
    'Per favore bedeutet „bitte“.',
    'Grazie bedeutet „danke“.',
    'Auf grazie kannst du mit prego antworten.',
  ],
  assessmentId: null,
  contentVersion: '0.6.0',
}
