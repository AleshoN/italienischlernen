import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { chapters, course, lessons, modules } from '../content/catalog'
import { exercises } from '../content/exercises'
import {
  assessments,
  finalAssessment,
  moduleAssessments,
} from '../content/assessments'
import { lessonSpecs, moduleSpecs } from '../content/a0/curriculum'
import { conjugations } from '../content/reference/conjugations'
import { dictionaryEntries } from '../content/reference/dictionary'
import { grammarRules } from '../content/reference/grammar'
import { CoursePage } from '../features/course/CoursePage'
import { Dashboard } from '../features/dashboard/Dashboard'
import { AnalysisPage } from '../features/exercises/AnalysisPage'
import { ExerciseCard } from '../features/exercises/ExerciseCard'
import { evaluateExercise } from '../features/exercises/evaluation'
import { LessonPage } from '../features/lessons/LessonPage'
import { ConjugationPage } from '../features/reference/ConjugationPage'
import { DictionaryPage } from '../features/reference/DictionaryPage'
import { GrammarPage } from '../features/reference/GrammarPage'
import { ReviewPage } from '../features/review/ReviewPage'
import { applyTheme } from '../app/theme'
import { canApplyPatch, compareVersions } from '../services/patch/version'
import {
  initialProgress,
  loadProgress,
  migrateProgress,
  saveProgress,
} from '../storage/progress'
import {
  parseProgressBackup,
  serializeProgressBackup,
} from '../storage/progressBackup'
import type { Exercise, ExerciseResponse } from '../types/exercises'
import {
  openEntryMatches,
  resetOpenDictionaryCacheForTests,
} from '../services/dictionary/openDictionary'
import type { OpenDictionaryPack } from '../types/open-dictionary'
import {
  buildTargetedExercises,
  calculateLearningInsights,
  getDueReviewTargets,
  scheduleExerciseAttempt,
  scheduleReview,
} from '../services/review/reviewEngine'

const openDictionaryPack: OpenDictionaryPack = {
  schemaVersion: 1,
  source: {
    name: 'Deutschsprachiges Wiktionary',
    pageUrl: 'https://kaikki.org/dewiktionary/Italienisch/index.html',
    downloadUrl: 'https://example.test/dictionary.jsonl',
    lastModified: '2026-08-04',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attributionRequired: true,
    extractionTool: 'Wiktextract',
  },
  sourceRecords: 2,
  distinctWords: 2,
  entries: [
    {
      id: 'word.it.dewiktionary.caffe',
      lemma: 'caffè',
      partsOfSpeech: ['Substantiv'],
      meanings: ['Kaffee'],
      ipa: '/kafˈfɛ/',
      forms: ['caffè'],
      examples: [],
      sourceUrl: 'https://de.wiktionary.org/wiki/caffè',
    },
    {
      id: 'word.it.dewiktionary.essere',
      lemma: 'essere',
      partsOfSpeech: ['Verb'],
      meanings: ['sein'],
      ipa: null,
      forms: ['sono', 'sei', 'è'],
      examples: [],
      sourceUrl: 'https://de.wiktionary.org/wiki/essere',
    },
  ],
}

const mockOpenDictionaryFetch = () =>
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => openDictionaryPack,
    }),
  )

afterEach(() => {
  cleanup()
  resetOpenDictionaryCacheForTests()
  vi.unstubAllGlobals()
})

