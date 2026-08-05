import { Link } from 'react-router-dom'
import { conjugations } from '../../content/reference/conjugations'
import { grammarRuleById } from '../../content/reference/grammar'
import { lessonById } from '../../content/catalog'
import { ReferenceNav } from './ReferenceNav'
import { SourceNote } from './SourceNote'

export function ConjugationPage() {
  return (
    <div className="page conjugation-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Nachschlagen</p>
          <h1>Konjugation</h1>
          <p>
            Verbformen als Nachschlagehilfe – ohne zusätzlichen Lernstoff
            vorauszusetzen.
          </p>
        </div>
      </header>
      <ReferenceNav />
      {conjugations.map((verb) => (
        <article className="conjugation-card" id={verb.id} key={verb.id}>
          <header>
            <div>
              <span className="pill">{verb.tense}</span>
              <h2 lang="it">{verb.lemma}</h2>
              <p>Hilfsverb: {verb.auxiliary} · reflexiv</p>
            </div>
          </header>
          <div
            className="conjugation-table"
            role="table"
            aria-label={`Konjugation von ${verb.lemma}`}
          >
            {verb.forms.map((form) => (
              <div role="row" key={form.person}>
                <span role="cell">{form.person}</span>
                <span role="cell">{form.pronoun}</span>
                <strong role="cell" lang="it">
                  {form.form}
                </strong>
              </div>
            ))}
          </div>
          <div className="reference-notes">
            {verb.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
          <div className="entry-links">
            {verb.lessonIds.map((id) => (
              <Link key={id} to={`/lektion/${id}`}>
                Lektion: {lessonById(id)?.title}
              </Link>
            ))}
            {verb.grammarIds.map((id) => (
              <Link key={id} to={`/grammatik#${id}`}>
                {grammarRuleById(id)?.title}
              </Link>
            ))}
          </div>
          <SourceNote sources={verb.sources} />
        </article>
      ))}
    </div>
  )
}
