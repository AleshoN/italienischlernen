const releases = [
  {
    version: '1.1.0',
    current: true,
    date: '6. August 2026',
    dateTime: '2026-08-06',
    items: [
      'Verbindlicher A1-Lehrplan mit 12 Modulen und 72 aufeinander aufbauenden Lektionen',
      'Gestufte Umsetzungsroadmap bis zum stabilen A1-Gesamtkurs in Version 2.0.0',
      'Dauerhafte A1-IDs sowie Daten-, Migrations-, Prüfungs- und Qualitätsregeln',
      'Dokumentierte offizielle Referenzquellen von Europarat, CILS und CELI',
      'Klare Audio-Freigabeschranke: keine ungeeignete Systemstimme und keine behauptete Hörprüfung ohne freigegebenes italienisches Material',
      'A0-Kurs und Inhaltsversion 1.0.0 bleiben unverändert nutzbar',
    ],
  },
  {
    version: '1.0.1',
    date: '6. August 2026',
    dateTime: '2026-08-06',
    items: [
      'Öffentliche Website über GitHub Pages unter einer dauerhaften Adresse',
      'Automatische Neuveröffentlichung nach jeder freigegebenen Änderung auf dem Hauptzweig',
      'Korrekte PWA-, Service-Worker-, Wörterbuch- und Offlinepfade im Pages-Unterordner',
      'Unveränderter A0-Kursbestand und verlustfreie Übernahme lokaler Lernstände',
      'Eigene Build- und Releaseprüfungen für die öffentliche Pages-Version',
    ],
  },
  {
    version: '1.0.0',
    date: '6. August 2026',
    dateTime: '2026-08-06',
    items: [
      'Stabile A0-Veröffentlichung mit vollständig geprüftem Kursbestand',
      'Lernstand als lokale Datei sichern und verlustfrei wiederherstellen',
      'Abgesicherter Patch-Import mit Versions- und SHA-256-Prüfung, Sicherung und Rückkehr bei Fehlern',
      'Verbesserte Tastaturbedienung, sichtbare Fokusmarkierungen und Sprunglink zum Hauptinhalt',
      'Robuster Offline-Start mit sofortigem Vorabladen der erzeugten Programmdateien',
      'Erweiterte Regressions-, Migrations-, Mobil-, Offline- und Releaseprüfungen',
    ],
  },
  {
    version: '0.9.0',
    date: '6. August 2026',
    dateTime: '2026-08-06',
    items: [
      'Vollständiger A0-Kurs mit 13 Modulen und 84 Lerneinheiten',
      'Kursweite A0-Vokabellisten und ausführliche Grammatikverknüpfungen',
      'Mindestens zwei interaktive Übungen pro Lerneinheit',
      'Dreizehn Modultests und eine A0-Abschlussprüfung',
      'Zusätzliche Präsens-Konjugationen für zentrale regelmäßige und unregelmäßige Verben',
      'Übersichtlicher, einklappbarer Kursbaum für Desktop und Smartphone',
    ],
  },
  {
    version: '0.6.0',
    items: [
      'Transparentes Spaced-Repetition-System mit festen Intervallstufen',
      'Automatische Fehlerliste und gezielte Wiederholungstests',
      'Schwierige Wörter und schwache Grammatikthemen',
      'Nachvollziehbare Trefferquote, aktive Lerntage und Lernserie',
      'Sichere Migration des lokalen Lernstands auf Datenschema 6',
    ],
  },
  {
    version: '0.5.3',
    items: [
      'Allgemeines Italienisch–Deutsch-Wörterbuch mit 16.707 offenen Einträgen',
      'Suche nach italienischen Wörtern, deutschen Bedeutungen und Formen',
      'Quellen- und Lizenzangaben direkt an den offenen Einträgen',
      'Audio, Lautsprechertasten und Aufnahme vorläufig vollständig entfernt',
    ],
  },
  {
    version: '0.5.2',
    items: [
      'Neun mitgelieferte italienische Hörbeispiele für die Offline-Wiedergabe',
      'Aktive Lautsprechertasten auch ohne Browser-Sprachausgabe',
      'Systemstimme wird weiterhin bevorzugt, englische Ersatzstimmen bleiben blockiert',
    ],
  },
  {
    version: '0.5.1',
    items: [
      'Automatische Auswahl einer echten italienischen Stimme',
      'Englische Ersatzstimme blockiert',
      'Verständlicher Hinweis bei fehlender italienischer Systemstimme',
    ],
  },
  {
    version: '0.5.0',
    items: [
      'Kostenlose Browser-Sprachausgabe',
      'Stimmenwahl und Wiedergabegeschwindigkeit',
      'Wiederholen und Stoppen',
      'Vorlesetasten für alle zentralen Beispiele',
      'Optionale lokale Mikrofonaufnahme',
      'Audio-Adapter und gesicherte Migration auf Datenschema 5',
    ],
  },
  {
    version: '0.4.0',
    items: [
      'Durchsuchbares Wörterbuch',
      'Grammatikregister und Konjugationsansicht',
      'Dauerhafte Querverweise zu Lektionen und Übungen',
      'Sichtbare Quellen- und Lizenzangaben',
      'Lokale Favoriten und persönliche Wortlisten',
      'Gesicherte Migration auf Datenschema 4',
    ],
  },
  {
    version: '0.3.0',
    items: [
      'Sechs datengetriebene Aufgabentypen',
      'Direktes erklärendes Fehlerfeedback und Hinweise',
      'Kapitel-Abschlusstest',
      'Lokale Speicherung aller Übungsversuche',
      'Ergebnisanalyse nach Aufgabentyp',
      'Gesicherte Migration auf Datenschema 3',
    ],
  },
  {
    version: '0.2.0',
    items: [
      'Datengetriebener Kursbaum mit Modul- und Kapitelansicht',
      'Drei kleine, aufeinander aufbauende Beispiellektionen',
      'Flexible Inhaltsrenderer für Text, Wendungen, Listen und Vergleiche',
      'Vor-/Zurücknavigation und freie Wiederholung',
      'Lernziele, Voraussetzungen und Zusammenfassungen',
      'Lokale Lesezeichen und Lernverlauf',
      'Gesicherte Migration des Phase-1-Fortschritts',
    ],
  },
  {
    version: '0.1.0',
    items: [
      'Responsives Grundlayout und Navigation',
      'Light/Dark Theme, PWA und Offline-Grundfunktion',
      'IndexedDB-Demo-Fortschritt, Routing und Testgerüst',
    ],
  },
  {
    version: '0.0.1',
    items: [
      'Planungsgrundlage mit Architektur, Datenmodell, Roadmap und Qualitätskonzept',
    ],
  },
]

export function ChangelogPage() {
  return (
    <div className="page changelog">
      <header className="page-header">
        <div>
          <p className="eyebrow">Versionsverlauf</p>
          <h1>Was ist neu?</h1>
          <p>Transparent und nachvollziehbar – jede Version auf einen Blick.</p>
        </div>
      </header>
      {releases.map((release) => (
        <article
          className={release.current ? 'release-card' : 'release-card muted'}
          key={release.version}
        >
          <div className="release-meta">
            {release.current && <span className="pill">Aktuell</span>}
            <time dateTime={release.dateTime ?? '2026-08-05'}>
              {release.date ?? '5. August 2026'}
            </time>
          </div>
          <h2>Version {release.version}</h2>
          <ul>
            {release.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
