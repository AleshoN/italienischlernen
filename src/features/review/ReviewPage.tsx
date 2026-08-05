import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { exerciseById } from '../../content/exercises'
import { dictionaryEntries } from '../../content/reference/dictionary'
import { grammarRuleById } from '../../content/reference/grammar'
import {
  buildTargetedExercises,
  calculateLearningInsights,
  getDueReviewTargets,
} from '../../services/review/reviewEngine'
import { loadOpenDictionary } from '../../services/dictionary/openDictionary'
import type {
  Evaluation,
  Exercise,
  ExerciseAttempt,
  ExerciseResponse,
} from '../../types/exercises'
import type { OpenDictionaryEntry } from '../../types/open-dictionary'
import type { ReviewRating, ReviewSchedule } from '../../types/review'
import { ExerciseCard } from '../exercises/ExerciseCard'

type Props = {
  attempts: ExerciseAttempt[]
  difficultItems: string[]
  reviewSchedule: ReviewSchedule
  onSaveAttempt: (
    exercise: Exercise,
    response: ExerciseResponse,
    evaluation: Evaluation,
  ) => Promise<void>
  onToggleDifficult: (targetId: string) => Promise<void>
  onReview: (targetId: string, rating: ReviewRating) => Promise<void>
}

type ReviewWord = {
  id: string
  lemma: string
  meaning: string
  source: 'course' | 'open'
}

const ratingLabels: Record<ReviewRating, string> = {
  again: 'Nochmal in 10 Minuten',
  hard: 'Schwer – kürzerer Abstand',
  good: 'Sicher gewusst',
}

