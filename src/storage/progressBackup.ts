import type { UserProgress } from '../types/content'

export const PROGRESS_BACKUP_FORMAT = 'piano-progress-backup'
export const PROGRESS_BACKUP_FORMAT_VERSION = 1

export type ProgressBackup = {
  format: typeof PROGRESS_BACKUP_FORMAT
  formatVersion: typeof PROGRESS_BACKUP_FORMAT_VERSION
  exportedAt: string
  appVersion: string
  contentVersion: string
  progress: UserProgress
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isNumberRecord = (value: unknown) =>
  isRecord(value) &&
  Object.values(value).every((item) => typeof item === 'number')

const isAttemptArray = (value: unknown) =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.id === 'string' &&
      typeof item.exerciseId === 'string' &&
      typeof item.lessonId === 'string' &&
      typeof item.exerciseType === 'string' &&
      typeof item.correct === 'boolean' &&
      typeof item.occurredAt === 'string',
  )

const isActivityArray = (value: unknown) =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.id === 'string' &&
      typeof item.lessonId === 'string' &&
      typeof item.action === 'string' &&
      typeof item.occurredAt === 'string',
  )

const isWordListArray = (value: unknown) =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      isStringArray(item.wordIds) &&
      typeof item.createdAt === 'string',
  )

const isReviewSchedule = (value: unknown) =>
  isRecord(value) &&
  Object.values(value).every(
    (item) =>
      isRecord(item) &&
      typeof item.targetId === 'string' &&
      typeof item.kind === 'string' &&
      typeof item.dueAt === 'string' &&
      typeof item.streak === 'number' &&
      typeof item.lapses === 'number',
  )

function isProgress(value: unknown): value is UserProgress {
  if (!isRecord(value)) return false
  const settings = value.settings
  return (
    value.schemaVersion === 6 &&
    typeof value.userIdLocal === 'string' &&
    isStringArray(value.completedLessonIds) &&
    isNumberRecord(value.lessonScores) &&
    isAttemptArray(value.exerciseAttempts) &&
    isStringArray(value.bookmarks) &&
    isStringArray(value.difficultItems) &&
    isReviewSchedule(value.reviewSchedule) &&
    isRecord(settings) &&
    ['light', 'dark', 'system'].includes(String(settings.theme)) &&
    (value.lastActivity === null || typeof value.lastActivity === 'string') &&
    isActivityArray(value.activityHistory) &&
    isStringArray(value.favoriteWordIds) &&
    isWordListArray(value.wordLists) &&
    typeof value.appVersion === 'string' &&
    typeof value.contentVersion === 'string'
  )
}

export function createProgressBackup(
  progress: UserProgress,
  exportedAt = new Date().toISOString(),
): ProgressBackup {
  return {
    format: PROGRESS_BACKUP_FORMAT,
    formatVersion: PROGRESS_BACKUP_FORMAT_VERSION,
    exportedAt,
    appVersion: __APP_VERSION__,
    contentVersion: progress.contentVersion,
    progress,
  }
}

export function serializeProgressBackup(
  progress: UserProgress,
  exportedAt?: string,
) {
  return JSON.stringify(createProgressBackup(progress, exportedAt), null, 2)
}

export function parseProgressBackup(serialized: string): UserProgress {
  let value: unknown
  try {
    value = JSON.parse(serialized)
  } catch {
    throw new Error('Die Datei enthält kein gültiges JSON.')
  }
  if (!isRecord(value) || value.format !== PROGRESS_BACKUP_FORMAT) {
    throw new Error('Die Datei ist keine Piano-Lernstandsicherung.')
  }
  if (value.formatVersion !== PROGRESS_BACKUP_FORMAT_VERSION) {
    throw new Error(
      'Das Sicherungsformat wird von dieser Version nicht unterstützt.',
    )
  }
  if (!isProgress(value.progress)) {
    throw new Error(
      'Der enthaltene Lernstand ist unvollständig oder beschädigt.',
    )
  }
  return {
    ...value.progress,
    settings: { theme: value.progress.settings.theme },
    appVersion: __APP_VERSION__,
    contentVersion: __APP_VERSION__,
  }
}
