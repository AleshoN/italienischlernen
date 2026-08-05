import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { lessonById } from '../../content/catalog'
import { dictionaryEntries } from '../../content/reference/dictionary'
import {
  loadOpenDictionary,
  normalizeDictionaryText,
  openEntryMatches,
} from '../../services/dictionary/openDictionary'
import type { DictionaryEntry, PersonalWordList } from '../../types/reference'
import type {
  OpenDictionaryEntry,
  OpenDictionaryPack,
} from '../../types/open-dictionary'
import { ReferenceNav } from './ReferenceNav'
import { SourceNote } from './SourceNote'

const PAGE_SIZE = 60

type Props = {
  favoriteWordIds: string[]
  difficultItemIds: string[]
  wordLists: PersonalWordList[]
  onToggleFavorite: (wordId: string) => Promise<void>
  onToggleDifficult: (wordId: string) => Promise<void>
  onCreateList: (title: string) => Promise<void>
  onToggleWordInList: (listId: string, wordId: string) => Promise<void>
}

function DifficultButton({
  entryId,
  lemma,
  difficultItemIds,
  onToggleDifficult,
}: {
  entryId: string
  lemma: string
  difficultItemIds: string[]
  onToggleDifficult: (wordId: string) => Promise<void>
}) {
  const difficult = difficultItemIds.includes(entryId)
  return (
    <button
      className={difficult ? 'difficult-button active' : 'difficult-button'}
      onClick={() => void onToggleDifficult(entryId)}
      aria-pressed={difficult}
      aria-label={`${lemma} ${difficult ? 'nicht mehr als schwierig markieren' : 'als schwierig markieren'}`}
      title="Für Wiederholungen markieren"
    >
      !
    </button>
  )
}

type DictionaryResult =
  | { kind: 'curated'; entry: DictionaryEntry }
  | { kind: 'open'; entry: OpenDictionaryEntry }

function FavoriteButton({
  entryId,
  lemma,
  favoriteWordIds,
  onToggleFavorite,
}: {
  entryId: string
  lemma: string
  favoriteWordIds: string[]
  onToggleFavorite: (wordId: string) => Promise<void>
}) {
  const favorite = favoriteWordIds.includes(entryId)
  return (
    <button
      className={favorite ? 'favorite-button active' : 'favorite-button'}
      onClick={() => void onToggleFavorite(entryId)}
      aria-pressed={favorite}
      aria-label={`${lemma} ${favorite ? 'aus Favoriten entfernen' : 'zu Favoriten hinzufügen'}`}
    >
      {favorite ? '★' : '☆'}
    </button>
  )
}

function WordListButtons({
  entryId,
  wordLists,
  onToggleWordInList,
}: {
  entryId: string
  wordLists: PersonalWordList[]
  onToggleWordInList: (listId: string, wordId: string) => Promise<void>
}) {
  if (wordLists.length === 0) return null
  return (
    <div className="add-to-lists">
      <span>In Wortliste:</span>
      {wordLists.map((list) => {
        const included = list.wordIds.includes(entryId)
        return (
          <button
            key={list.id}
            className={included ? 'active' : ''}
            onClick={() => void onToggleWordInList(list.id, entryId)}
          >
            {included ? '✓ ' : '+ '}
            {list.title}
          </button>
        )
      })}
    </div>
  )
}

