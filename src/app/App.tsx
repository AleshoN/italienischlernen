import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ChangelogPage } from '../features/changelog/ChangelogPage'
import { CoursePage } from '../features/course/CoursePage'
import { CourseTree } from '../features/course/CourseTree'
import { Dashboard } from '../features/dashboard/Dashboard'
import { DataPage } from '../features/data/DataPage'
import { AnalysisPage } from '../features/exercises/AnalysisPage'
import { AssessmentPage } from '../features/exercises/AssessmentPage'
import { HistoryPage } from '../features/history/HistoryPage'
import { LessonPage } from '../features/lessons/LessonPage'
import { ConjugationPage } from '../features/reference/ConjugationPage'
import { DictionaryPage } from '../features/reference/DictionaryPage'
import { GrammarPage } from '../features/reference/GrammarPage'
import { VocabularyListsPage } from '../features/reference/VocabularyListsPage'
import { ReviewPage } from '../features/review/ReviewPage'
import {
  ensureReviewTarget,
  getDueReviewTargets,
  removeReviewTarget,
  scheduleExerciseAttempt,
  scheduleReview,
} from '../services/review/reviewEngine'
import { loadProgress, saveProgress } from '../storage/progress'
import type { ActivityEntry, UserProgress } from '../types/content'
import type {
  Evaluation,
  Exercise,
  ExerciseAttempt,
  ExerciseResponse,
} from '../types/exercises'
import type { ReviewRating } from '../types/review'
import { applyTheme, type Theme } from './theme'

const navItems = [
  { to: '/', label: 'Übersicht', icon: '⌂' },
  { to: '/kurs', label: 'Kurs', icon: '◇' },
  { to: '/verlauf', label: 'Verlauf', icon: '◷' },
  { to: '/wiederholen', label: 'Wiederholen', icon: '◎' },
  { to: '/woerterbuch', label: 'Nachschlagen', icon: '⌕' },
  { to: '/changelog', label: 'Neues', icon: '＋' },
  { to: '/daten', label: 'Daten', icon: '↥' },
]
const mobileNavItems = [
  navItems[0],
  navItems[1],
  navItems[3],
  navItems[4],
  navItems[6],
]

function activity(
  lessonId: string,
  action: ActivityEntry['action'],
): ActivityEntry {
  const occurredAt = new Date().toISOString()
  return {
    id: `${action}-${lessonId}-${occurredAt}`,
    lessonId,
    action,
    occurredAt,
  }
}

function ScrollToAnchor() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    target?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    })
  }, [hash])
  return null
}

