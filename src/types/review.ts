export type ReviewTargetKind = 'exercise' | 'word' | 'grammar'

export type ReviewRating = 'again' | 'hard' | 'good'

export type ReviewScheduleItem = {
  targetId: string
  kind: ReviewTargetKind
  dueAt: string
  lastReviewedAt: string | null
  intervalDays: number
  streak: number
  lapses: number
}

export type ReviewSchedule = Record<string, ReviewScheduleItem>