describe('Lernoberfläche', () => {
  it('wendet helles, dunkles und systemabhängiges Theme an', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    applyTheme('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    applyTheme('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    applyTheme('system')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('zeigt auf dem Dashboard die nächste nicht abgeschlossene Lektion', () => {
    render(
      <MemoryRouter>
        <Dashboard completedLessonIds={['lesson.it.a0.00.01']} bookmarks={[]} />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'So lernst du wirksam', level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Weiterlernen/i })).toHaveAttribute(
      'href',
      '/lektion/lesson.it.a0.00.02',
    )
  })

  it('lädt eine Lektion samt Übungen allein anhand der URL', () => {
    render(
      <MemoryRouter initialEntries={['/lektion/lesson.it.a0.02.02']}>
        <Routes>
          <Route
            path="/lektion/:lessonId"
            element={
              <LessonPage
                completedLessonIds={['lesson.it.a0.02.01']}
                bookmarks={[]}
                onComplete={vi.fn()}
                onToggleBookmark={vi.fn()}
                onSaveAttempt={vi.fn()}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'Höflichkeit', level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText('Per favore.')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Prüfe dein Verständnis' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/Aufgabe [12]/)).toHaveLength(2)
    expect(
      screen.getByRole('link', { name: /Zurück.*Begrüßen/ }),
    ).toHaveAttribute('href', '/lektion/lesson.it.a0.02.01')
    expect(
      screen.getByRole('link', { name: /Weiter.*Sich vorstellen/ }),
    ).toHaveAttribute('href', '/lektion/lesson.it.a0.02.03')
  })

  it('zeigt Kursstruktur und Abschlusstest', () => {
    const { container } = render(
      <MemoryRouter>
        <CoursePage
          completedLessonIds={[]}
          bookmarks={['lesson.it.a0.02.02']}
        />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'Erste Begegnungen', level: 2 }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('.module-card')).toHaveLength(13)
    expect(container.querySelectorAll('.course-lessons li')).toHaveLength(84)
    expect(
      container.querySelector('a[href="/test/assessment.it.a0.02"]'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /A0-Prüfung starten/ }),
    ).toHaveAttribute('href', '/test/assessment.it.a0.final')
  })
})

