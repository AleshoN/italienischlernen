import type { Lesson } from '../../types/content'

export const demoLesson: Lesson = {
  id: 'lesson.it.a0.02.01',
  moduleId: 'module.it.a0.02',
  order: 1,
  title: 'Begrüßen',
  eyebrow: 'Demo-Lektion · A0',
  durationMinutes: 5,
  objectives: [
    'Drei einfache italienische Begrüßungen erkennen und passend verwenden.',
  ],
  prerequisites: [],
  sections: [
    {
      id: 'section.it.a0.02.01.001',
      type: 'text',
      title: 'Begrüßungen richten sich nach der Situation',
      body: 'Im Italienischen wählst du eine Begrüßung danach, wie gut du die Person kennst und zu welcher Tageszeit ihr euch begegnet.',
    },
    {
      id: 'section.it.a0.02.01.002',
      type: 'phrases',
      title: 'Drei Begrüßungen',
      phrases: [
        { italian: 'Ciao!', german: 'Hallo! / Tschüss!', note: 'informell' },
        {
          italian: 'Buongiorno!',
          german: 'Guten Morgen! / Guten Tag!',
          note: 'höflich, morgens und tagsüber',
        },
        {
          italian: 'Buonasera!',
          german: 'Guten Abend!',
          note: 'höflich, am Abend',
        },
      ],
    },
    {
      id: 'section.it.a0.02.01.003',
      type: 'comparison',
      title: 'Welche Begrüßung passt?',
      rows: [
        {
          situation: 'Du triffst einen Freund.',
          italian: 'Ciao!',
          german: 'Hallo!',
        },
        {
          situation: 'Du betrittst morgens ein Geschäft.',
          italian: 'Buongiorno!',
          german: 'Guten Morgen!',
        },
        {
          situation: 'Du kommst abends ins Restaurant.',
          italian: 'Buonasera!',
          german: 'Guten Abend!',
        },
      ],
    },
  ],
  vocabularyIds: ['word.it.ciao', 'word.it.buongiorno', 'word.it.buonasera'],
  grammarIds: ['grammar.it.register.greetings.001'],
  exerciseIds: ['exercise.it.a0.02.01.001', 'exercise.it.a0.02.01.002'],
  summary: [
    'Ciao ist informell.',
    'Buongiorno passt morgens und tagsüber.',
    'Buonasera passt am Abend.',
  ],
  assessmentId: null,
  contentVersion: '0.6.0',
}
