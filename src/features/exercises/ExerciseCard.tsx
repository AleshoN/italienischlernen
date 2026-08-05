import { useState } from 'react'
import type {
  Evaluation,
  Exercise,
  ExerciseResponse,
} from '../../types/exercises'
import { evaluateExercise, hasResponse } from './evaluation'

const initialResponse = (exercise: Exercise): ExerciseResponse =>
  exercise.type === 'sentence-order'
    ? []
    : exercise.type === 'matching'
      ? {}
      : ''

export function ExerciseCard({
  exercise,
  number,
  onAttempt,
}: {
  exercise: Exercise
  number?: number
  onAttempt: (
    response: ExerciseResponse,
    evaluation: Evaluation,
  ) => Promise<void> | void
}) {
  const [response, setResponse] = useState<ExerciseResponse>(() =>
    initialResponse(exercise),
  )
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [saving, setSaving] = useState(false)

  const check = async () => {
    const result = evaluateExercise(exercise, response)
    setEvaluation(result)
    setSaving(true)
    await onAttempt(response, result)
    setSaving(false)
  }
  const retry = () => {
    setResponse(initialResponse(exercise))
    setEvaluation(null)
  }

  return (
    <article
      className={`exercise-card ${evaluation ? (evaluation.correct ? 'correct' : 'incorrect') : ''}`}
    >
      <header>
        <span>
          {number ? `Aufgabe ${number}` : 'Übung'} ·{' '}
          {exercise.type.replace('-', ' ')}
        </span>
        <strong>Schwierigkeit {exercise.difficulty}/3</strong>
      </header>
      <h3>{exercise.prompt}</h3>
      {exercise.type === 'multiple-choice' && (
        <div className="choice-grid">
          {exercise.options.map((option) => (
            <button
              key={option.id}
              className={response === option.id ? 'selected' : ''}
              onClick={() => !evaluation && setResponse(option.id)}
              disabled={Boolean(evaluation)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      {exercise.type === 'fill-blank' && (
        <label className="answer-field">
          <span>{exercise.template}</span>
          <input
            aria-label="Lösung für den Lückentext"
            value={typeof response === 'string' ? response : ''}
            onChange={(event) => setResponse(event.target.value)}
            disabled={Boolean(evaluation)}
            autoComplete="off"
          />
        </label>
      )}
      {exercise.type === 'free-text' && (
        <label className="answer-field">
          <span>Deine Antwort</span>
          <input
            aria-label="Freitextantwort"
            value={typeof response === 'string' ? response : ''}
            onChange={(event) => setResponse(event.target.value)}
            disabled={Boolean(evaluation)}
            autoComplete="off"
          />
        </label>
      )}
      {exercise.type === 'conjugation' && (
        <div className="conjugation-box">
          <div>
            <span>Infinitiv</span>
            <strong lang="it">{exercise.infinitive}</strong>
          </div>
          <div>
            <span>Person</span>
            <strong>{exercise.subject}</strong>
          </div>
          <label>
            <span>{exercise.template}</span>
            <input
              aria-label="Konjugierte Form"
              value={typeof response === 'string' ? response : ''}
              onChange={(event) => setResponse(event.target.value)}
              disabled={Boolean(evaluation)}
              autoComplete="off"
            />
          </label>
        </div>
      )}
      {exercise.type === 'sentence-order' && (
        <div className="order-exercise">
          <div className="order-answer" aria-label="Dein Satz">
            {Array.isArray(response) && response.length ? (
              response.map((id) => (
                <button
                  key={id}
                  disabled={Boolean(evaluation)}
                  onClick={() =>
                    setResponse(
                      (response as string[]).filter((item) => item !== id),
                    )
                  }
                >
                  {exercise.tokens.find((token) => token.id === id)?.text}
                </button>
              ))
            ) : (
              <span>Wähle die Wörter in der richtigen Reihenfolge.</span>
            )}
          </div>
          <div className="token-bank">
            {exercise.tokens
              .filter(
                (token) =>
                  !Array.isArray(response) || !response.includes(token.id),
              )
              .map((token) => (
                <button
                  key={token.id}
                  disabled={Boolean(evaluation)}
                  onClick={() =>
                    setResponse([...(response as string[]), token.id])
                  }
                >
                  {token.text}
                </button>
              ))}
          </div>
        </div>
      )}
      {exercise.type === 'matching' && (
        <div className="matching-grid">
          {exercise.pairs.map((pair) => (
            <label key={pair.id}>
              <span>{pair.left}</span>
              <select
                aria-label={`Zuordnung für ${pair.left}`}
                value={
                  !Array.isArray(response) && typeof response === 'object'
                    ? (response[pair.id] ?? '')
                    : ''
                }
                onChange={(event) =>
                  setResponse({
                    ...(response as Record<string, string>),
                    [pair.id]: event.target.value,
                  })
                }
                disabled={Boolean(evaluation)}
              >
                <option value="">Bitte wählen</option>
                {exercise.pairs.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.right}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
      {!evaluation && (
        <details className="hint">
          <summary>Hinweis anzeigen</summary>
          <p>{exercise.hints[0]}</p>
        </details>
      )}
      {evaluation && (
        <div className="exercise-feedback" role="status">
          <strong>
            {evaluation.correct ? 'Richtig!' : 'Noch nicht richtig.'}
          </strong>
          <p>
            {evaluation.correct ? exercise.explanation : exercise.errorFeedback}
          </p>
          {!evaluation.correct && (
            <p>
              <b>Richtige Lösung:</b> {evaluation.expected}
            </p>
          )}
        </div>
      )}
      <div className="exercise-actions">
        {evaluation ? (
          <button className="button secondary" onClick={retry}>
            Noch einmal
          </button>
        ) : (
          <button
            className="button primary"
            onClick={check}
            disabled={!hasResponse(exercise, response) || saving}
          >
            Antwort prüfen
          </button>
        )}
      </div>
    </article>
  )
}