describe('Übungsbewertung', () => {
  const responses: Record<string, ExerciseResponse> = {
    'exercise.it.a0.02.01.001': 'ciao',
    'exercise.it.a0.02.01.002': {
      friend: 'friend',
      shop: 'shop',
      restaurant: 'restaurant',
    },
    'exercise.it.a0.02.02.001': 'Per favore!',
    'exercise.it.a0.02.02.002': 'GRAZIE!',
    'exercise.it.a0.02.03.001': ['mi', 'chiamo', 'anna'],
    'exercise.it.a0.02.03.002': 'mi chiamo',
  }

  const correctResponse = (exercise: Exercise): ExerciseResponse => {
    if (exercise.type === 'sentence-order') return exercise.answer
    if (exercise.type === 'matching') return exercise.answer
    return exercise.answer
  }

  it('bewertet die Musterlösung jeder Kursaufgabe korrekt', () => {
    for (const exercise of exercises) {
      const response = responses[exercise.id] ?? correctResponse(exercise)
      expect(evaluateExercise(exercise, response).correct, exercise.id).toBe(
        true,
      )
    }
  })

  it('zeigt bei einer falschen Antwort erklärendes Feedback', async () => {
    const onAttempt = vi.fn()
    render(<ExerciseCard exercise={exercises[0]} onAttempt={onAttempt} />)
    fireEvent.click(screen.getByRole('button', { name: 'Grazie!' }))
    fireEvent.click(screen.getByRole('button', { name: 'Antwort prüfen' }))
    await waitFor(() => expect(onAttempt).toHaveBeenCalledOnce())
    expect(screen.getByRole('status')).toHaveTextContent('Noch nicht richtig')
    expect(screen.getByRole('status')).toHaveTextContent(
      'Richtige Lösung: Ciao!',
    )
  })

  it('analysiert gespeicherte Ergebnisse nach Aufgabentyp', () => {
    const attempts = [
      {
        id: 'a1',
        exerciseId: exercises[0].id,
        lessonId: exercises[0].lessonId,
        exerciseType: exercises[0].type,
        correct: true,
        response: 'ciao',
        occurredAt: '2026-08-05T12:00:00.000Z',
      },
      {
        id: 'a2',
        exerciseId: exercises[2].id,
        lessonId: exercises[2].lessonId,
        exerciseType: exercises[2].type,
        correct: false,
        response: 'grazie',
        occurredAt: '2026-08-05T12:01:00.000Z',
      },
    ]
    render(
      <MemoryRouter>
        <AnalysisPage attempts={attempts} />
      </MemoryRouter>,
    )
    expect(
      screen.getByText('50%', { selector: '.score-ring' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Noch einmal ansehen' }),
    ).toBeInTheDocument()
  })
})

describe('Datenintegrität und Migration', () => {
  it('vergleicht Versionen und akzeptiert nur den passenden nächsten Patch', () => {
    expect(compareVersions('1.0.0', '0.9.0')).toBeGreaterThan(0)
    expect(compareVersions('1.0.0', '1.0.0')).toBe(0)
    expect(
      canApplyPatch('0.9.0', {
        fromVersion: '0.9.0',
        toVersion: '1.0.0',
        minimumAppVersion: '0.6.0',
      }),
    ).toBe(true)
    expect(
      canApplyPatch('0.6.0', {
        fromVersion: '0.9.0',
        toVersion: '1.0.0',
        minimumAppVersion: '0.6.0',
      }),
    ).toBe(false)
  })

  it('bildet den vollständigen A0-Lehrplan mit Prüfungen und Wortschatz ab', () => {
    expect(moduleSpecs).toHaveLength(13)
    expect(modules).toHaveLength(13)
    expect(lessonSpecs).toHaveLength(84)
    expect(lessons).toHaveLength(84)
    expect(exercises).toHaveLength(168)
    expect(dictionaryEntries.length).toBeGreaterThanOrEqual(500)
    expect(dictionaryEntries.length).toBeLessThanOrEqual(800)
    expect(moduleAssessments).toHaveLength(13)
    expect(finalAssessment.exerciseIds).toHaveLength(12)
    expect(course.version).toBe('1.0.0')
    expect(lessons.every((lesson) => lesson.contentVersion === '1.0.0')).toBe(
      true,
    )
    expect(
      exercises.every((exercise) => exercise.contentVersion === '1.0.0'),
    ).toBe(true)
    expect(
      assessments.every(
        (assessment) =>
          assessment.exerciseIds.length > 0 &&
          assessment.exerciseIds.every((id) =>
            exercises.some((exercise) => exercise.id === id),
          ),
      ),
    ).toBe(true)
  })

  it('verwendet eindeutige IDs und auflösbare Referenzen', () => {
    const allIds = [
      course.id,
      ...modules.map(({ id }) => id),
      ...chapters.map(({ id }) => id),
      ...lessons.flatMap((lesson) => [
        lesson.id,
        ...lesson.sections.map(({ id }) => id),
      ]),
      ...exercises.map(({ id }) => id),
      ...dictionaryEntries.map(({ id }) => id),
      ...grammarRules.map(({ id }) => id),
      ...conjugations.map(({ id }) => id),
      ...assessments.map(({ id }) => id),
    ]
    expect(new Set(allIds).size).toBe(allIds.length)
    expect(
      course.moduleIds.every((id) =>
        modules.some((module) => module.id === id),
      ),
    ).toBe(true)
    expect(
      modules.every((module) =>
        module.chapterIds.every((id) =>
          chapters.some((chapter) => chapter.id === id),
        ),
      ),
    ).toBe(true)
    expect(
      chapters.every((chapter) =>
        chapter.lessonIds.every((id) =>
          lessons.some((lesson) => lesson.id === id),
        ),
      ),
    ).toBe(true)
    expect(
      lessons.every((lesson) =>
        lesson.exerciseIds.every((id) =>
          exercises.some((exercise) => exercise.id === id),
        ),
      ),
    ).toBe(true)
    expect(
      exercises.every((exercise) =>
        lessons.some((lesson) => lesson.id === exercise.lessonId),
      ),
    ).toBe(true)
  })

  it('migriert Phase-2-Fortschritt ohne Abschlüsse und Verlauf zu verlieren', () => {
    const legacy = {
      schemaVersion: 2 as const,
      userIdLocal: 'local-user',
      completedLessonIds: ['lesson.it.a0.02.01'],
      lessonScores: {},
      exerciseAttempts: {},
      bookmarks: [],
      difficultItems: [],
      reviewSchedule: {},
      settings: { theme: 'system' as const },
      lastActivity: null,
      activityHistory: [
        {
          id: 'old',
          lessonId: 'lesson.it.a0.02.01',
          action: 'completed' as const,
          occurredAt: '2026-08-05T12:00:00.000Z',
        },
      ],
      appVersion: '0.2.0',
      contentVersion: '0.2.0',
    }
    const migrated = migrateProgress(legacy)
    expect(migrated.schemaVersion).toBe(6)
    expect(migrated.completedLessonIds).toEqual(['lesson.it.a0.02.01'])
    expect(migrated.activityHistory).toHaveLength(1)
    expect(migrated.exerciseAttempts).toEqual([])
    expect(migrated.favoriteWordIds).toEqual([])
    expect(migrated.wordLists).toEqual([])
    expect(migrated.settings).toEqual({ theme: 'system' })
  })

  it('migriert alte Wiederholungstermine in das strukturierte Datenschema', () => {
    const migrated = migrateProgress({
      ...initialProgress,
      schemaVersion: 5,
      reviewSchedule: {
        'word.it.ciao': '2026-08-06T12:00:00.000Z',
      },
      appVersion: '0.5.3',
      contentVersion: '0.5.3',
    } as never)
    expect(migrated.reviewSchedule['word.it.ciao']).toMatchObject({
      targetId: 'word.it.ciao',
      kind: 'word',
      dueAt: '2026-08-06T12:00:00.000Z',
      streak: 0,
      lapses: 0,
    })
  })

  it('speichert einen Übungsversuch in IndexedDB und stellt ihn wieder her', async () => {
    const attempt = {
      id: 'roundtrip-attempt',
      exerciseId: exercises[0].id,
      lessonId: exercises[0].lessonId,
      exerciseType: exercises[0].type,
      correct: true,
      response: 'ciao',
      occurredAt: '2026-08-05T12:05:00.000Z',
    }
    const wordList = {
      id: 'list-1',
      title: 'Meine Wörter',
      wordIds: ['word.it.ciao'],
      createdAt: '2026-08-05T12:06:00.000Z',
    }
    await saveProgress({
      ...initialProgress,
      exerciseAttempts: [attempt],
      favoriteWordIds: ['word.it.ciao'],
      wordLists: [wordList],
    })
    const restored = await loadProgress()
    expect(restored.exerciseAttempts).toEqual([attempt])
    expect(restored.favoriteWordIds).toEqual(['word.it.ciao'])
    expect(restored.wordLists).toEqual([wordList])
    expect(restored.settings).toEqual({ theme: 'system' })
  })

  it('aktualisiert einen vollständigen 0.9-Lernstand verlustfrei auf 1.0', async () => {
    const previous = {
      ...initialProgress,
      completedLessonIds: ['lesson.it.a0.02.01'],
      bookmarks: ['lesson.it.a0.02.02'],
      difficultItems: ['word.it.ciao'],
      favoriteWordIds: ['word.it.grazie'],
      lessonScores: { 'assessment.it.a0.02': 83 },
      appVersion: '0.9.0',
      contentVersion: '0.9.0',
    }
    await saveProgress(previous)
    const restored = await loadProgress()
    expect(restored).toMatchObject({
      completedLessonIds: previous.completedLessonIds,
      bookmarks: previous.bookmarks,
      difficultItems: previous.difficultItems,
      favoriteWordIds: previous.favoriteWordIds,
      lessonScores: previous.lessonScores,
      appVersion: '1.0.0',
      contentVersion: '1.0.0',
    })
  })

  it('exportiert und importiert eine geprüfte Lernstandsicherung', () => {
    const progress = {
      ...initialProgress,
      completedLessonIds: ['lesson.it.a0.02.01'],
      favoriteWordIds: ['word.it.ciao'],
      settings: { theme: 'dark' as const },
    }
    const serialized = serializeProgressBackup(
      progress,
      '2026-08-06T10:00:00.000Z',
    )
    expect(parseProgressBackup(serialized)).toEqual(progress)
    expect(() => parseProgressBackup('{"format":"falsch"}')).toThrow(
      'keine Piano-Lernstandsicherung',
    )
  })
})

describe('Nachschlagebereiche', () => {
  it('findet Wörter auf Italienisch und Deutsch und schaltet Favoriten', () => {
    mockOpenDictionaryFetch()
    const toggle = vi.fn()
    const toggleDifficult = vi.fn()
    render(
      <MemoryRouter>
        <DictionaryPage
          favoriteWordIds={[]}
          difficultItemIds={[]}
          wordLists={[]}
          onToggleFavorite={toggle}
          onToggleDifficult={toggleDifficult}
          onCreateList={vi.fn()}
          onToggleWordInList={vi.fn()}
        />
      </MemoryRouter>,
    )
    const search = screen.getByRole('searchbox')
    fireEvent.change(search, { target: { value: 'danke' } })
    expect(screen.getByRole('heading', { name: 'grazie' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'ciao' }),
    ).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /grazie zu Favoriten/ }))
    expect(toggle).toHaveBeenCalledWith('word.it.grazie')
    fireEvent.click(
      screen.getByRole('button', { name: /grazie als schwierig markieren/ }),
    )
    expect(toggleDifficult).toHaveBeenCalledWith('word.it.grazie')
  })

  it('lädt den allgemeinen offenen Bestand und durchsucht Formen und Übersetzungen', async () => {
    mockOpenDictionaryFetch()
    render(
      <MemoryRouter>
        <DictionaryPage
          favoriteWordIds={[]}
          difficultItemIds={[]}
          wordLists={[]}
          onToggleFavorite={vi.fn()}
          onToggleDifficult={vi.fn()}
          onCreateList={vi.fn()}
          onToggleWordInList={vi.fn()}
        />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText(
        '2 unterschiedliche Wortformen aus dem deutschsprachigen Wiktionary, ergänzt durch die redaktionellen Kurseinträge.',
      ),
    ).toBeInTheDocument()
    const search = screen.getByRole('searchbox')
    fireEvent.change(search, { target: { value: 'Kaffee' } })
    expect(screen.getByRole('heading', { name: 'caffè' })).toBeInTheDocument()
    fireEvent.change(search, { target: { value: 'essere' } })
    expect(screen.getByRole('heading', { name: 'essere' })).toBeInTheDocument()
  })

  it('sucht ohne Beachtung italienischer Akzente', () => {
    expect(openEntryMatches(openDictionaryPack.entries[0], 'caffe')).toBe(true)
  })

  it('zeigt vollständige Grammatikelemente und Querverweise', () => {
    render(
      <MemoryRouter>
        <GrammarPage />
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Einfach erklärt')).toHaveLength(
      grammarRules.length,
    )
    expect(
      screen.getAllByRole('heading', { name: 'Typischer Fehler' }).length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('Quelle und Lizenz').length).toBe(
      grammarRules.length,
    )
  })

  it('zeigt alle sechs Präsensformen von chiamarsi', () => {
    render(
      <MemoryRouter>
        <ConjugationPage />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'chiamarsi' }),
    ).toBeInTheDocument()
    const chiamarsi = screen
      .getByRole('heading', { name: 'chiamarsi' })
      .closest('article')!
    expect(within(chiamarsi).getAllByRole('row')).toHaveLength(6)
    expect(screen.getByText('mi chiamo')).toBeInTheDocument()
  })

  it('verknüpft alle Referenzdaten über auflösbare dauerhafte IDs', () => {
    expect(
      lessons.every((lesson) =>
        lesson.vocabularyIds.every((id) =>
          dictionaryEntries.some((entry) => entry.id === id),
        ),
      ),
    ).toBe(true)
    expect(
      lessons.every((lesson) =>
        lesson.grammarIds.every((id) =>
          grammarRules.some((rule) => rule.id === id),
        ),
      ),
    ).toBe(true)
    expect(
      dictionaryEntries.every(
        (entry) =>
          entry.lessonIds.every((id) =>
            lessons.some((lesson) => lesson.id === id),
          ) &&
          entry.grammarIds.every((id) =>
            grammarRules.some((rule) => rule.id === id),
          ) &&
          entry.sources.length > 0 &&
          Boolean(entry.license),
      ),
    ).toBe(true)
    expect(
      grammarRules.every(
        (rule) =>
          rule.exerciseIds.every((id) =>
            exercises.some((exercise) => exercise.id === id),
          ) &&
          rule.vocabularyIds.every((id) =>
            dictionaryEntries.some((entry) => entry.id === id),
          ) &&
          rule.sources.length > 0,
      ),
    ).toBe(true)
    expect(
      conjugations.every(
        (verb) =>
          verb.lessonIds.every((id) =>
            lessons.some((lesson) => lesson.id === id),
          ) &&
          verb.grammarIds.every((id) =>
            grammarRules.some((rule) => rule.id === id),
          ) &&
          verb.sources.length > 0,
      ),
    ).toBe(true)
  })
})

