# Changelog

Alle wichtigen Änderungen werden hier dokumentiert.

## [1.1.0] – 2026-08-06

### Hinzugefügt

- Verbindlicher A1-Lehrplan mit 12 Modulen, 72 Lektionen, 12 Modultests und einer klar abgegrenzten Abschlussprüfung.
- Eigene A1-Umsetzungsroadmap von der Mehrkurs-Grundlage und einer Pilotlektion bis zum stabilen A1-Gesamtkurs in Version 2.0.0.
- Dauerhafte ID-Muster sowie verbindliche Daten-, Migrations-, Prüfungs- und Freigaberegeln für A1.
- Dokumentierte offizielle Referenzquellen von Europarat, CILS und CELI samt redaktionellen und urheberrechtlichen Regeln.
- Klare Audio-Freigabeschranke für echtes italienisches, lizenziertes und offlinefähiges Material.

### Geändert

- App- und Cacheversion auf 1.1.0 erhöht; Inhaltsversion 1.0.0, Datenschema 6, A0-Kurs und alle bestehenden IDs bleiben unverändert kompatibel.
- Der Release-Workflow nimmt die neuen A1-Planungsdokumente in vollständige Pakete auf.

### Status

Die verbindliche A1-Planungsphase ist abgeschlossen. Version 1.1.0 enthält noch keine freigeschaltete A1-Lektion. Als Nächstes folgt ausschließlich die Mehrkurs-Grundlage mit A1-Diagnose und genau einer Pilotlektion.

## [1.0.1] – 2026-08-06

### Hinzugefügt

- Automatischer GitHub-Pages-Workflow für jeden freigegebenen Stand auf `main` sowie für manuell ausgelöste Veröffentlichungen.
- Eigener Pages-Produktionsbuild und eine Releaseprüfung für den Repository-Unterpfad `/italienischlernen/`.
- Öffentliche, installierbare Web-App unter `https://aleshon.github.io/italienischlernen/`.

### Behoben

- Manifest, Appsymbol, Service Worker, Offline-Start, erzeugte Programmdateien und Wörterbuch werden nun sowohl an der Domainwurzel als auch unter dem GitHub-Pages-Unterpfad korrekt geladen.
- Importierte Lernstandsicherungen behalten die Inhaltsversion des A0-Kurses bei, während nur die technische App-Version aktualisiert wird.

### Geändert

- App- und Cacheversion auf 1.0.1 erhöht; Inhaltsversion 1.0.0, Datenschema 6 und alle dauerhaften IDs bleiben unverändert kompatibel.
- Der Release-Workflow verwendet automatisch die zur angeforderten Version gehörenden Releasehinweise.

### Status

Die stabile A0-Anwendung ist für GitHub Pages eingerichtet. Künftige freigegebene Änderungen auf `main` werden automatisch geprüft, gebaut und auf derselben Adresse veröffentlicht.

## [1.0.0] – 2026-08-06

### Hinzugefügt

- Eigener Bereich „Daten“ zum Herunterladen und Wiederherstellen einer geprüften lokalen Lernstandsicherung.
- Lokaler Patch-Importer für ZIP-Pakete mit Versions-, Pfad- und SHA-256-Prüfung, temporärem Speicher, Sicherung der ersetzten Dateien und automatischer Wiederherstellung bei Fehlern.
- Reproduzierbare Releaseprüfung für PWA-Dateien, Offlinepaket, Manifest, Versionskonsistenz, unabhängige Schriften und zentrale Kontrastpaare.
- GitHub-Actions-Vorbereitung für qualitätsgeprüfte Releasepakete bei versionierten Tags.
- Tastatur-Sprunglink zum Hauptinhalt und verständliche, nicht-destruktive Fehlermeldungen bei Problemen mit dem lokalen Browserspeicher.

### Geändert

- Service Worker lädt die vom Produktionsbuild erzeugten JavaScript- und CSS-Dateien bereits bei der Installation in den aktuellen Versionscache.
- Online-Schriften entfernt, damit Darstellung und Bedienung ohne externe Verbindung vollständig erhalten bleiben.
- Fokusmarkierungen auf Eingaben, Auswahlelemente und aufklappbare Bereiche erweitert; Touch-Ziele und Sekundärtextkontraste verbessert.
- App-, Inhalts- und Cacheversion auf 1.0.0 erhöht. Datenschema 6 und alle dauerhaften Inhalts-IDs bleiben unverändert kompatibel.
- Fehler beim Laden oder Speichern des Lernstands werden sichtbar gemeldet und nicht als leerer Fortschritt ausgegeben.