export function App() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [storageError, setStorageError] = useState<string | null>(null)
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('piano-theme') as Theme) || 'system',
  )

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('piano-theme', theme)
  }, [theme])
  useEffect(() => {
    loadProgress()
      .then((stored) => {
        setProgress(stored)
        if (!localStorage.getItem('piano-theme'))
          setTheme(stored.settings.theme)
      })
      .catch(() =>
        setStorageError(
          'Der lokale Lernstand konnte nicht geladen werden. Es wurde nichts überschrieben.',
        ),
      )
  }, [])

  const persist = async (next: UserProgress) => {
    try {
      await saveProgress(next)
      setProgress(next)
      setStorageError(null)
      return true
    } catch {
      setStorageError(
        'Die Änderung konnte nicht lokal gespeichert werden. Bitte sichere deinen Lernstand und prüfe den Browserspeicher.',
      )
      return false
    }
  }
  const importProgress = async (next: UserProgress) => {
    const saved = await persist(next)
    if (saved) {
      setTheme(next.settings.theme)
      localStorage.setItem('piano-theme', next.settings.theme)
    }
    return saved
  }
  const completeLesson = async (lessonId: string) => {
    if (!progress) return
    const event = activity(lessonId, 'completed')
    await persist({
      ...progress,
      completedLessonIds: [
        ...new Set([...progress.completedLessonIds, lessonId]),
      ],
      lastActivity: event.occurredAt,
      activityHistory: [event, ...progress.activityHistory].slice(0, 100),
    })
  }
  const toggleBookmark = async (lessonId: string) => {
    if (!progress) return
    const removing = progress.bookmarks.includes(lessonId)
    const event = activity(
      lessonId,
      removing ? 'bookmark-removed' : 'bookmarked',
    )
    const bookmarks = removing
      ? progress.bookmarks.filter((id) => id !== lessonId)
      : [...progress.bookmarks, lessonId]
    await persist({
      ...progress,
      bookmarks,
      lastActivity: event.occurredAt,
      activityHistory: [event, ...progress.activityHistory].slice(0, 100),
    })
  }
  const saveAttempt = async (
    exercise: Exercise,
    response: ExerciseResponse,
    evaluation: Evaluation,
  ) => {
    if (!progress) return
    const occurredAt = new Date().toISOString()
    const attempt: ExerciseAttempt = {
      id: `attempt-${exercise.id}-${occurredAt}`,
      exerciseId: exercise.id,
      lessonId: exercise.lessonId,
      exerciseType: exercise.type,
      correct: evaluation.correct,
      response,
      occurredAt,
    }
    const attempts = [attempt, ...progress.exerciseAttempts].slice(0, 500)
    const lessonAttempts = attempts.filter(
      (item) => item.lessonId === exercise.lessonId,
    )
    const score = Math.round(
      (lessonAttempts.filter((item) => item.correct).length /
        lessonAttempts.length) *
        100,
    )
    const event = activity(exercise.lessonId, 'exercise-completed')
    await persist({
      ...progress,
      exerciseAttempts: attempts,
      reviewSchedule: scheduleExerciseAttempt(
        progress.reviewSchedule,
        exercise.id,
        evaluation.correct,
        occurredAt,
      ),
      lessonScores: { ...progress.lessonScores, [exercise.lessonId]: score },
      lastActivity: occurredAt,
      activityHistory: [event, ...progress.activityHistory].slice(0, 100),
    })
  }
  const finishTest = async (assessmentId: string, score: number) => {
    if (!progress) return
    const event = activity(assessmentId, 'test-completed')
    await persist({
      ...progress,
      lessonScores: { ...progress.lessonScores, [assessmentId]: score },
      lastActivity: event.occurredAt,
      activityHistory: [event, ...progress.activityHistory].slice(0, 100),
    })
  }
  const toggleFavoriteWord = async (wordId: string) => {
    if (!progress) return
    const favoriteWordIds = progress.favoriteWordIds.includes(wordId)
      ? progress.favoriteWordIds.filter((id) => id !== wordId)
      : [...progress.favoriteWordIds, wordId]
    await persist({ ...progress, favoriteWordIds })
  }
  const toggleDifficultItem = async (targetId: string) => {
    if (!progress) return
    const removing = progress.difficultItems.includes(targetId)
    const difficultItems = removing
      ? progress.difficultItems.filter((id) => id !== targetId)
      : [...progress.difficultItems, targetId]
    const reviewSchedule = removing
      ? removeReviewTarget(progress.reviewSchedule, targetId)
      : ensureReviewTarget(
          progress.reviewSchedule,
          targetId,
          new Date().toISOString(),
        )
    await persist({ ...progress, difficultItems, reviewSchedule })
  }
  const reviewTarget = async (targetId: string, rating: ReviewRating) => {
    if (!progress) return
    await persist({
      ...progress,
      reviewSchedule: scheduleReview(
        progress.reviewSchedule,
        targetId,
        rating,
        new Date().toISOString(),
      ),
    })
  }
  const createWordList = async (title: string) => {
    if (!progress) return
    const createdAt = new Date().toISOString()
    await persist({
      ...progress,
      wordLists: [
        ...progress.wordLists,
        { id: `word-list-${createdAt}`, title, wordIds: [], createdAt },
      ],
    })
  }
  const toggleWordInList = async (listId: string, wordId: string) => {
    if (!progress) return
    const wordLists = progress.wordLists.map((list) =>
      list.id !== listId
        ? list
        : {
            ...list,
            wordIds: list.wordIds.includes(wordId)
              ? list.wordIds.filter((id) => id !== wordId)
              : [...list.wordIds, wordId],
          },
    )
    await persist({ ...progress, wordLists })
  }
  const completedLessonIds = progress?.completedLessonIds ?? []
  const bookmarks = progress?.bookmarks ?? []
  const dueReviewCount = progress
    ? getDueReviewTargets(progress.reviewSchedule).length
    : 0
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Zum Hauptinhalt springen
      </a>
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Piano Startseite">
          <span className="brand-mark">P</span>
          <span>
            Piano<small>Italiano, passo dopo passo</small>
          </span>
        </NavLink>
        <nav aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-course">
          <p>Dein Kurs</p>
          <CourseTree />
        </div>
        <div className="sidebar-footer">
          <label htmlFor="theme">Darstellung</label>
          <select
            id="theme"
            value={theme}
            onChange={(event) => {
              const nextTheme = event.target.value as Theme
              setTheme(nextTheme)
              if (progress)
                void persist({
                  ...progress,
                  settings: { theme: nextTheme },
                })
            }}
          >
            <option value="system">System</option>
            <option value="light">Hell</option>
            <option value="dark">Dunkel</option>
          </select>
          <span>Version {__APP_VERSION__}</span>
        </div>
      </aside>
      <main id="main-content" tabIndex={-1}>
        <ScrollToAnchor />
        {storageError && (
          <div className="storage-alert" role="alert">
            {storageError}
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                completedLessonIds={completedLessonIds}
                bookmarks={bookmarks}
                dueReviewCount={dueReviewCount}
                difficultItemCount={progress?.difficultItems.length ?? 0}
              />
            }
          />
          <Route
            path="/kurs"
            element={
              <CoursePage
                completedLessonIds={completedLessonIds}
                bookmarks={bookmarks}
              />
            }
          />
          <Route
            path="/lektion"
            element={<Navigate to="/lektion/lesson.it.a0.00.01" replace />}
          />
          <Route
            path="/lektion/:lessonId"
            element={
              <LessonPage
                completedLessonIds={completedLessonIds}
                bookmarks={bookmarks}
                onComplete={completeLesson}
                onToggleBookmark={toggleBookmark}
                onSaveAttempt={saveAttempt}
              />
            }
          />
          <Route
            path="/test/:assessmentId"
            element={
              <AssessmentPage
                onSaveAttempt={saveAttempt}
                onFinish={finishTest}
              />
            }
          />
          <Route
            path="/wiederholen"
            element={
              <ReviewPage
                attempts={progress?.exerciseAttempts ?? []}
                difficultItems={progress?.difficultItems ?? []}
                reviewSchedule={progress?.reviewSchedule ?? {}}
                onSaveAttempt={saveAttempt}
                onToggleDifficult={toggleDifficultItem}
                onReview={reviewTarget}
              />
            }
          />
          <Route
            path="/analyse"
            element={
              <AnalysisPage attempts={progress?.exerciseAttempts ?? []} />
            }
          />
          <Route
            path="/verlauf"
            element={<HistoryPage entries={progress?.activityHistory ?? []} />}
          />
          <Route
            path="/woerterbuch"
            element={
              <DictionaryPage
                favoriteWordIds={progress?.favoriteWordIds ?? []}
                difficultItemIds={progress?.difficultItems ?? []}
                wordLists={progress?.wordLists ?? []}
                onToggleFavorite={toggleFavoriteWord}
                onToggleDifficult={toggleDifficultItem}
                onCreateList={createWordList}
                onToggleWordInList={toggleWordInList}
              />
            }
          />
          <Route path="/grammatik" element={<GrammarPage />} />
          <Route path="/konjugation" element={<ConjugationPage />} />
          <Route path="/wortschatz" element={<VocabularyListsPage />} />
          <Route
            path="/audio"
            element={<Navigate to="/woerterbuch" replace />}
          />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route
            path="/daten"
            element={<DataPage progress={progress} onImport={importProgress} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <nav className="mobile-nav" aria-label="Mobile Navigation">
        {mobileNavItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            <span aria-hidden="true">{item.icon}</span>
            <small>
              {item.to === '/wiederholen'
                ? 'Üben'
                : item.to === '/woerterbuch'
                  ? 'Wörter'
                  : item.to === '/'
                    ? 'Start'
                    : item.label}
            </small>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