function WordReviewCard({
  word,
  manuallyMarked,
  onToggleDifficult,
  onReview,
}: {
  word: ReviewWord
  manuallyMarked: boolean
  onToggleDifficult: (targetId: string) => Promise<void>
  onReview: (targetId: string, rating: ReviewRating) => Promise<void>
}) {
  const [revealed, setRevealed] = useState(false)
  const [rated, setRated] = useState<ReviewRating | null>(null)

  const rate = async (rating: ReviewRating) => {
    await onReview(word.id, rating)
    setRated(rating)
  }

  return (
    <article className="word-review-card">
      <span className="pill">
        {word.source === 'course' ? 'Kurswort' : 'Wörterbuchwort'}
      </span>
      <p>Wie heißt das auf Italienisch?</p>
      <h3>{word.meaning}</h3>
      {!revealed ? (
        <button className="button secondary" onClick={() => setRevealed(true)}>
          Antwort zeigen
        </button>
      ) : (
        <div className="word-review-answer" role="status">
          <strong lang="it">{word.lemma}</strong>
          {rated ? (
            <p>Gespeichert: {ratingLabels[rated]}</p>
          ) : (
            <div
              className="review-rating-actions"
              aria-label="Antwort bewerten"
            >
              {(['again', 'hard', 'good'] as ReviewRating[]).map((rating) => (
                <button key={rating} onClick={() => void rate(rating)}>
                  {ratingLabels[rating]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {manuallyMarked && (
        <button
          className="text-button"
          onClick={() => void onToggleDifficult(word.id)}
        >
          Nicht mehr als schwierig markieren
        </button>
      )}
    </article>
  )
}

const nextReviewLabel = (schedule: ReviewSchedule) => {
  const next = Object.values(schedule)
    .map((item) => new Date(item.dueAt))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((left, right) => left.getTime() - right.getTime())[0]
  if (!next) return 'Noch kein Termin geplant'
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(next)
}

export function ReviewPage({
  attempts,
  difficultItems,
  reviewSchedule,
  onSaveAttempt,
  onToggleDifficult,
  onReview,
}: Props) {
  const insights = useMemo(
    () => calculateLearningInsights(attempts, difficultItems),
    [attempts, difficultItems],
  )
  const dueTargets = useMemo(
    () => getDueReviewTargets(reviewSchedule),
    [reviewSchedule],
  )
  const targetedExercises = useMemo(
    () => buildTargetedExercises(attempts, difficultItems, reviewSchedule),
    [attempts, difficultItems, reviewSchedule],
  )
  const [openWords, setOpenWords] = useState<OpenDictionaryEntry[]>([])
  const openWordIds = useMemo(
    () =>
      insights.difficultWordIds.filter(
        (id) => !dictionaryEntries.some((entry) => entry.id === id),
      ),
    [insights.difficultWordIds],
  )

  useEffect(() => {
    if (!openWordIds.length) return
    let active = true
    loadOpenDictionary()
      .then((pack) => {
        if (active)
          setOpenWords(
            pack.entries.filter((entry) => openWordIds.includes(entry.id)),
          )
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [openWordIds])

  const reviewWords = useMemo(
    () =>
      insights.difficultWordIds.flatMap((id): ReviewWord[] => {
        const curated = dictionaryEntries.find((entry) => entry.id === id)
        if (curated)
          return [
            {
              id,
              lemma: curated.lemma,
              meaning: curated.translations[0],
              source: 'course',
            },
          ]
        const open = openWords.find((entry) => entry.id === id)
        return open
          ? [
              {
                id,
                lemma: open.lemma,
                meaning: open.meanings[0] ?? 'Bedeutung nachschlagen',
                source: 'open',
              },
            ]
          : []
      }),
    [insights.difficultWordIds, openWords],
  )
  const dueWordCount = dueTargets.filter(
    (target) => target.kind === 'word',
  ).length

  return (
    <div className="page review-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Wiederholung und Lernanalyse</p>
          <h1>Heute sinnvoll wiederholen.</h1>
          <p>
            Empfehlungen entstehen ausschließlich aus deinen lokalen Antworten
            und Markierungen. Du kannst jede Zahl darunter nachvollziehen.
          </p>
        </div>
        <span className="version-chip">{dueTargets.length} heute fällig</span>
      </header>

      <section className="review-hero">
        <div>
          <p className="eyebrow">Deine Empfehlung</p>
          <h2>
            {targetedExercises.length
              ? targetedExercises.length === 1
                ? '1 gezielte Aufgabe wartet auf dich.'
                : `${targetedExercises.length} gezielte Aufgaben warten auf dich.`
              : dueWordCount
                ? dueWordCount === 1
                  ? '1 schwieriges Wort ist heute fällig.'
                  : `${dueWordCount} schwierige Wörter sind heute fällig.`
                : attempts.length
                  ? 'Für heute ist nichts Dringendes offen.'
                  : 'Beginne mit den Übungen im Kurs.'}
          </h2>
          <p>
            {insights.errors.length
              ? insights.errors.length === 1
                ? '1 zuletzt falsch beantwortete Aufgabe wird zuerst wiederholt.'
                : `${insights.errors.length} zuletzt falsch beantwortete Aufgaben werden zuerst wiederholt.`
              : dueWordCount
                ? 'Rufe zuerst die fälligen Wörter aktiv aus dem Gedächtnis ab.'
                : 'Neue Empfehlungen erscheinen nach deinen ersten Antworten.'}
          </p>
        </div>
        {targetedExercises.length ? (
          <a className="button primary" href="#gezielter-test">
            Wiederholung starten
          </a>
        ) : dueWordCount ? (
          <a className="button primary" href="#schwierige-woerter">
            Wörter wiederholen
          </a>
        ) : (
          <Link className="button primary" to="/kurs">
            Zum Kurs
          </Link>
        )}
      </section>

      <section className="learning-statistics" aria-label="Lernstatistik">
        <article>
          <span>Antworten</span>
          <strong>{insights.totalAttempts}</strong>
          <small>lokal gespeichert</small>
        </article>
        <article>
          <span>Trefferquote</span>
          <strong>{insights.accuracy}%</strong>
          <small>
            {insights.correctAttempts} von {insights.totalAttempts} richtig
          </small>
        </article>
        <article>
          <span>Aktive Tage</span>
          <strong>{insights.activeDays}</strong>
          <small>Tage mit mindestens einer Antwort</small>
        </article>
        <article>
          <span>Aktuelle Serie</span>
          <strong>{insights.streak}</strong>
          <small>aufeinanderfolgende Kalendertage</small>
        </article>
      </section>

      <section className="review-section" id="gezielter-test">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gezielter Test</p>
            <h2>Passend zu deinen Ergebnissen</h2>
          </div>
          <span>
            {targetedExercises.length}{' '}
            {targetedExercises.length === 1 ? 'Aufgabe' : 'Aufgaben'}
          </span>
        </div>
        {targetedExercises.length ? (
          <div className="targeted-exercises">
            {targetedExercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                number={index + 1}
                onAttempt={(response, evaluation) =>
                  onSaveAttempt(exercise, response, evaluation)
                }
              />
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <h3>Keine gezielte Aufgabe fällig</h3>
            <p>Fehler und fällige Themen erscheinen automatisch hier.</p>
          </div>
        )}
      </section>

      <div className="review-columns">
        <section className="review-panel">
          <p className="eyebrow">Fehlerliste</p>
          <h2>Zuletzt noch offen</h2>
          {insights.errors.length ? (
            <ul className="review-error-list">
              {insights.errors.map((error) => {
                const exercise = exerciseById(error.exerciseId)
                return (
                  <li key={error.exerciseId}>
                    <Link to={`/lektion/${exercise?.lessonId}`}>
                      {exercise?.prompt ?? error.exerciseId}
                    </Link>
                    <small>
                      {error.wrongAttempts} Fehler bei {error.attempts}{' '}
                      {error.attempts === 1 ? 'Versuch' : 'Versuchen'}
                    </small>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>Keine zuletzt falsch beantwortete Aufgabe.</p>
          )}
        </section>

        <section className="review-panel">
          <p className="eyebrow">Schwache Grammatik</p>
          <h2>Themen mit Übungsbedarf</h2>
          {insights.weakGrammar.length ? (
            <ul className="weak-grammar-list">
              {insights.weakGrammar.map((item) => (
                <li key={item.grammarId}>
                  <Link to={`/grammatik#${item.grammarId}`}>
                    {grammarRuleById(item.grammarId)?.title ?? item.grammarId}
                  </Link>
                  <span>
                    {item.score}% · {item.attempts}{' '}
                    {item.attempts === 1 ? 'Versuch' : 'Versuche'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Noch kein schwaches Grammatikthema erkannt.</p>
          )}
        </section>
      </div>

      <section className="review-section" id="schwierige-woerter">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Schwierige Wörter</p>
            <h2>Aktiv erinnern statt nur lesen</h2>
          </div>
          <span>
            {reviewWords.length} {reviewWords.length === 1 ? 'Wort' : 'Wörter'}
          </span>
        </div>
        {reviewWords.length ? (
          <div className="word-review-grid">
            {reviewWords.map((word) => (
              <WordReviewCard
                key={word.id}
                word={word}
                manuallyMarked={difficultItems.includes(word.id)}
                onToggleDifficult={onToggleDifficult}
                onReview={onReview}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <h3>Noch keine schwierigen Wörter</h3>
            <p>
              Fehlerhafte Kurswörter erscheinen automatisch. Im Wörterbuch
              kannst du weitere Wörter selbst markieren.
            </p>
          </div>
        )}
      </section>

      <section className="schedule-explanation">
        <div>
          <p className="eyebrow">Spaced Repetition</p>
          <h2>So plant Piano die Abstände</h2>
          <p>
            „Sicher gewusst“ verlängert den Abstand schrittweise auf 1, 3, 7,
            14, 30 und 60 Tage. „Schwer“ verlängert vorsichtig, mindestens bis
            morgen. „Nochmal“ legt das Thema in zehn Minuten wieder vor.
          </p>
        </div>
        <dl>
          <div>
            <dt>Geplante Themen</dt>
            <dd>{Object.keys(reviewSchedule).length}</dd>
          </div>
          <div>
            <dt>Nächster Termin</dt>
            <dd>{nextReviewLabel(reviewSchedule)}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
