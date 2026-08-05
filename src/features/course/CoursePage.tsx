import { Link } from 'react-router-dom'
import { chapters, course, lessons, modules } from '../../content/catalog'
import { finalAssessment } from '../../content/assessments'

export function CoursePage({
  completedLessonIds,
  bookmarks,
}: {
  completedLessonIds: string[]
  bookmarks: string[]
}) {
  const completed = lessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id),
  ).length
  const progress = Math.round((completed / lessons.length) * 100)
  const firstIncompleteModuleId = modules.find((module) =>
    lessons.some(
      (lesson) =>
        lesson.moduleId === module.id &&
        !completedLessonIds.includes(lesson.id),
    ),
  )?.id
  return (
    <div className="page course-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Vollständiger A0-Lernweg</p>
          <h1>{course.title}</h1>
          <p>{course.learningOutcomes[0]}</p>
        </div>
        <span className="version-chip">{progress}% abgeschlossen</span>
      </header>
      <div className="course-actions">
        <Link className="button secondary" to="/wortschatz">
          A0-Vokabellisten
        </Link>
        <Link className="button secondary" to="/grammatik">
          Grammatik nachschlagen
        </Link>
      </div>
      <div className="module-stack">
        {modules.map((module) => {
          const moduleLessons = lessons.filter(
            (lesson) => lesson.moduleId === module.id,
          )
          const moduleDone = moduleLessons.filter((lesson) =>
            completedLessonIds.includes(lesson.id),
          ).length
          return (
            <details
              className="module-card"
              key={module.id}
              open={module.id === firstIncompleteModuleId}
            >
              <summary className="module-heading">
                <span>Modul {module.order}</span>
                <div>
                  <h2>{module.title}</h2>
                  <p>{module.description}</p>
                </div>
                <strong>
                  {moduleDone}/{moduleLessons.length}
                </strong>
              </summary>
              {chapters
                .filter((chapter) => chapter.moduleId === module.id)
                .map((chapter) => (
                  <div className="chapter-card" key={chapter.id}>
                    <header>
                      <div>
                        <p className="eyebrow">Lerneinheiten</p>
                        <h3>{chapter.title}</h3>
                        <p>{chapter.description}</p>
                      </div>
                      <span>
                        {moduleDone}/{chapter.lessonIds.length}
                      </span>
                    </header>
                    <ol className="course-lessons">
                      {chapter.lessonIds.map((id) => {
                        const current = lessons.find((item) => item.id === id)!
                        const done = completedLessonIds.includes(id)
                        return (
                          <li key={id}>
                            <span
                              className={
                                done ? 'lesson-state done' : 'lesson-state'
                              }
                            >
                              {done ? '✓' : current.order}
                            </span>
                            <div>
                              <strong>{current.title}</strong>
                              <small>
                                {current.durationMinutes} Minuten
                                {bookmarks.includes(id) ? ' · Lesezeichen' : ''}
                              </small>
                            </div>
                            <Link to={`/lektion/${id}`}>
                              {done ? 'Wiederholen' : 'Öffnen'} →
                            </Link>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                ))}
              <div className="module-assessment">
                <div>
                  <p className="eyebrow">Modultest</p>
                  <h3>{module.title}</h3>
                  <p>
                    Direktes Feedback und gezielte Wiederholung für dieses
                    Modul.
                  </p>
                </div>
                <Link
                  className="button primary"
                  to={`/test/${module.assessmentId}`}
                >
                  Test starten →
                </Link>
              </div>
            </details>
          )
        })}
      </div>
      <section className="final-assessment-card">
        <div>
          <p className="eyebrow">Kursabschluss</p>
          <h2>{finalAssessment.title}</h2>
          <p>{finalAssessment.description}</p>
        </div>
        <Link className="button primary" to={`/test/${finalAssessment.id}`}>
          A0-Prüfung starten →
        </Link>
      </section>
      <p className="phase-note">
        84 Lerneinheiten · 13 Modultests · eine kursweite A0-Abschlussprüfung
      </p>
    </div>
  )
}
