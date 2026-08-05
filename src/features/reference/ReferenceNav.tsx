import { NavLink } from 'react-router-dom'

export function ReferenceNav() {
  return (
    <nav className="reference-nav" aria-label="Nachschlagebereiche">
      <NavLink to="/woerterbuch">Wörterbuch</NavLink>
      <NavLink to="/wortschatz">A0-Wortschatz</NavLink>
      <NavLink to="/grammatik">Grammatik</NavLink>
      <NavLink to="/konjugation">Konjugation</NavLink>
    </nav>
  )
}
