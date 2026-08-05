import type { SourceReference } from '../../types/reference'

export function SourceNote({ sources }: { sources: SourceReference[] }) {
  return (
    <details className="source-note">
      <summary>Quelle und Lizenz</summary>
      {sources.map((source) => (
        <div key={source.id}>
          <strong>{source.sourceName}</strong>
          <p>
            Version {source.sourceVersion} · {source.license}
          </p>
          <p>{source.modificationNote}</p>
          {source.originalUrl && (
            <a href={source.originalUrl} target="_blank" rel="noreferrer">
              Originalquelle
            </a>
          )}
        </div>
      ))}
    </details>
  )
}