function CuratedEntryCard({
  entry,
  favoriteWordIds,
  difficultItemIds,
  wordLists,
  onToggleFavorite,
  onToggleDifficult,
  onToggleWordInList,
}: {
  entry: DictionaryEntry
  favoriteWordIds: string[]
  difficultItemIds: string[]
  wordLists: PersonalWordList[]
  onToggleFavorite: (wordId: string) => Promise<void>
  onToggleDifficult: (wordId: string) => Promise<void>
  onToggleWordInList: (listId: string, wordId: string) => Promise<void>
}) {
  return (
    <article className="dictionary-entry" id={entry.id}>
      <header>
        <div>
          <span className="pill">{entry.partOfSpeech}</span>
          <h2 lang="it">{entry.lemma}</h2>
          <p>{entry.translations.join(' · ')}</p>
        </div>
        <div className="entry-actions">
          <FavoriteButton
            entryId={entry.id}
            lemma={entry.lemma}
            favoriteWordIds={favoriteWordIds}
            onToggleFavorite={onToggleFavorite}
          />
          <DifficultButton
            entryId={entry.id}
            lemma={entry.lemma}
            difficultItemIds={difficultItemIds}
            onToggleDifficult={onToggleDifficult}
          />
        </div>
      </header>
      <div className="entry-meta">
        <span>Aussprache: {entry.pronunciation}</span>
        <span>Register: {entry.register}</span>
        <span>{entry.frequency}</span>
      </div>
      <p>{entry.meanings[0]}</p>
      <div className="example">
        <strong lang="it">{entry.examples[0].italian}</strong>
        <span>{entry.examples[0].german}</span>
      </div>
      <div className="entry-links">
        {entry.lessonIds.map((id) => (
          <Link key={id} to={`/lektion/${id}`}>
            Lektion: {lessonById(id)?.title}
          </Link>
        ))}
        {entry.grammarIds.map((id) => (
          <Link key={id} to={`/grammatik#${id}`}>
            Grammatik
          </Link>
        ))}
        {entry.conjugationId && (
          <Link to={`/konjugation#${entry.conjugationId}`}>Konjugation</Link>
        )}
      </div>
      <WordListButtons
        entryId={entry.id}
        wordLists={wordLists}
        onToggleWordInList={onToggleWordInList}
      />
      <SourceNote sources={entry.sources} />
    </article>
  )
}

function OpenEntryCard({
  entry,
  pack,
  favoriteWordIds,
  difficultItemIds,
  wordLists,
  onToggleFavorite,
  onToggleDifficult,
  onToggleWordInList,
}: {
  entry: OpenDictionaryEntry
  pack: OpenDictionaryPack
  favoriteWordIds: string[]
  difficultItemIds: string[]
  wordLists: PersonalWordList[]
  onToggleFavorite: (wordId: string) => Promise<void>
  onToggleDifficult: (wordId: string) => Promise<void>
  onToggleWordInList: (listId: string, wordId: string) => Promise<void>
}) {
  return (
    <article className="dictionary-entry open-dictionary-entry" id={entry.id}>
      <header>
        <div>
          <span className="pill">
            {entry.partsOfSpeech.join(' · ') || 'Wörterbucheintrag'}
          </span>
          <h2 lang="it">{entry.lemma}</h2>
          <p>{entry.meanings.slice(0, 3).join(' · ')}</p>
        </div>
        <div className="entry-actions">
          <FavoriteButton
            entryId={entry.id}
            lemma={entry.lemma}
            favoriteWordIds={favoriteWordIds}
            onToggleFavorite={onToggleFavorite}
          />
          <DifficultButton
            entryId={entry.id}
            lemma={entry.lemma}
            difficultItemIds={difficultItemIds}
            onToggleDifficult={onToggleDifficult}
          />
        </div>
      </header>
      {(entry.ipa || entry.forms.length > 0) && (
        <div className="entry-meta">
          {entry.ipa && <span>IPA: {entry.ipa}</span>}
          {entry.forms.length > 0 && (
            <span>Formen: {entry.forms.slice(0, 8).join(', ')}</span>
          )}
        </div>
      )}
      {entry.meanings.length > 3 && (
        <details className="dictionary-details">
          <summary>Alle {entry.meanings.length} Bedeutungen</summary>
          <ul>
            {entry.meanings.map((meaning) => (
              <li key={meaning}>{meaning}</li>
            ))}
          </ul>
        </details>
      )}
      {entry.examples[0] && (
        <div className="example">
          <strong lang="it">{entry.examples[0].italian}</strong>
          <span>{entry.examples[0].german}</span>
        </div>
      )}
      <WordListButtons
        entryId={entry.id}
        wordLists={wordLists}
        onToggleWordInList={onToggleWordInList}
      />
      <SourceNote
        sources={[
          {
            id: `source.dewiktionary.${entry.id}`,
            sourceName: pack.source.name,
            sourceVersion: pack.source.lastModified ?? 'Quellenstand unbekannt',
            license: pack.source.license,
            originalUrl: entry.sourceUrl,
            modificationNote:
              'Automatisch mit Wiktextract extrahiert und für die lokale Suche zusammengefasst.',
            attributionRequired: pack.source.attributionRequired,
          },
        ]}
      />
    </article>
  )
}

