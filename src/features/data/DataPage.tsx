import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  parseProgressBackup,
  serializeProgressBackup,
} from '../../storage/progressBackup'
import type { UserProgress } from '../../types/content'

type Status = { kind: 'success' | 'error'; message: string } | null

export function DataPage({
  progress,
  onImport,
}: {
  progress: UserProgress | null
  onImport: (progress: UserProgress) => Promise<boolean>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>(null)

  const downloadBackup = () => {
    if (!progress) return
    const blob = new Blob([serializeProgressBackup(progress)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `piano-lernstand-${new Date().toISOString().slice(0, 10)}.json`
    link.hidden = true
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    setStatus({
      kind: 'success',
      message: 'Die Sicherungsdatei wurde erstellt.',
    })
  }

  const importBackup = async (file?: File) => {
    if (!file) return
    try {
      if (file.size > 10 * 1024 * 1024)
        throw new Error('Die Sicherungsdatei ist unerwartet groß.')
      const restored = parseProgressBackup(await file.text())
      if (!(await onImport(restored))) {
        throw new Error(
          'Der Lernstand konnte nicht im Browser gespeichert werden.',
        )
      }
      setStatus({
        kind: 'success',
        message: 'Der Lernstand wurde vollständig wiederhergestellt.',
      })
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Die Sicherungsdatei konnte nicht gelesen werden.',
      })
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="page data-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Lokal und privat</p>
          <h1>Lernstand sichern</h1>
          <p>
            Erstelle eine Datei mit deinem Fortschritt oder stelle eine frühere
            Sicherung wieder her. Es werden keine Daten hochgeladen.
          </p>
        </div>
        <div className="version-chip">v{__APP_VERSION__}</div>
      </header>

      <div className="data-grid">
        <section className="data-card" aria-labelledby="export-title">
          <span className="data-icon" aria-hidden="true">
            ↓
          </span>
          <div>
            <h2 id="export-title">Sicherung herunterladen</h2>
            <p>
              Enthält Lektionen, Ergebnisse, Wiederholungen, Favoriten,
              Wortlisten und Darstellungseinstellung.
            </p>
            <button
              className="button primary"
              type="button"
              disabled={!progress}
              onClick={downloadBackup}
            >
              Lernstand sichern
            </button>
          </div>
        </section>

        <section className="data-card" aria-labelledby="import-title">
          <span className="data-icon" aria-hidden="true">
            ↑
          </span>
          <div>
            <h2 id="import-title">Sicherung wiederherstellen</h2>
            <p>
              Eine gültige Piano-Sicherung ersetzt den Lernstand dieses
              Browserprofils erst nach erfolgreicher Prüfung.
            </p>
            <label className="file-label" htmlFor="progress-import">
              Sicherungsdatei auswählen
            </label>
            <input
              ref={inputRef}
              id="progress-import"
              className="file-input"
              type="file"
              accept="application/json,.json"
              onChange={(event) => void importBackup(event.target.files?.[0])}
            />
          </div>
        </section>
      </div>

      <p
        className={
          status?.kind === 'error' ? 'data-status error' : 'data-status'
        }
        role={status?.kind === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {status?.message}
      </p>

      <section className="update-note" aria-labelledby="update-title">
        <p className="eyebrow">Programm-Updates</p>
        <h2 id="update-title">Patchpakete werden vor dem Einspielen geprüft</h2>
        <p>
          Das Release enthält einen lokalen Patch-Importer mit Versions-, Pfad-
          und Prüfsummenkontrolle, Sicherung und automatischer Wiederherstellung
          bei Fehlern. Die einfache Anleitung steht im Releasepaket.
        </p>
        <div className="data-links">
          <Link to="/verlauf">Lernverlauf öffnen</Link>
          <Link to="/changelog">Änderungen dieser Version ansehen</Link>
        </div>
      </section>
    </div>
  )
}
