# Piano – Italienisch-Lernplattform 1.0.0

Piano ist eine kostenlose, offlinefähige Italienisch-Lernplattform für den Einstieg auf Niveau A0. Version 1.0.0 ist die erste stabile Veröffentlichung und enthält den vollständigen A0-Lernweg mit 13 Modulen, 84 Lerneinheiten, 168 interaktiven Aufgaben, 13 Modultests, einer A0-Abschlussprüfung, 747 kuratierten Kurswörtern und -wendungen sowie dem allgemeinen offenen Wörterbuch mit 16.707 italienischen Wortformen.

Das zuvor erprobte Audiosystem bleibt auf ausdrücklichen Nutzerwunsch entfernt. Aussprache- und Dialoginhalte sind deshalb als klare Lautregeln, Beispiele und lesbare Dialogsituationen umgesetzt.

## Startanleitung für Anfänger

Du brauchst eine aktuelle LTS-Version von [Node.js](https://nodejs.org/).

1. Entpacke das Releasepaket in einen neuen Ordner.
2. Öffne diesen Ordner in einem Terminal. Unter Windows geht das zum Beispiel über Rechtsklick in den Ordner und „Im Terminal öffnen“.
3. Gib `npm install` ein und warte, bis die kostenlosen Projektabhängigkeiten installiert sind.
4. Gib `npm run dev` ein.
5. Öffne die im Terminal angezeigte Adresse, normalerweise `http://localhost:5173`.

Produktionsnahe Vorschau:

1. `npm run build`
2. `npm run preview`
3. Öffne die angezeigte Adresse, normalerweise `http://localhost:4173`.

## Enthaltene Lernbereiche

- Orientierung und wirksames Lernen
- Alphabet, Vokale, Lautregeln, Doppelkonsonanten und Betonung
- Begrüßung, Höflichkeit, Vorstellung, tu/Lei und Befinden
- Nomen, Genus, Plural, Artikel und Adjektivangleichung
- Personen, Herkunft, Nationalitäten und Fragen
- Zahlen 0–100, Alter, avere und Kontaktdaten
- Familie, Possessivbegleiter und c’è/ci sono
- regelmäßige Verben auf -are, -ere und -ire, Verneinung und Satzbau
- Tageszeiten, Uhrzeit, Wochentage, Datum und Tagesablauf
- Essen, Café, Restaurant, Vorlieben und Mengen
- Orte, Präpositionen, Wegbeschreibung, andare und venire
- Einkaufen, Preise, Demonstrativbegleiter, Farben, Größen und Wünsche
- Festigung, Dialog-, Lese- und Schreibtraining sowie A0-Abschlussprüfung

Nach jedem Modul steht ein eigener Test bereit. Fehler, schwierige Wörter und schwache Grammatikthemen fließen automatisch in den lokalen Wiederholungsplan ein.

## Weitere Befehle

- `npm test` – automatisierte Funktions- und Datenprüfungen
- `npm run lint` – statische Quellcodeprüfung
- `npm run format:check` – Formatierungsprüfung
- `npm run dictionary:import` – offenes Wörterbuch aus der dokumentierten Quelle neu erzeugen
- `npm run release:verify` – erzeugtes Offline- und Releasepaket prüfen
- `npm run patch:import -- <patch.zip> --target <Piano-Ordner>` – ein Patchpaket prüfen, sichern und installieren

## Datenspeicherung und Offlinebetrieb

Abschlüsse, Lesezeichen, Verlauf, Übungsversuche, Testergebnisse, Favoriten, persönliche Wortlisten, schwierige Inhalte und Wiederholungstermine werden ausschließlich im aktuellen Browserprofil in IndexedDB gespeichert. Vorhandener Fortschritt aus älteren Versionen bleibt bei der Aktualisierung auf 1.0.0 erhalten. Es gibt kein Konto, keine Telemetrie und keine kostenpflichtige API.

Im Bereich **Daten** kann der gesamte Lernstand als lesbare JSON-Datei heruntergeladen und später wiederhergestellt werden. Eine Sicherung wird vollständig geprüft, bevor sie den aktuellen lokalen Lernstand ersetzt. Vor einem Browserwechsel, dem Löschen von Websitedaten oder einem Programmupdate sollte eine solche Datei gespeichert werden.

Der Service Worker speichert Programmoberfläche, erzeugte Programmdateien und Wörterbuch beim ersten erfolgreichen Online-Aufruf. Danach steht die Grundfunktion offline bereit. Ein völlig frischer Offline-Erststart ist technisch nicht möglich.

## Updates und Patchpakete

Der lokale Patch-Importer akzeptiert die bereitgestellten ZIP-Pakete. Er prüft Ausgangs- und Zielversion, sichere Dateipfade und alle SHA-256-Prüfsummen. Vor dem Ersetzen legt er im Zielordner unter `.piano-backups` eine Wiederherstellungskopie an. Schlägt ein Schritt fehl, werden bereits ausgeführte Dateiänderungen automatisch zurückgenommen.

Beispiel unter Windows, macOS oder Linux mit installiertem Node.js:

```text
npm run patch:import -- "Pfad/zum/patch-0.9.0-to-1.0.0.zip" --target "Pfad/zur/bisherigen-Piano-App"
```

Die laufende App sollte dabei geschlossen sein. Der persönliche Browser-Lernstand liegt getrennt von den Programmdateien; zusätzlich empfiehlt sich vorher eine Sicherung im Bereich **Daten**.

## Offenes Wörterbuch

Zusätzlich zu den 747 kuratierten Kurseinträgen enthält das Datenpaket 16.707 unterschiedliche italienische Wortformen aus dem deutschsprachigen Wiktionary. Suche, Quellenangaben und Lizenzinformationen funktionieren lokal. Einzelheiten stehen in [OPEN_DATA.md](./OPEN_DATA.md).

## Bekannte Einschränkungen

- Audiosystem, Aussprachewiedergabe und Mikrofonaufnahme sind auf Nutzerwunsch vorläufig nicht enthalten. Hör- und Dialogziele werden in dieser Version über Transkripte und Lautleseübungen angenähert.
- Die Kursinhalte wurden strukturell, sprachlich und durch automatisierte Querverweisprüfungen kontrolliert; eine unabhängige Prüfung jeder Einheit durch muttersprachliche Lehrkräfte wurde in dieser Umgebung nicht durchgeführt.
- Die automatisch erzeugten Standardübungen konzentrieren sich auf Erkennen und aktives Abrufen. Freie mündliche Aussprache und offene Texte können ohne Audio beziehungsweise Lehrkraft nicht zuverlässig bewertet werden.
- Safari/iOS und verschiedene reale Android-Geräte konnten nicht auf physischen Geräten geprüft werden; die Smartphone-Ansicht wurde mit einer schmalen Browserdarstellung kontrolliert.
- Ein echter Screenreader und ein manuell eingestellter Browserzoom von 200 Prozent konnten in dieser Umgebung nicht geprüft werden; Semantik, Fokusregeln, reduzierte Bewegung und zentrale Kontraste wurden automatisiert beziehungsweise im Browser kontrolliert.
- Keine Wortliste kann eine lebende Sprache endgültig vollständig abbilden. Fachwörter, Eigennamen und sehr neue Wörter können im offenen Bestand fehlen.
- Die praktische Kaikki-JSONL-Ausgabe ist vom Anbieter als veraltet markiert; der Import ist deshalb in einem eigenen Skript gekapselt.
- Eine tatsächliche GitHub-Veröffentlichung wurde nicht ausgelöst, weil dieser lokale Projektordner keinem GitHub-Repository zugeordnet ist. Workflow, Releasehinweise und Pakete sind vorbereitet.

Die tatsächlich ausgeführten Prüfungen stehen in [TESTS.md](./TESTS.md). Änderungen dieser Version stehen in [CHANGELOG.md](./CHANGELOG.md).
