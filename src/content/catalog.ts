import type {
  Chapter,
  Course,
  CourseModule,
  Lesson,
  LessonSection,
} from '../types/content'
import {
  lessonSpecs,
  moduleSpecs,
  vocabularyForLesson,
  vocabularyIdsForLesson,
  lessonId,
} from './a0/curriculum'
import { demoLesson } from './lessons/demo-greetings'
import { introductionsLesson } from './lessons/introductions'
import { politenessLesson } from './lessons/politeness'

const VERSION = '1.0.0'

const moduleId = (value: number) =>
  `module.it.a0.${String(value).padStart(2, '0')}`
const chapterId = (value: number) =>
  `chapter.it.a0.${String(value).padStart(2, '0')}.01`
const exerciseIds = (module: number, lesson: number) => [
  `exercise.it.a0.${String(module).padStart(2, '0')}.${String(lesson).padStart(2, '0')}.001`,
  `exercise.it.a0.${String(module).padStart(2, '0')}.${String(lesson).padStart(2, '0')}.002`,
]

export const course: Course = {
  id: 'course.it.a0',
  title: 'Italienisch A0',
  level: 'A0',
  version: VERSION,
  moduleIds: moduleSpecs.map((module) => moduleId(module.number)),
  prerequisites: [],
  learningOutcomes: [
    'Alltägliche Begegnungen, persönliche Angaben, Zeit, Essen, Orientierung und Einkaufen mit einfachen italienischen Mitteln bewältigen.',
  ],
}

export const modules: CourseModule[] = moduleSpecs.map((module) => ({
  id: moduleId(module.number),
  courseId: course.id,
  order: module.number,
  title: module.title,
  description: module.description,
  chapterIds: [chapterId(module.number)],
  assessmentId: `assessment.it.a0.${String(module.number).padStart(2, '0')}`,
}))

export const chapters: Chapter[] = moduleSpecs.map((module) => ({
  id: chapterId(module.number),
  moduleId: moduleId(module.number),
  order: 1,
  title: module.title,
  description: module.description,
  lessonIds: module.lessons.map((item) => lessonId(module.number, item.lesson)),
}))

const legacyLessons = new Map(
  [demoLesson, politenessLesson, introductionsLesson].map((item) => [
    item.id,
    item,
  ]),
)

const makeSections = (
  id: string,
  title: string,
  objective: string,
  vocabulary: { italian: string; german: string }[],
): LessonSection[] => [
  {
    id: `${id}.section.01`,
    title: 'Einfach erklärt',
    type: 'text',
    body: `${objective} Arbeite zuerst die Beispiele durch und rufe die Formen danach ohne Hinsehen ab.`,
  },
  {
    id: `${id}.section.02`,
    title: 'Wörter und Wendungen',
    type: 'phrases',
    body: `Dieser Wortschatz gehört verbindlich zur Lerneinheit „${title}“.`,
    phrases: vocabulary.map((item) => ({
      italian: item.italian,
      german: item.german,
    })),
  },
  {
    id: `${id}.section.03`,
    title: 'Aktiv anwenden',
    type: 'list',
    body: 'Kurze Produktion festigt die neuen Formen.',
    items: [
      'Lies alle italienischen Beispiele deutlich und langsam laut.',
      'Decke die italienische Seite ab und rufe mindestens fünf Formen aktiv ab.',
      'Bilde eine eigene Mini-Situation und prüfe sie anschließend mit den Beispielen.',
    ],
  },
]

export const lessons: Lesson[] = lessonSpecs.map((spec) => {
  const id = lessonId(spec.module, spec.lesson)
  const vocabulary = vocabularyForLesson(spec.module, spec.lesson)
  const legacy = legacyLessons.get(id)
  if (legacy) {
    return {
      ...legacy,
      moduleId: moduleId(spec.module),
      vocabularyIds: [
        ...new Set([
          ...legacy.vocabularyIds,
          ...vocabularyIdsForLesson(spec.module, spec.lesson),
        ]),
      ],
      grammarIds: spec.grammarIds,
      contentVersion: VERSION,
    }
  }
  return {
    id,
    moduleId: moduleId(spec.module),
    order: spec.lesson,
    title: spec.title,
    eyebrow: `Modul ${spec.module} · ${moduleSpecs.find((item) => item.number === spec.module)!.title}`,
    durationMinutes: spec.module === 12 ? 18 : 12,
    objectives: [spec.objective],
    prerequisites:
      spec.lesson > 1 ? [lessonId(spec.module, spec.lesson - 1)] : [],
    sections: makeSections(id, spec.title, spec.objective, vocabulary),
    vocabularyIds: vocabularyIdsForLesson(spec.module, spec.lesson),
    grammarIds: spec.grammarIds,
    exerciseIds: exerciseIds(spec.module, spec.lesson),
    summary: [
      spec.objective,
      'Neue Wörter aktiv abrufen und in einer eigenen Situation verwenden.',
    ],
    assessmentId: null,
    contentVersion: VERSION,
  }
})

export const lessonById = (id?: string) =>
  lessons.find((lesson) => lesson.id === id)
export const chapterByLessonId = (id: string) =>
  chapters.find((chapter) => chapter.lessonIds.includes(id))
export const moduleById = (id: string) =>
  modules.find((module) => module.id === id)

export function lessonNeighbors(id: string) {
  const index = lessons.findIndex((lesson) => lesson.id === id)
  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 ? lessons[index + 1] : undefined,
  }
}