### Status

Phase 8 umgesetzt. Die lokale Version 1.0.0 ist als A0-Release vollständig gebaut und geprüft. Die tatsächliche Veröffentlichung auf GitHub setzt ein verbundenes GitHub-Repository voraus und wird nicht ohne festgelegtes Ziel ausgeführt.

## [0.9.0] – 2026-08-06

### Hinzugefügt

- Vollständiger A0-Lernweg mit 13 Modulen und 84 Lerneinheiten entsprechend `CURRICULUM_A0.md`.
- 747 dauerhaft identifizierte Kurswörter und -wendungen in eigenen, nach Modulen geordneten Vokabellisten.
- 51 ausführliche Grammatikregeln und elf Präsens-Konjugationstabellen mit Lektionsverweisen.
- 168 interaktive Aufgaben mit direktem Feedback und Einbindung in das bestehende Wiederholungssystem.
- Dreizehn Modultests sowie eine kursweite A0-Abschlussprüfung.
- Eigener Bereich „A0-Wortschatz“ neben Wörterbuch, Grammatik und Konjugation.
- Automatische Integritätsprüfungen für Umfang, eindeutige IDs, Aufgaben, Prüfungen sowie Wörterbuch-, Grammatik- und Konjugationsverweise.

### Geändert

- Kursbaum und Seitenleiste für den großen Kursbestand einklappbar gestaltet.
- Dashboard auf die nächsten fünf Lerneinheiten begrenzt und mit aktuellem Modul beschriftet.
- Prüfungsrouting verallgemeinert; Ergebnisse werden unter der dauerhaften Prüfungs-ID lokal gespeichert.
- Wörterbuch- und Grammatiklinks öffnen den verknüpften Inhalt gezielt.
- Service-Worker-Cache, Inhaltsdaten und Versionsanzeige auf 0.9.0 erhöht; vorhandenes Datenschema 6 bleibt kompatibel.
- Das Audiosystem bleibt entsprechend der ausdrücklichen Nutzerentscheidung entfernt; Aussprache und Dialogverständnis werden mit Lautregeln, Textbeispielen und Transkripten unterstützt.

### Status

Phase 7 umgesetzt. Der A0-Lehrplan ist vollständig strukturell abgebildet und automatisiert auf Referenzintegrität geprüft. Eine unabhängige muttersprachliche Fachprüfung und echte Hörübungen bleiben als bekannte Einschränkungen dokumentiert.

## [0.6.0] – 2026-08-05

### Hinzugefügt

- Transparentes Spaced-Repetition-System für Übungen, Wörter und Grammatikthemen mit den Bewertungen „Nochmal“, „Schwer“ und „Sicher gewusst“.
- Neuer Bereich „Wiederholen“ mit konkreter Tagesempfehlung, gezieltem Test, Fehlerliste, schwierigen Wörtern und schwachen Grammatikthemen.
- Nachvollziehbare Lernstatistik mit Antwortzahl, Trefferquote, aktiven Tagen und aktueller Lernserie.
- Automatische Verknüpfung jeder Übungsantwort mit den zugehörigen Vokabeln und Grammatikregeln.
- Manuelle Markierung beliebiger Kurs- und Open-Source-Wörter als schwierig direkt im Wörterbuch.
- Tests für Intervallplanung, verknüpfte Wiederholungsziele, Lernanalyse, Empfehlungen und schwierige Wörter.

### Geändert

- Das Dashboard zeigt anstehende Wiederholungen und schwierige Wörter an.
- Der bisherige Analysezugang führt in den neuen Wiederholungsbereich; alte `/analyse`-Aufrufe bleiben erreichbar.
- Lokales Datenschema auf Version 6 migriert und vorhandene ältere Wiederholungslisten übernommen.
- Service-Worker-Cache, Inhaltsdaten und Versionsanzeige auf 0.6.0 erhöht.

### Status

Phase 6 umgesetzt. Empfehlungen entstehen aus den tatsächlich lokal gespeicherten Ergebnissen; der vollständige A0-Kurs bleibt Phase 7 vorbehalten.

## [0.5.3] – 2026-08-05

### Hinzugefügt

