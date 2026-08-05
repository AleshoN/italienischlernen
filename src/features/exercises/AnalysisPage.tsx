import { Link } from 'react-router-dom'
import { exerciseById } from '../../content/exercises'
import type { ExerciseAttempt, ExerciseType } from '../../types/exercises'

const labels: Record<ExerciseType, string> = {
  'multiple-choice': 'Multiple Choice',
  'fill-blank': 'Lückentext',
  'sentence-order': 'Satzsortierung',
  matching: 'Zuordnung',
  'free-text': 'Freitext',
  conjugation: 'Konjugation',
}

export function AnalysisPage({ attempts }: { attempts: ExerciseAttempt[] }) {
  const correct = attempts.filter((attempt) => attempt.correct).length
  const overall = attempts.length
    ? Math.round((correct / attempts.length) * 100)
    : 0
  const byType = Object.entries(labels).map(([type, label]) => {
    const items = attempts.filter((attempt) => attempt.exerciseType === type)
    return {
      type,
      label,
      count: items.length,
      score: items.length
        ? Math.round(
            (items.filter((item) => item.correct).length / items.length) * 100,
          )
        : null,
    }
  })
  const difficultIds = [
    ...new Set(
      attempts
        .filter((attempt) => !attempt.correct)
        .map((attempt) => attempt.exerciseId),
    ),
  ]
  return (
    <div className="page analysis-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Ergebnisanalyse</p>
          <h1>Deine Übungsergebnisse</h1>
          <p>
            Alle Werte werden nur aus deinen lokal gespeicherten Versuchen
            berechnet.
          </p>
        </div>
      </header>
      {attempts.length === 0 ? (
        <section className="empty-state">
          <span>◎</span>
          <h2>Noch keine Ergebnisse</h2>
          <p>Bearbeite Übungen oder starte den Abschlusstest.</p>
          <Link className="button primary" to="/test/module.it.a0.02">
            Test starten
          </Link>
        </section>
      ) : (
        <>
          <section className="analysis-overview">
            <div className="score-ring small">{overall}%</div>
            <div>
              <h2>Gesamtquote</h2>
              <p>
                {correct} richtige Antworten bei {attempts.length} gespeicherten
                Versuchen.
              </p>
            </div>
          </section>
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Nach Aufgabentyp</p>
                <h2>Was gelingt schon?</h2>
              </div>
            </div>
            <div className="type-analysis">
              {byType.map((item) => (
                <article key={item.type}>
                  <span>{item.label}</span>
                  <strong>
                    {item.score === null ? '–' : `${item.score}%`}
                  </strong>
                  <small>{item.count} Versuche</small>
                </article>
              ))}
            </div>
          </section>
          <section className="difficult-analysis">
            <h2>Noch einmal ansehen</h2>
            {difficultIds.length ? (
              <ul>
                {difficultIds.map((id) => {
                  const exercise = exerciseById(id)
                  return (
                    <li key={id}>
                      <Link to={`/lektion/${exercise?.lessonId}`}>
                        {exercise?.prompt ?? id} →
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p>Aktuell gibt es keine falsch beantwortete Aufgabe.</p>
            )}
          </section>
        </>
      )}
    </div>
  )
}
