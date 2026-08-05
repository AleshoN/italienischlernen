import { Link } from 'react-router-dom'
import { lessonById } from '../../content/catalog'
import type { ActivityEntry } from '../../types/content'

const actionLabel = {
  completed: 'abgeschlossen',
  bookmarked: 'als Lesezeichen gespeichert',
  'bookmark-removed': 'aus den Lesezeichen entfernt',
  'exercise-completed': 'als Übung beantwortet',
  'test-completed': 'als Abschlusstest beendet',
}

export function HistoryPage({ entries }: { entries: ActivityEntry[] }) {
  return (
    <div className="page history-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Lernverlauf</p>
          <h1>Deine letzten Schritte</h1>
          <p>Der Verlauf bleibt ausschließlich auf diesem Gerät.</p>
        </div>
      </header>
      {entries.length === 0 ? (
        <section className="empty-state">
          <span>◷</span>
          <h2>Noch kein Verlauf</h2>
          <p>Schließe eine Lektion ab oder setze ein Lesezeichen.</p>
          <Link className="button primary" to="/kurs">
            Zum Kurs
          </Link>
        </section>
      ) : (
        <ol className="history-list">
          {entries.map((entry) => {
            const lesson = lessonById(entry.lessonId)
            return (
              <li key={entry.id}>
                <span className="history-dot" />
                <div>
                  <strong>
                    {lesson?.title ??
                      (entry.lessonId === 'assessment.it.a0.02'
                        ? 'Abschlusstest Kennenlernen'
                        : entry.lessonId)}
                  </strong>
                  <p>{actionLabel[entry.action]}</p>
                </div>
                <time dateTime={entry.occurredAt}>
                  {new Intl.DateTimeFormat('de-DE', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(entry.occurredAt))}
                </time>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
