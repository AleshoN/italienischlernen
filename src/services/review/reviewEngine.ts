import { exercises } from '../../content/exercises'
import type { ExerciseAttempt } from '../../types/exercises'
import type {
  ReviewRating,
  ReviewSchedule,
  ReviewScheduleItem,
  ReviewTargetKind,
} from '../../types/review'

const GOOD_INTERVALS = [1, 3, 7, 14, 30, 60]
const DAY_IN_MS = 24 * 60 * 60 * 1000

export const reviewKindForTarget = (targetId: string): ReviewTargetKind => {
  if (targetId.startsWith('word.')) return 'word'
  if (targetId.startsWith('grammar.')) return 'grammar'
  return 'exercise'
}

const addMinutes = (isoDate: string, minutes: number) =>
  new Date(new Date(isoDate).getTime() + minutes * 60 * 1000).toISOString()

const addDays = (isoDate: string, days: number) =>
  new Date(new Date(isoDate).getTime() + days * DAY_IN_MS).toISOString()

export function ensureReviewTarget(
  schedule: ReviewSchedule,
  targetId: string,
  dueAt: string,
): ReviewSchedule {
  if (schedule[targetId]) return schedule
  return {
    ...schedule,
    [targetId]: {
      targetId,
      kind: reviewKindForTarget(targetId),
      dueAt,
      lastReviewedAt: null,
      intervalDays: 0,
      streak: 0,
      lapses: 0,
    },
  }
}

export function removeReviewTarget(
  schedule: ReviewSchedule,
  targetId: string,
): ReviewSchedule {
  const next = { ...schedule }
  delete next[targetId]
  return next
}

export function scheduleReview(
  schedule: ReviewSchedule,
  targetId: string,
  rating: ReviewRating,
  reviewedAt: string,
): ReviewSchedule {
  const current: ReviewScheduleItem = schedule[targetId] ?? {
    targetId,
    kind: reviewKindForTarget(targetId),
    dueAt: reviewedAt,
    lastReviewedAt: null,
    intervalDays: 0,
    streak: 0,
    lapses: 0,
  }

  if (rating === 'again')
    return {
      ...schedule,
      [targetId]: {
        ...current,
        dueAt: addMinutes(reviewedAt, 10),
        lastReviewedAt: reviewedAt,
        intervalDays: 0,
        streak: 0,
        lapses: current.lapses + 1,
      },
    }

  if (rating === 'hard') {
    const intervalDays = Math.max(1, Math.round(current.intervalDays * 1.5))
    return {
      ...schedule,
      [targetId]: {
        ...current,
        dueAt: addDays(reviewedAt, intervalDays),
        lastReviewedAt: reviewedAt,
        intervalDays,
      },
    }
  }

  const streak = current.streak + 1
  const intervalDays =
    GOOD_INTERVALS[Math.min(streak - 1, GOOD_INTERVALS.length - 1)]
  return {
    ...schedule,
    [targetId]: {
      ...current,
      dueAt: addDays(reviewedAt, intervalDays),
      lastReviewedAt: reviewedAt,
      intervalDays,
      streak,
    },
  }
}

export function scheduleExerciseAttempt(
  schedule: ReviewSchedule,
  exerciseId: string,
  correct: boolean,
  reviewedAt: string,
): ReviewSchedule {
  const exercise = exercises.find((item) => item.id === exerciseId)
  if (!exercise) return schedule
  const targets = [
    exercise.id,
    ...exercise.vocabularyIds,
    ...exercise.grammarIds,
  ]
  return targets.reduce(
    (next, targetId) =>
      scheduleReview(next, targetId, correct ? 'good' : 'again', reviewedAt),
    schedule,
  )
}

export function migrateLegacyReviewSchedule(
  legacy: Record<string, string>,
): ReviewSchedule {
  return Object.fromEntries(
    Object.entries(legacy).flatMap(([targetId, dueAt]) => {
      if (Number.isNaN(new Date(dueAt).getTime())) return []
      return [
        [
          targetId,
          {
            targetId,
            kind: reviewKindForTarget(targetId),
            dueAt,
            lastReviewedAt: null,
            intervalDays: 0,
            streak: 0,
            lapses: 0,
          },
        ],
      ]
    }),
  )
}

const localDayKey = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const shiftLocalDay = (value: Date, days: number) => {
  const shifted = new Date(value)
  shifted.setHours(12, 0, 0, 0)
  shifted.setDate(shifted.getDate() + days)
  return shifted
}