describe('Wiederholung und Lernanalyse', () => {
  const reviewedAt = '2026-08-05T12:00:00.000Z'
  const incorrectAttempt = {
    id: 'review-attempt',
    exerciseId: exercises[0].id,
    lessonId: exercises[0].lessonId,
    exerciseType: exercises[0].type,
    correct: false,
    response: 'grazie',
    occurredAt: reviewedAt,
  }

  it('plant transparente Wiederholungsintervalle', () => {
    const failed = scheduleReview({}, 'word.it.ciao', 'again', reviewedAt)
    expect(failed['word.it.ciao']).toMatchObject({
      intervalDays: 0,
      streak: 0,
      lapses: 1,
      dueAt: '2026-08-05T12:10:00.000Z',
    })
    const firstSuccess = scheduleReview(
      failed,
      'word.it.ciao',
      'good',
      '2026-08-05T12:10:00.000Z',
    )
    expect(firstSuccess['word.it.ciao']).toMatchObject({
      intervalDays: 1,
      streak: 1,
      dueAt: '2026-08-06T12:10:00.000Z',
    })
    const secondSuccess = scheduleReview(
      firstSuccess,
      'word.it.ciao',
      'good',
      '2026-08-06T12:10:00.000Z',
    )
    expect(secondSuccess['word.it.ciao'].intervalDays).toBe(3)
  })

  it('verknüpft einen Versuch mit Aufgabe, Wörtern und Grammatik', () => {
    const schedule = scheduleExerciseAttempt(
      {},
      exercises[0].id,
      false,
      reviewedAt,
    )
    expect(Object.keys(schedule)).toEqual(
      expect.arrayContaining([
        exercises[0].id,
        'word.it.ciao',
        'grammar.it.register.greetings.001',
      ]),
    )
    expect(getDueReviewTargets(schedule, new Date(reviewedAt))).toHaveLength(0)
    expect(
      getDueReviewTargets(schedule, new Date('2026-08-05T12:10:00.000Z')),
    ).toHaveLength(3)
  })

  it('erkennt offene Fehler, schwierige Wörter und schwache Grammatik', () => {
    const insights = calculateLearningInsights(
      [incorrectAttempt],
      [],
      new Date(reviewedAt),
    )
    expect(insights.errors[0].exerciseId).toBe(exercises[0].id)
    expect(insights.difficultWordIds).toContain('word.it.ciao')
    expect(insights.weakGrammar[0]).toMatchObject({
      grammarId: 'grammar.it.register.greetings.001',
      score: 0,
    })
    expect(
      buildTargetedExercises([incorrectAttempt], [], {}, new Date(reviewedAt)),
    ).toContainEqual(exercises[0])
  })

  it('zeigt eine konkrete Empfehlung und einen gezielten Test', () => {
    render(
      <MemoryRouter>
        <ReviewPage
          attempts={[incorrectAttempt]}
          difficultItems={[]}
          reviewSchedule={{}}
          onSaveAttempt={vi.fn()}
          onToggleDifficult={vi.fn()}
          onReview={vi.fn()}
        />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', {
        name: '1 gezielte Aufgabe wartet auf dich.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Zuletzt noch offen' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Themen mit Übungsbedarf' }),
    ).toBeInTheDocument()
    expect(screen.getByText('hallo', { selector: 'h3' })).toBeInTheDocument()
  })
})
