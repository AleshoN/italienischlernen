import { Link } from 'react-router-dom'
import { lessons, moduleById } from '../../content/catalog'

export function Dashboard({
  completedLessonIds,
  bookmarks,
  dueReviewCount = 0,
  difficultItemCount = 0,
}: {
  completedLessonIds: string[]
  bookmarks: string[]
  dueReviewCount?: number
  difficultItemCount?: number
}) {
  const nextLesson =
    lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ??
    lessons[0]
  const progress = Math.round(
    (completedLessonIds.length / lessons.length) * 100,
  )
  const nextIndex = lessons.findIndex((lesson) => lesson.id === nextLesson.id)
  const upcomingLessons = lessons.slice(nextIndex, nextIndex + 5)
  const nextModule = moduleById(nextLesson.moduleId)
  return (
    <div className="page dashboard">
      <header className="page-header">
        <div>
          <p className="eyebrow">Buongiorno</p>
          <h1>Dein Italienisch wächst weiter.</h1>
          <p>Ein kleiner, ruhiger Schritt nach dem anderen.</p>
        </div>
        <div className="version-chip">v{__APP_VERSION__}</div>
      </header>
      <section className="hero-card">
        <div>
          <span className="pill">
            A0 · Modul {nextModule?.order}: {nextModule?.title}
          </span>
          <h2>{nextLesson.title}</h2>
          <p>{nextLesson.objectives[0]}</p>
          <Link className="button primary" to={`/lektion/${nextLesson.id}`}>
            {completedLessonIds.length === lessons.length
              ? 'Erneut beginnen'
              : 'Weiterlernen'}{' '}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span>Ciao!</span>
          <i>Buongiorno</i>
          <b>Piacere</b>
        </div>
      </section>
      <section className="review-callout">
        <div className="review-callout-icon" aria-hidden="true">
          ◎
        </div>
        <div>
          <p className="eyebrow">Wiederholen</p>
          <h2>
            {dueReviewCount
              ? dueReviewCount === 1
                ? '1 Thema ist heute fällig.'
                : `${dueReviewCount} Themen sind heute fällig.`
              : 'Dein Wiederholungsplan ist bereit.'}
          </h2>
          <p>
            {difficultItemCount
              ? difficultItemCount === 1
                ? '1 selbst markierter schwieriger Inhalt wird berücksichtigt.'
                : `${difficultItemCount} selbst markierte schwierige Inhalte werden berücksichtigt.`
              : 'Fehler und schwierige Inhalte werden nach deinen Antworten automatisch eingeordnet.'}
          </p>
        </div>
        <Link className="button secondary" to="/wiederholen">
          Plan ansehen
        </Link>
      </section>
      <section className="stats-grid" aria-label="Lernfortschritt">
        <article>
          <span className="stat-icon">✓</span>
          <div>
            <strong>
              {completedLessonIds.length} <small>von {lessons.length}</small>
            </strong>
            <p>Lektionen abgeschlossen</p>
          </div>
        </article>
        <article>
          <span className="stat-icon">◌</span>
          <div>
            <strong>{progress}%</strong>
            <p>Kapitel-Fortschritt</p>
          </div>
        </article>
        <article>
          <span className="stat-icon">★</span>
          <div>
            <strong>{bookmarks.length}</strong>
            <p>Lesezeichen gesetzt</p>
          </div>
        </article>
      </section>
      <section className="section-heading">
        <div>
          <p className="eyebrow">Dein Kurs</p>
          <h2>Deine nächsten Lerneinheiten</h2>
        </div>
        <Link to="/kurs">Kursbaum öffnen</Link>
      </section>
      <div className="dashboard-lessons">
        {upcomingLessons.map((lesson) => {
          const done = completedLessonIds.includes(lesson.id)
          return (
            <article className="lesson-row" key={lesson.id}>
              <div className={done ? 'lesson-number done' : 'lesson-number'}>
                {done ? '✓' : String(lesson.order).padStart(2, '0')}
              </div>
              <div>
                <span className="pill subtle">
                  {lesson.durationMinutes} Minuten
                </span>
                <h3>{lesson.title}</h3>
                <p>{lesson.objectives[0]}</p>
              </div>
              <Link
                className="round-link"
                to={`/lektion/${lesson.id}`}
                aria-label={`Lektion ${lesson.title} öffnen`}
              >
                →
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