export function DictionaryPage({
  favoriteWordIds,
  difficultItemIds,
  wordLists,
  onToggleFavorite,
  onToggleDifficult,
  onCreateList,
  onToggleWordInList,
}: Props) {
  const { hash } = useLocation()
  const hashTargetId = hash ? decodeURIComponent(hash.slice(1)) : ''
  const hashTarget = dictionaryEntries.find(
    (entry) => entry.id === hashTargetId,
  )
  const [query, setQuery] = useState(() => hashTarget?.lemma ?? '')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')
  const [pack, setPack] = useState<OpenDictionaryPack | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const normalized = normalizeDictionaryText(query)

  useEffect(() => {
    if (!hashTargetId) return
    window.setTimeout(
      () =>
        document
          .getElementById(hashTargetId)
          ?.scrollIntoView({ block: 'center' }),
      0,
    )
  }, [hashTargetId])

  useEffect(() => {
    let active = true
    loadOpenDictionary()
      .then((loaded) => {
        if (active) setPack(loaded)
      })
      .catch((error: unknown) => {
        if (active)
          setLoadError(
            error instanceof Error ? error.message : 'Wörterbuchfehler',
          )
      })
    return () => {
      active = false
    }
  }, [])

  const allEntries = useMemo(() => {
    const byLemma = new Map<string, DictionaryResult>()
    for (const openEntry of pack?.entries ?? [])
      byLemma.set(openEntry.lemma.normalize('NFC'), {
        kind: 'open',
        entry: openEntry,
      })
    for (const curatedEntry of dictionaryEntries)
      byLemma.set(curatedEntry.lemma.normalize('NFC'), {
        kind: 'curated',
        entry: curatedEntry,
      })
    return [...byLemma.values()].sort((left, right) =>
      left.entry.lemma.localeCompare(right.entry.lemma, 'it', {
        sensitivity: 'base',
      }),
    )
  }, [pack])

  const entries = useMemo(
    () =>
      allEntries.filter((result) => {
        if (onlyFavorites && !favoriteWordIds.includes(result.entry.id))
          return false
        if (result.kind === 'open')
          return openEntryMatches(result.entry, normalized)
        return normalizeDictionaryText(
          [
            result.entry.lemma,
            ...result.entry.translations,
            ...result.entry.meanings,
            ...result.entry.collocations,
            ...result.entry.examples.flatMap((example) => [
              example.italian,
              example.german,
            ]),
          ].join(' '),
        ).includes(normalized)
      }),
    [allEntries, favoriteWordIds, normalized, onlyFavorites],
  )
  const visibleEntries = entries.slice(0, visibleCount)
  const remaining = entries.length - visibleEntries.length

  const createList = async () => {
    const title = newListTitle.trim()
    if (!title) return
    await onCreateList(title)
    setNewListTitle('')
  }

  return (
    <div className="page dictionary-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Nachschlagen</p>
          <h1>Wörterbuch</h1>
          <p>
            Allgemeines Italienisch–Deutsch-Wörterbuch plus ausführliche
            Einträge aus dem Lernkurs.
          </p>
        </div>
        <span className="version-chip">
          {pack
            ? `${allEntries.length.toLocaleString('de-DE')} Einträge`
            : 'Lädt …'}
        </span>
      </header>
      <ReferenceNav />
      <section className="open-data-banner">
        <div>
          <p className="eyebrow">Offene Daten</p>
          <h2>Der erfasste italienische Gesamtbestand</h2>
          <p>
            {pack
              ? `${pack.distinctWords.toLocaleString('de-DE')} unterschiedliche Wortformen aus dem deutschsprachigen Wiktionary, ergänzt durch die redaktionellen Kurseinträge.`
              : 'Das offene Wörterbuchpaket wird geladen …'}
          </p>
        </div>
        <a
          href="https://kaikki.org/dewiktionary/Italienisch/index.html"
          target="_blank"
          rel="noreferrer"
        >
          Quelle ansehen
        </a>
      </section>
      {loadError && (
        <p className="dictionary-load-error" role="alert">
          {loadError} Die redaktionellen Kurseinträge bleiben verfügbar.
        </p>
      )}
      <section className="dictionary-tools">
        <label>
          <span>Italienisch oder Deutsch suchen</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="z. B. caffè, essere oder danke"
          />
        </label>
        <label className="favorite-filter">
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={(event) => {
              setOnlyFavorites(event.target.checked)
              setVisibleCount(PAGE_SIZE)
            }}
          />{' '}
          Nur Favoriten
        </label>
      </section>
      <section className="word-list-manager">
        <div>
          <p className="eyebrow">Persönliche Wortlisten</p>
          <h2>Deine Sammlungen</h2>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            void createList()
          }}
        >
          <label htmlFor="new-list" className="sr-only">
            Name der neuen Wortliste
          </label>
          <input
            id="new-list"
            value={newListTitle}
            onChange={(event) => setNewListTitle(event.target.value)}
            placeholder="Neue Liste, z. B. Café"
          />
          <button className="button secondary" disabled={!newListTitle.trim()}>
            Liste anlegen
          </button>
        </form>
        {wordLists.length > 0 && (
          <div className="list-chips">
            {wordLists.map((list) => (
              <span key={list.id}>
                {list.title} · {list.wordIds.length}
              </span>
            ))}
          </div>
        )}
      </section>
      <p className="dictionary-result-count" aria-live="polite">
        {entries.length.toLocaleString('de-DE')} Treffer
      </p>
      <div className="dictionary-results">
        {entries.length === 0 ? (
          <div className="empty-state">
            <h2>Kein Eintrag gefunden</h2>
            <p>
              Versuche einen anderen Suchbegriff oder deaktiviere den
              Favoritenfilter.
            </p>
          </div>
        ) : (
          visibleEntries.map((result) =>
            result.kind === 'curated' ? (
              <CuratedEntryCard
                key={result.entry.id}
                entry={result.entry}
                favoriteWordIds={favoriteWordIds}
                difficultItemIds={difficultItemIds}
                wordLists={wordLists}
                onToggleFavorite={onToggleFavorite}
                onToggleDifficult={onToggleDifficult}
                onToggleWordInList={onToggleWordInList}
              />
            ) : pack ? (
              <OpenEntryCard
                key={result.entry.id}
                entry={result.entry}
                pack={pack}
                favoriteWordIds={favoriteWordIds}
                difficultItemIds={difficultItemIds}
                wordLists={wordLists}
                onToggleFavorite={onToggleFavorite}
                onToggleDifficult={onToggleDifficult}
                onToggleWordInList={onToggleWordInList}
              />
            ) : null,
          )
        )}
      </div>
      {remaining > 0 && (
        <button
          className="button secondary dictionary-load-more"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Weitere Einträge anzeigen ({remaining.toLocaleString('de-DE')} übrig)
        </button>
      )}
    </div>
  )
}
