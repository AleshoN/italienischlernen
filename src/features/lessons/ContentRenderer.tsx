import type { LessonSection } from '../../types/content'

export function ContentRenderer({ section }: { section: LessonSection }) {
  if (section.type === 'text') return <p>{section.body}</p>
  if (section.type === 'phrases')
    return (
      <>
        {section.body && <p>{section.body}</p>}
        <div className="phrase-list">
          {section.phrases.map((phrase) => (
            <div className="phrase" key={phrase.italian}>
              <strong lang="it">{phrase.italian}</strong>
              <span>{phrase.german}</span>
              {phrase.note && <small>{phrase.note}</small>}
            </div>
          ))}
        </div>
      </>
    )
  if (section.type === 'list')
    return (
      <>
        {section.body && <p>{section.body}</p>}
        <ul className="content-list">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    )
  return (
    <>
      {section.body && <p>{section.body}</p>}
      <div className="comparison-table" role="table" aria-label={section.title}>
        {section.rows.map((row) => (
          <div role="row" key={`${row.situation}-${row.italian}`}>
            <span role="cell">{row.situation}</span>
            <strong role="cell" lang="it">
              {row.italian}
            </strong>
            <span role="cell">{row.german}</span>
          </div>
        ))}
      </div>
    </>
  )
}