const calculateStreak = (attempts: ExerciseAttempt[], now: Date) => {
  const activeDays = new Set(
    attempts.map((item) => localDayKey(item.occurredAt)),
  )
  let cursor = new Date(now)
  cursor.setHours(12, 0, 0, 0)
  if (!activeDays.has(localDayKey(cursor))) cursor = shiftLocalDay(cursor, -1)
  let streak = 0
  while (activeDays.has(localDayKey(cursor))) {
    streak += 1
    cursor = shiftLocalDay(cursor, -1)
  }
  return { activeDays: activeDays.size, streak }
}

export function getDueReviewTargets(
  schedule: ReviewSchedule,
  now = new Date(),
) {
  const nowTime = now.getTime()
  return Object.values(schedule)
    .filter((item) => new Date(item.dueAt).getTime() <= nowTime)
    .sort(
      (left, right) =>
        new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime(),
    )
}

export function calculateLearningInsights(
  attempts: ExerciseAttempt[],
  difficultItems: string[],
  now = new Date(),
) {
  const ordered = [...attempts].sort(
    (left, right) =>
      new Date(right.occurredAt).getTime() -
      new Date(left.occurredAt).getTime(),
  )
  const attemptsByExercise = new Map<string, ExerciseAttempt[]>()
  for (const attempt of ordered) {
    const items = attemptsByExercise.get(attempt.exerciseId) ?? []
    items.push(attempt)
    attemptsByExercise.set(attempt.exerciseId, items)
  }

  const errors = [...attemptsByExercise.entries()]
    .filter(([, items]) => !items[0].correct)
    .map(([exerciseId, items]) => ({
      exerciseId,
      attempts: items.length,
      wrongAttempts: items.filter((item) => !item.correct).length,
      lastAttemptAt: items[0].occurredAt,
    }))

  const automaticWordIds = errors.flatMap(
    ({ exerciseId }) =>
      exercises.find((item) => item.id === exerciseId)?.vocabularyIds ?? [],
  )
  const difficultWordIds = [
    ...new Set([
      ...difficultItems.filter((id) => id.startsWith('word.')),
      ...automaticWordIds,
    ]),
  ]

  const grammarIds = [
    ...new Set(exercises.flatMap((exercise) => exercise.grammarIds)),
  ]
  const weakGrammar = grammarIds.flatMap((grammarId) => {
    const grammarExerciseIds = new Set(
      exercises
        .filter((exercise) => exercise.grammarIds.includes(grammarId))
        .map((exercise) => exercise.id),
    )
    const items = ordered.filter((attempt) =>
      grammarExerciseIds.has(attempt.exerciseId),
    )
    if (!items.length) return []
    const correct = items.filter((item) => item.correct).length
    const score = Math.round((correct / items.length) * 100)
    const hasOpenError = errors.some((error) =>
      grammarExerciseIds.has(error.exerciseId),
    )
    return score < 75 || hasOpenError
      ? [{ grammarId, attempts: items.length, score }]
      : []
  })

  const correct = ordered.filter((attempt) => attempt.correct).length
  const { activeDays, streak } = calculateStreak(ordered, now)
  return {
    totalAttempts: ordered.length,
    correctAttempts: correct,
    accuracy: ordered.length ? Math.round((correct / ordered.length) * 100) : 0,
    activeDays,
    streak,
    errors,
    difficultWordIds,
    weakGrammar,
  }
}

export function buildTargetedExercises(
  attempts: ExerciseAttempt[],
  difficultItems: string[],
  schedule: ReviewSchedule,
  now = new Date(),
) {
  const insights = calculateLearningInsights(attempts, difficultItems, now)
  const targetIds = new Set<string>(
    insights.errors.map((item) => item.exerciseId),
  )
  for (const target of getDueReviewTargets(schedule, now)) {
    if (target.kind === 'exercise') targetIds.add(target.targetId)
    for (const exercise of exercises) {
      if (
        (target.kind === 'word' &&
          exercise.vocabularyIds.includes(target.targetId)) ||
        (target.kind === 'grammar' &&
          exercise.grammarIds.includes(target.targetId))
      )
        targetIds.add(exercise.id)
    }
  }
  return exercises.filter((exercise) => targetIds.has(exercise.id)).slice(0, 6)
}
