import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  assessmentById,
  exercisesForAssessment,
} from '../../content/assessments'
import type {
  Evaluation,
  Exercise,
  ExerciseResponse,
} from '../../types/exercises'
import { ExerciseCard } from './ExerciseCard'

export function AssessmentPage({
  onSaveAttempt,
  onFinish,
}: {
  onSaveAttempt: (
    exercise: Exercise,
    response: ExerciseResponse,
    evaluation: Evaluation,
  ) => Promise<void>
  onFinish: (assessmentId: string, score: number) => Promise<void>
}) {
  const { assessmentId } = useParams()
  const assessment = assessmentById(assessmentId)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [finished, setFinished] = useState(false)
  if (!assessment) return <Navigate to="/kurs" replace />
  const assessmentExercises = exercisesForAssessment(assessment)
  const record = async (
    exercise: Exercise,
    response: ExerciseResponse,
    evaluation: Evaluation,
  ) => {
    setResults((current) => ({ ...current, [exercise.id]: evaluation.correct }))
    await onSaveAttempt(exercise, response, evaluation)
  }
  const correct = Object.values(results).filter(Boolean).length
  const score = Math.round((correct / assessmentExercises.length) * 100)
  const finish = async () => {
    await onFinish(assessment.id, score)
    setFinished(true)
  }

  if (finished)
    return (
      <div className="page assessment-page">
        <section className="test-result">
          <p className="eyebrow">
            {assessment.kind === 'final' ? 'A0-Prüfung' : 'Modultest'}{' '}
            abgeschlossen
          </p>
          <div className="score-ring">{score}%</div>
          <h1>
            {score >= 80
              ? 'Ottimo – sehr gut!'
              : score >= 50
                ? 'Guter Anfang.'
                : 'Wiederholen lohnt sich.'}
          </h1>
          <p>
            {correct} von {assessmentExercises.length} Aufgaben waren beim
            letzten Versuch richtig.
          </p>
          <div className="result-actions">
            <Link className="button primary" to="/wiederholen">
              Gezielt wiederholen
            </Link>
            <Link className="button secondary" to="/kurs">
              Zum Kursbaum
            </Link>
          </div>
        </section>
      </div>
    )

  return (
    <div className="page assessment-page">
      <Link className="back-link" to="/kurs">
        ← Zum Kursbaum
      </Link>
      <header className="page-header">
        <div>
          <p className="eyebrow">
            {assessment.kind === 'final' ? 'Abschlussprüfung' : 'Modultest'}
          </p>
          <h1>{assessment.title}</h1>
          <p>{assessment.description}</p>
        </div>
        <span className="version-chip">
          {Object.keys(results).length}/{assessmentExercises.length} beantwortet
        </span>
      </header>
      <div className="assessment-list">
        {assessmentExercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            number={index + 1}
            onAttempt={(response, evaluation) =>
              record(exercise, response, evaluation)
            }
          />
        ))}
      </div>
      <section className="finish-test">
        <p>
          Beantworte jede Aufgabe mindestens einmal, um den Test abzuschließen.
        </p>
        <button
          className="button primary"
          disabled={Object.keys(results).length !== assessmentExercises.length}
          onClick={finish}
        >
          Test abschließen
        </button>
      </section>
    </div>
  )
}
