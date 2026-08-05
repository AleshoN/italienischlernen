import { Link, useLocation } from 'react-router-dom'
import { grammarRules } from '../../content/reference/grammar'
import { dictionaryEntryById } from '../../content/reference/dictionary'
import { lessonById } from '../../content/catalog'
import { ReferenceNav } from './ReferenceNav'
import { SourceNote } from './SourceNote'

export function GrammarPage() {
  const { hash } = useLocation()
  return (
    <div className="page grammar-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Nachschlagen</p>
          <h1>Grammatikregister</h1>
          <p>Regeln und kommunikative Muster aus den vorhandenen Lektionen.</p>
        </div>
        <span className="version-chip">{grammarRules.length} Regeln</span>
      </header>
      <ReferenceNav />
      <div className="grammar-list">
        {grammarRules.map((rule, index) => (
          <details
            className="grammar-rule"
            id={rule.id}
            key={rule.id}
            open={index === 0 || hash === `#${rule.id}`}
          >
            <summary>
              <span>
                <small>{rule.category}</small>
                {rule.title}
              </span>
              <b>＋</b>
            </summary>
            <div className="grammar-content">
              <section className="simple-explanation">
                <p className="eyebrow">Einfach erklärt</p>
                <p>{rule.simpleExplanation}</p>
              </section>
              <section>
                <h3>Genauer erklärt</h3>
                <p>{rule.detailedExplanation}</p>
                <p>
                  <strong>Form:</strong> {rule.formation}
                </p>
              </section>
              <section>
                <h3>So verwendest du es</h3>
                <ul>
                  {rule.usage.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Beispiele</h3>
                <div className="grammar-examples">
                  {rule.examples.map((example) => (
                    <div key={example.italian}>
                      <strong lang="it">{example.italian}</strong>
                      <span>{example.german}</span>
                      {example.note && <small>{example.note}</small>}
                    </div>
                  ))}
                </div>
              </section>
              <section className="error-box">
                <h3>Typischer Fehler</h3>
                {rule.commonErrors.map((item) => (
                  <div key={item.error}>
                    <del>{item.error}</del>
                    <strong>{item.correction}</strong>
                    <p>{item.explanation}</p>
                  </div>
                ))}
              </section>
              <section>
                <h3>Gegenbeispiel und Ausnahmen</h3>
                {rule.counterExamples.map((item) => (
                  <p key={item.text}>
                    <strong>Nicht pauschal:</strong> {item.text} —{' '}
                    {item.explanation}
                  </p>
                ))}
                <ul>
                  {rule.exceptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  <strong>Vergleich mit Deutsch:</strong>{' '}
                  {rule.germanComparison}
                </p>
              </section>
              <div className="entry-links">
                {rule.lessonIds.map((id) => (
                  <Link key={id} to={`/lektion/${id}`}>
                    Lektion: {lessonById(id)?.title}
                  </Link>
                ))}
                {rule.vocabularyIds.map((id) => (
                  <Link key={id} to={`/woerterbuch#${id}`}>
                    {dictionaryEntryById(id)?.lemma}
                  </Link>
                ))}
              </div>
              <SourceNote sources={rule.sources} />
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
