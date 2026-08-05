import type { UserProgress } from '../types/content'
import type { ExerciseAttempt } from '../types/exercises'
import type { PersonalWordList } from '../types/reference'
import { migrateLegacyReviewSchedule } from '../services/review/reviewEngine'

const DB_NAME = 'piano-user-data'
const STORE_NAME = 'progress'
const BACKUP_STORE_NAME = 'backups'
const PROGRESS_KEY = 'local-user'

export const initialProgress: UserProgress = {
  schemaVersion: 6,
  userIdLocal: 'local-user',
  completedLessonIds: [],
  lessonScores: {},
  exerciseAttempts: [],
  bookmarks: [],
  difficultItems: [],
  reviewSchedule: {},
  settings: { theme: 'system' },
  lastActivity: null,
  activityHistory: [],
  favoriteWordIds: [],
  wordLists: [],
  appVersion: __APP_VERSION__,
  contentVersion: __CONTENT_VERSION__,
}

type LegacySettings = { theme: 'light' | 'dark' | 'system' }
type LegacyProgress = Omit<
  UserProgress,
  | 'schemaVersion'
  | 'activityHistory'
  | 'exerciseAttempts'
  | 'favoriteWordIds'
  | 'wordLists'
  | 'reviewSchedule'
  | 'settings'
> & {
  schemaVersion: 1 | 2 | 3 | 4 | 5
  activityHistory?: UserProgress['activityHistory']
  exerciseAttempts: ExerciseAttempt[] | Record<string, number>
  favoriteWordIds?: string[]
  wordLists?: PersonalWordList[]
  reviewSchedule: Record<string, string>
  settings: LegacySettings
}

export function migrateProgress(
  raw: UserProgress | LegacyProgress,
): UserProgress {
  if (raw.schemaVersion === 6)
    return { ...raw, settings: { theme: raw.settings.theme } }
  const activityHistory = raw.activityHistory ?? []
  const exerciseAttempts = Array.isArray(raw.exerciseAttempts)
    ? raw.exerciseAttempts
    : []
  const favoriteWordIds = raw.favoriteWordIds ?? []
  const wordLists = raw.wordLists ?? []
  return {
    ...raw,
    schemaVersion: 6,
    exerciseAttempts,
    activityHistory,
    favoriteWordIds,
    wordLists,
    reviewSchedule: migrateLegacyReviewSchedule(raw.reviewSchedule),
    settings: { theme: raw.settings.theme },
    appVersion: __APP_VERSION__,
    contentVersion: __CONTENT_VERSION__,
  }
}

const openDatabase = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 6)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME))
        request.result.createObjectStore(STORE_NAME)
      if (!request.result.objectStoreNames.contains(BACKUP_STORE_NAME))
        request.result.createObjectStore(BACKUP_STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

async function backupLegacyProgress(progress: LegacyProgress) {
  const db = await openDatabase()
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(BACKUP_STORE_NAME, 'readwrite')
    transaction
      .objectStore(BACKUP_STORE_NAME)
      .put(progress, `schema-${progress.schemaVersion}-${Date.now()}`)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

export async function loadProgress(): Promise<UserProgress> {
  const db = await openDatabase()
  const raw = await new Promise<UserProgress | LegacyProgress | undefined>(
    (resolve, reject) => {
      const request = db
        .transaction(STORE_NAME, 'readonly')
        .objectStore(STORE_NAME)
        .get(PROGRESS_KEY)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    },
  )
  if (!raw) return initialProgress
  if (raw.schemaVersion !== 6) {
    await backupLegacyProgress(raw)
    const migrated = migrateProgress(raw)
    await saveProgress(migrated)
    return migrated
  }
  if (
    raw.appVersion !== __APP_VERSION__ ||
    raw.contentVersion !== __CONTENT_VERSION__ ||
    Object.keys(raw.settings).length !== 1
  ) {
    const updated = {
      ...raw,
      settings: { theme: raw.settings.theme },
      appVersion: __APP_VERSION__,
      contentVersion: __CONTENT_VERSION__,
    }
    await saveProgress(updated)
    return updated
  }
  return raw
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    transaction.objectStore(STORE_NAME).put(progress, PROGRESS_KEY)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}