- Allgemeines Italienisch–Deutsch-Wörterbuch mit 16.707 unterschiedlichen Wortformen aus dem deutschsprachigen Wiktionary.
- Automatisierter, wiederholbarer Import der offenen Wörterbuchdaten über `npm run dictionary:import`.
- Suche über italienische Lemmata, deutsche Bedeutungen, Wortarten und Flexionsformen; Akzente müssen bei der Eingabe nicht gesetzt werden.
- Stabile, aus dem Lemma abgeleitete IDs sowie Quellen- und Lizenzangaben an jedem offenen Eintrag.
- Gestaffelte Ergebnisanzeige für eine flüssige Oberfläche und Offline-Caching des Datenpakets.
- Redaktioneller Wörterbucheintrag für „come ti chiami?“ samt Verknüpfung zur vorhandenen Lektion.
- Dokumentation der offenen Daten und ihrer Weiterverwendung in `OPEN_DATA.md`.

### Entfernt

- Der gesamte Audiobereich einschließlich Navigation, Wiedergabe, Lautsprechertasten, Stimmenwahl, Mikrofonaufnahme und mitgelieferten WAV-Dateien.
- Nicht mehr benötigte Audioeinstellungen und Medienreferenzen aus dem aktiven Datenmodell.

### Geändert

- Alte Aufrufe von `/audio` führen nun zum Wörterbuch.
- Service-Worker-Cache, Inhaltsdaten und Versionsanzeige auf 0.5.3 erhöht.

## [0.5.2] – 2026-08-05

### Behoben

- Die Lautsprechertasten bleiben im eingebetteten Browser anklickbar, obwohl dieser keine Browser-Sprachausgabe bereitstellt.
- Fehlende Systemstimmen führen nicht mehr dazu, dass die zentralen italienischen Hörbeispiele vollständig deaktiviert werden.

### Hinzugefügt

- Neun lokal mitgelieferte italienische WAV-Hörbeispiele mit dauerhaften Medien-IDs.
- Datengetriebener Offline-Audioadapter als Rückfalllösung für Browser ohne Web-Speech-Unterstützung.
- Vorab-Caching aller Hörbeispiele durch den Service Worker.

### Geändert

- Eine verfügbare italienische Systemstimme wird weiterhin bevorzugt; eine englische Ersatzstimme bleibt blockiert.
- Service-Worker-Cache und Versionsanzeige auf 0.5.2 erhöht.

## [0.5.1] – 2026-08-05

### Behoben

- Die automatische Sprachausgabe wählt jetzt ausdrücklich eine als Italienisch gemeldete Stimme.
- Eine gespeicherte oder systemweite englische Standardstimme wird nicht mehr als Ersatz für italienische Texte verwendet.
- Fehlt eine italienische Stimme, bleibt die Ausgabe stumm und zeigt stattdessen eine verständliche Installationshilfe.

### Geändert

- Italienische Stimmen werden anhand ihres Sprachcodes validiert und bevorzugt nach `it-IT`, Systemstandard und lokaler Verfügbarkeit ausgewählt.
- Service-Worker-Cache und Versionsanzeige auf 0.5.1 erhöht.

## [0.5.0] – 2026-08-05

### Hinzugefügt

- kostenloser Browser-Sprachausgabeadapter ohne externe API
- Vorlesetasten an allen zentralen Beispielen der vorhandenen Lektionen, Wörterbuch-, Grammatik- und Konjugationsdaten
- Auswahl lokal verfügbarer italienischer Browser-/Systemstimmen
- einstellbare Wiedergabegeschwindigkeit
- Wiederholen und Stoppen der letzten Ausgabe
- dauerhafte datengetriebene Medienreferenzen für alle zentralen Lektionsbeispiele
- optionale lokale Mikrofonaufnahme mit Wiedergabe und Download
- klar definierte Audio-Adapter-Schnittstelle für spätere optionale Anbieter

### Geändert

- lokales Datenschema auf Version 5 migriert; Stimme und Geschwindigkeit werden lokal gespeichert
- Navigation um den Bereich „Audio & Aussprache“ erweitert
- Service-Worker-Cache und Versionsanzeige auf 0.5.0 erhöht

### Status

Phase 5 umgesetzt. Sprachausgabe und Mikrofon hängen von den Fähigkeiten und Berechtigungen des verwendeten Browsers und Betriebssystems ab; die App bleibt ohne Audio vollständig lernfähig.

## [0.4.0] – 2026-08-05

### Hinzugefügt

- durchsuchbares Wörterbuch für alle Wörter und Wendungen der vorhandenen Beispiellektionen
- Grammatikregister mit einfachen und ausführlichen Erklärungen, Beispielen, Gegenbeispielen, Ausnahmen und typischen Fehlern
- Konjugationsansicht für das in den Beispielinhalten verwendete Verb `chiamarsi`
- dauerhafte Querverweise zwischen Wörtern, Regeln, Verbformen, Lektionen und Übungen
- sichtbare Quellen-, Versions- und Lizenzangaben an jedem Referenzdatensatz
- lokale Wörterbuchfavoriten
- beliebig viele persönliche Wortlisten mit lokaler Speicherung

