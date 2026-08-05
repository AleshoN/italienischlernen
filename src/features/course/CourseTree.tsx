import { NavLink, useLocation } from 'react-router-dom'
import { chapters, lessons, modules } from '../../content/catalog'

export function CourseTree({ compact = false }: { compact?: boolean }) {
  const { pathname } = useLocation()
  const activeLessonId = pathname.startsWith('/lektion/')
    ? pathname.slice('/lektion/'.length)
    : ''
  const activeModuleId = lessons.find(
    (lesson) => lesson.id === activeLessonId,
  )?.moduleId
  return (
    <div className={compact ? 'course-tree compact' : 'course-tree'}>
      {modules.map((module) => (
        <details key={module.id} open={module.id === activeModuleId}>
          <summary className="tree-module">
            Modul {module.order} · {module.title}
          </summary>
          {chapters
            .filter((chapter) => chapter.moduleId === module.id)
            .map((chapter) => (
              <div key={chapter.id}>
                {chapter.lessonIds.map((lessonId) => {
                  const current = lessons.find((item) => item.id === lessonId)!
                  return (
                    <NavLink key={current.id} to={`/lektion/${current.id}`}>
                      <span>{current.order}</span>
                      {current.title}
                    </NavLink>
                  )
                })}
              </div>
            ))}
        </details>
      ))}
      <NavLink className="tree-all-link" to="/kurs">
        Alle Module ansehen →
      </NavLink>
    </div>
  )
}
