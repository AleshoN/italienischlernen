import type { ExerciseAttempt } from './exercises'
import type { PersonalWordList } from './reference'
import type { ReviewSchedule } from './review'

type SectionBase = {
  id: string
  title: string
}

export type LessonSection = SectionBase &
  (
    | {
        type: 'text'
        body: string
      }
    | {
        type: 'phrases'
        body?: string
        phrases: { italian: string; german: string; note?: string }[]
      }
    | {
        type: 'list'
        body?: string
        items: string[]
      }
    | {
        type: 'comparison'
        body?: string
        rows: { situation: string; italian: string; german: string }[]
      }
  )

export type Course = {
  id: string
  title: string
  level: string
  version: string
  moduleIds: string[]
  prerequisites: string[]
  learningOutcomes: string[]
}

export type CourseModule = {
  id: string
  courseId: string
  order: number
  title: string
  description: string
  chapterIds: string[]
  assessmentId: string | null
}

export type Chapter = {
  id: string
  moduleId: string
  order: number
  title: string
  description: string
  lessonIds: string[]
}

export type LegacyLessonSection = {
  id: string
  title: string
  body: string
  phrase?: string
  translation?: string
}

export type Lesson = {
  id: string
  moduleId: string
  order: number
  title: string
  eyebrow: string
  durationMinutes: number
  objectives: string[]
  prerequisites: string[]
  sections: LessonSection[]
  vocabularyIds: string[]
  grammarIds: string[]
  exerciseIds: string[]
  summary: string[]
  assessmentId: null
  contentVersion: string
}

export type UserProgress = {
  schemaVersion: 6
  userIdLocal: string
  completedLessonIds: string[]
  lessonScores: Record<string, number>
  exerciseAttempts: ExerciseAttempt[]
  bookmarks: string[]
  difficultItems: string[]
  reviewSchedule: ReviewSchedule
  settings: {
    theme: 'light' | 'dark' | 'system'
  }
  lastActivity: string | null
  activityHistory: ActivityEntry[]
  favoriteWordIds: string[]
  wordLists: PersonalWordList[]
  appVersion: string
  contentVersion: string
}

export type ActivityEntry = {
  id: string
  lessonId: string
  action:
    | 'completed'
    | 'bookmarked'
    | 'bookmark-removed'
    | 'exercise-completed'
    | 'test-completed'
  occurredAt: string
}
