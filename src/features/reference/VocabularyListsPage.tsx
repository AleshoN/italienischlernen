import { Link } from 'react-router-dom'
import { dictionaryEntries } from '../../content/reference/dictionary'
import { lessons, modules } from '../../content/catalog'
import { ReferenceNav } from './ReferenceNav'

export function VocabularyListsPage() {
  const entryById = new Map(dictionaryEntries.map((entry) => [entry.id, entry]))
  return (
    <div className="page vocabulary-lists-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Kurswortschatz</p>
          <h1>A0-Vokabellisten</h1>
          <p>
            Alle im Kurs eingeführten Wörter und Wendungen, nach Modulen
            geordnet.
          </p>
        </div>
        <span className="version-chip">
          {dictionaryEntries.length} Kurseinträge
        </span>
      </header>
      <ReferenceNav />
      <div className="vocabulary-module-list">
        {modules.map((module) => {
          const ids = new Set(
            lessons
              .filter((lesson) => lesson.moduleId === module.id)
              .flatMap((lesson) => lesson.vocabularyIds),
          )
          const entries = [...ids]
            .map((id) => entryById.get(id))
            .filter(Boolean)
          return (
            <details className="vocabulary-module" key={module.id}>
              <summary>
                <span>Modul {module.order}</span>
                <strong>{module.title}</strong>
                <small>{entries.length} Einträge</small>
              </summary>
              <div className="vocabulary-grid">
                {entries.map((entry) => (
                  <article key={entry!.id}>
                    <strong>{entry!.lemma}</strong>
                    <span>{entry!.translations.join(', ')}</span>
                    <Link to={`/woerterbuch#${entry!.id}`}>Details →</Link>
                  </article>
                ))}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
