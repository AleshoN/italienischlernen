import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  chapterByLessonId,
  lessonById,
  lessonNeighbors,
} from '../../content/catalog'
import { exercisesForLesson } from '../../content/exercises'
import { dictionaryEntryById } from '../../content/reference/dictionary'
import { grammarRuleById } from '../../content/reference/grammar'
import type {
  Evaluation,
  Exercise,
  ExerciseResponse,
} from '../../types/exercises'
import { ExerciseCard } from '../exercises/ExerciseCard'
import { ContentRenderer } from './ContentRenderer'

type Props = {
  completedLessonIds: string[]
  bookmarks: string[]
  onComplete: (id: string) => Promise<void>
  onToggleBookmark: (id: string) => Promise<void>
  onSaveAttempt: (
    exercise: Exercise,
    response: ExerciseResponse,
    evaluation: Evaluation,
  ) => Promise<void>
}

export function LessonPage({
  completedLessonIds,
  bookmarks,
  onComplete,
  onToggleBookmark,
  onSaveAttempt,
}: Props) {
  const { lessonId } = useParams()
  const lesson = lessonById(lessonId)
  const [saving, setSaving] = useState(false)
  if (!lesson) return <Navigate to="/kurs" replace />

  const { previous, next } = lessonNeighbors(lesson.id)
  const chapter = chapterByLessonId(lesson.id)
  const lessonExercises = exercisesForLesson(lesson.id)
  const completed = completedLessonIds.includes(lesson.id)
  const bookmarked = bookmarks.includes(lesson.id)
  const finish = async () => {
    setSaving(true)
    await onComplete(lesson.id)
    setSaving(false)
  }

  return (
    <div className="page lesson-page">
      <div className="lesson-toolbar">
        <Link className="back-link" to="/kurs">
          ← Zum Kursbaum
        </Link>
        <button
          className={bookmarked ? 'bookmark active' : 'bookmark'}
          onClick={() => onToggleBookmark(lesson.id)}
          aria-pressed={bookmarked}
        >
          {bookmarked ? '★ Lesezeichen' : '☆ Lesezeichen'}
        </button>
      </div>
      <header className="lesson-header">
        <p className="eyebrow">
          {chapter?.title} · Lektion {lesson.order}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.objectives[0]}</p>
        <span className="pill">Etwa {lesson.durationMinutes} Minuten</span>
      </header>
      <section className="lesson-meta-grid">
        <div className="objective">
          <span aria-hidden="true">◎</span>
          <div>
            <h2>Dein Lernziel</h2>
            {lesson.objectives.map((objective) => (
              <p key={objective}>{objective}</p>
            ))}
          </div>
        </div>
        <div className="prerequisites">
          <h2>Voraussetzungen</h2>
          {lesson.prerequisites.length === 0 ? (
            <p>Keine – du kannst direkt beginnen.</p>
          ) : (
            <ul>
              {lesson.prerequisites.map((id) => (
                <li key={id}>
                  <Link to={`/lektion/${id}`}>
                    {lessonById(id)?.title ?? id}
                  </Link>
                  {completedLessonIds.includes(id) && ' ✓'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="lesson-references">
        <div>
          <p className="eyebrow">Nachschlagen</p>
          <h2>Wörter und Grammatik</h2>
        </div>
        <div className="reference-groups">
          <div>
            <h3>Wörter</h3>
            {lesson.vocabularyIds.map((id) => (
              <Link key={id} to={`/woerterbuch#${id}`}>
                {dictionaryEntryById(id)?.lemma ?? id}
              </Link>
            ))}
          </div>
          <div>
            <h3>Grammatik</h3>
            {lesson.grammarIds.map((id) => (
              <Link key={id} to={`/grammatik#${id}`}>
                {grammarRuleById(id)?.title ?? id}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="lesson-sections">
        {lesson.sections.map((section, index) => (
          <article key={section.id}>
            <span className="step">{index + 1}</span>
            <div>
              <h2>{section.title}</h2>
              <ContentRenderer section={section} />
            </div>
          </article>
        ))}
      </div>
      <section className="lesson-exercises">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Üben</p>
            <h2>Prüfe dein Verständnis</h2>
          </div>
          <span>{lessonExercises.length} Aufgaben</span>
        </div>
        {lessonExercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            number={index + 1}
            onAttempt={(response, evaluation) =>
              onSaveAttempt(exercise, response, evaluation)
            }
          />
        ))}
      </section>
      <section className="summary-card">
        <p className="eyebrow">Kurz zusammengefasst</p>
        <h2>Das nimmst du mit</h2>
        <ul>
          {lesson.summary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="button primary" onClick={finish} disabled={saving}>
          {saving
            ? 'Wird gespeichert …'
            : completed
              ? 'Lektion erneut abschließen'
              : 'Lektion abschließen'}
        </button>
        <p className="storage-note">
          Dein Fortschritt wird nur auf diesem Gerät gespeichert.
        </p>
      </section>
      <nav className="lesson-navigation" aria-label="Lektionsnavigation">
        <div>
          {previous && (
            <Link to={`/lektion/${previous.id}`}>
              ←{' '}
              <span>
                <small>Zurück</small>
                {previous.title}
              </span>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={`/lektion/${next.id}`}>
              <span>
                <small>Weiter</small>
                {next.title}
              </span>{' '}
              →
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