### Geändert

- lokales Datenschema auf Version 4 migriert; bestehende Daten werden vorher gesichert
- Lektionen um direkte Wörterbuch- und Grammatikverweise ergänzt
- Navigation um den gemeinsamen Nachschlagebereich erweitert
- Service-Worker-Cache und Versionsanzeige auf 0.4.0 erhöht

### Status

Phase 4 umgesetzt. Die Referenzdaten beschränken sich weiterhin auf die fachlich kleinen Beispielinhalte; es wurden keine kommerziellen Wörterbuchdaten übernommen.

## [0.3.0] – 2026-08-05

### Hinzugefügt

- gemeinsame, datengetriebene Übungsengine
- Multiple-Choice-, Lückentext-, Satzsortierungs-, Zuordnungs-, Freitext- und Konjugationsaufgaben
- verständliches Feedback mit richtiger Lösung, Erklärung und optionalem Hinweis
- zwei passende Übungen pro vorhandener Beispiellektion
- Kapitel-Abschlusstest mit allen sechs Aufgabentypen
- lokale Speicherung einzelner Übungsversuche und des Testergebnisses
- Ergebnisanalyse insgesamt und getrennt nach Aufgabentyp
- Verweise auf falsch beantwortete Aufgaben zur gezielten Wiederholung

### Geändert

- lokales Datenschema auf Version 3 migriert; bestehende Phase-1-/Phase-2-Daten werden vorher gesichert
- Kursbaum, Navigation, Lernverlauf und Lektionen um Übungen und Analyse erweitert
- Service-Worker-Cache und Versionsanzeige auf 0.3.0 erhöht

### Status

Phase 3 umgesetzt. Die Übungen prüfen ausschließlich bereits eingeführte Inhalte des kleinen Beispielkapitels; der vollständige A0-Inhalt bleibt Phase 7 vorbehalten.

## [0.2.0] – 2026-08-05

### Hinzugefügt

- datengetriebener Kursbaum mit Kurs-, Modul-, Kapitel- und Lektionsobjekten
- Modul-, Kapitel- und Lektionsansichten
- flexible Inhaltsrenderer für Text, Wendungen, Listen und Vergleiche
- Vor-/Zurücknavigation und freie Wiederholung abgeschlossener Lektionen
- Anzeige von Lernzielen, Voraussetzungen und Zusammenfassungen
- lokale Lesezeichen und chronologischer Lernverlauf
- zwei weitere kleine Beispiellektionen zur Prüfung der Inhaltsengine
- Integritätstests für dauerhafte IDs und Inhaltsreferenzen

### Geändert

- lokale Nutzerdaten auf Schema 2 migriert; Phase-1-Daten werden vor der Migration gesichert
- Dashboard und Navigation an den Kursablauf angepasst
- Service-Worker-Cache und Versionsanzeige auf 0.2.0 erhöht

### Status

Phase 2 umgesetzt. Der vollständige A0-Kurs sowie Übungs-, Wörterbuch-, Audio- und Wiederholungsengine bleiben späteren Phasen vorbehalten.

## [0.1.0] – 2026-08-05

### Hinzugefügt

- React-/TypeScript-/Vite-Projektgerüst
- responsive Desktop-Seitenleiste und mobile Navigation
- Dashboard und Hash-Routing
- helles, dunkles und systemgesteuertes Theme
- PWA-Manifest, Appsymbol und eigener Service Worker
- IndexedDB-Abstraktion für lokalen Demo-Fortschritt
- sichtbare Versionsnummer und Changelog-Ansicht
- Vitest-/Testing-Library-Testgerüst
- genau eine datengetriebene Demo-Lektion mit dauerhaften IDs
- Anfänger-Startanleitung und dokumentierte Einschränkungen

### Status

Phase 1 umgesetzt. Der vollständige A0-Kurs und Funktionen späterer Roadmap-Phasen sind nicht enthalten.

## [0.0.1] – 2026-08-05

### Hinzugefügt

- verbindliche Projektentscheidungen, Projektregeln und Master-Prompt
- A0-Lehrplan, Architektur, Datenmodell, Patch- und Qualitätskonzept
- Quellen- und Lizenzregeln sowie Entwicklungsroadmap

### Status

Planungsgrundlage vollständig. Noch kein Anwendungscode vorhanden.
