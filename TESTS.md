# Tatsächlich ausgeführte Tests

Dieses Protokoll enthält ausschließlich tatsächlich ausgeführte Prüfungen; nicht ausgeführte Ergebnisse werden nicht behauptet.

## GitHub Pages / Version 1.0.1 – 2026-08-06

- `pnpm test` – erfolgreich: 1 Testdatei, 25 Tests bestanden. Dabei wurden der vollständige A0-Daten- und Funktionsbestand, IndexedDB-Speicherung, verlustfreie Aktualisierung der App-Version auf 1.0.1 bei unveränderter Inhaltsversion 1.0.0 sowie Export und Import der Lernstandsicherung geprüft.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Dateien entsprechen der Prettier-Formatierung.
- `pnpm run build` und `pnpm run release:verify` – erfolgreich: 60 Module transformiert und 23 Prüfungen für den normalen Produktions- und Offline-Build bestanden. Das JavaScript-Hauptpaket ist rund 370,1 kB groß, gzip-komprimiert rund 116,5 kB.
- `pnpm run build:pages` und `pnpm run release:verify:pages` – erfolgreich: 60 Module transformiert und 23 Prüfungen für den Unterpfad `/italienischlernen/` bestanden. Geprüft wurden unter anderem App-Version, Cachekennung, Manifest, relative PWA-Pfade, CSS-/JavaScript-Basispfad, Wörterbuch und Offlinepaket.
- Browserprüfung des Pages-Unterpfads – erfolgreich: Dashboard, sichtbare Version 1.0.1, Navigation und Wörterbuch mit 17.106 kombinierten beziehungsweise 16.707 offenen Einträgen wurden aus einer realistisch unter `/italienischlernen/` bereitgestellten Produktionsausgabe geladen. Manifest, Symbol, CSS und JavaScript verwiesen auf denselben Unterpfad; es wurden keine Browserfehler protokolliert.
- Offline-Prüfung des Pages-Unterpfads – erfolgreich: Nach dem ersten Online-Aufruf wurde ausschließlich der dafür gestartete lokale Webserver beendet. Die Wörterbuchansicht ließ sich anschließend unter derselben Unterpfad-Adresse vollständig neu laden; Überschrift, Eintragsanzahl und Version 1.0.1 blieben sichtbar und es wurden keine Browserfehler protokolliert.

Der erste Aufruf der lokalen Prüfwerkzeuge konnte nicht starten, weil Node.js in dieser Sitzung noch nicht im sichtbaren Programmpfad lag. Nach Einbindung der vorhandenen Projektlaufzeit wurden alle oben aufgeführten Prüfungen neu und erfolgreich ausgeführt. Die tatsächliche GitHub-Actions-Ausführung, die öffentliche Pages-Adresse und das Releasepaket werden erst nach ihrer wirklichen Veröffentlichung als geprüft ergänzt.

## Phase 8 / Version 1.0.0 – 2026-08-06

- `pnpm test` – erfolgreich: 1 Testdatei, 25 Tests bestanden. Zusätzlich zum vollständigen A0-Daten- und Funktionsbestand wurden die verlustfreie Aktualisierung eines belegten 0.9.0-Lernstands auf 1.0.0, Export und Import einer gültigen Lernstandsicherung, Ablehnung eines fremden Sicherungsformats, semantischer Versionsvergleich und Theme-Auflösung geprüft.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 60 Module transformiert. Das JavaScript-Hauptpaket ist rund 369,7 kB groß, gzip-komprimiert rund 116,3 kB.
- `pnpm run release:verify` – erfolgreich: Manifest, Versions- und Cachekennung, PWA-Start, Buildreferenzen, Offlinepaket, fehlende Online-Schriftabhängigkeit, Dokumentsprache, Mobil-Viewport, Sprunglink, reduzierte Bewegung und sechs zentrale Farbpaare mit mindestens 4,5:1 wurden geprüft.
- HTTP-Smoke-Test – erfolgreich: Startseite, Manifest und Service Worker antworteten in einer frischen Produktionsvorschau mit HTTP 200; die Cachekennung `piano-app-v1.0.0-r1` und das aktuelle Build-Asset wurden erkannt.
- Desktop-Browserprüfung – erfolgreich: Version 1.0.0, Dashboard, vollständige Navigation, semantisch beschriftete Bereiche, neuer Datenbereich und tatsächlich ausgelöster Sicherungsdownload mit sichtbarer Erfolgsmeldung wurden geprüft. Es wurden keine Browserfehler protokolliert.
- Smartphone-Prüfung – erfolgreich: Die gebaute App wurde in einer echten 390-Pixel-Browserfläche geprüft. Ein zunächst sichtbarer Engpass mit sieben überlappenden Navigationsbeschriftungen und ein zu schwacher Dunkelmodus-Kontrast wurden korrigiert. Die wiederholte Prüfung zeigte fünf klar getrennte Navigationsziele, einspaltige Datenkarten und lesbare Bedienelemente.
- Offline-Prüfung – erfolgreich: Nach dem ersten Online-Aufruf wurde ausschließlich die dafür gestartete Produktionsvorschau beendet. Dieselbe Datenansicht ließ sich anschließend ohne erreichbaren Webserver vollständig neu laden; es erschienen keine Browserfehler.
- Patch-Importtest – erfolgreich: Ein entpacktes Vollrelease 0.9.0 wurde mit `patch-0.9.0-to-1.0.0.zip` auf 1.0.0 aktualisiert. 76 Payload-Dateien wurden vorab geprüft und stimmten nach der Installation mit ihren SHA-256-Werten überein. Alte 0.9.0-Builddateien wurden entfernt, eine Wiederherstellungskopie wurde angelegt und eine nicht zum Programm gehörende Testdatei blieb unverändert. Ein absichtlich verändertes Patchpaket wurde wegen der falschen Prüfsumme von `package.json` abgelehnt.
- Releasepaket-Prüfung – erfolgreich: 78 Einträge im Vollpaket wurden kontrolliert; Quellcode, Produktionsbuild, Wörterbuch, Dokumentation und GitHub-Workflow sind enthalten. `sources/`, `node_modules/` und Audiopfade fehlen wie vorgesehen.

Nicht ausgeführt wurden Prüfungen auf physischen iPhones oder Android-Geräten, mit einem echten Screenreader und bei manuell eingestelltem Browserzoom von 200 Prozent. Die tatsächliche GitHub-Veröffentlichung wurde ebenfalls nicht ausgelöst, weil dieser lokale Projektordner keinem GitHub-Repository zugeordnet ist. Eine unabhängige muttersprachliche Prüfung aller 84 Lerneinheiten bleibt ausstehend; das entfernte Audiosystem wurde nicht getestet.

## Phase 7 / Version 0.9.0 – 2026-08-06

- `pnpm test` – erfolgreich: 1 Testdatei, 21 Tests bestanden. Geprüft wurden unter anderem 13 Module, 84 Lerneinheiten, 168 Aufgaben, 500–800 kuratierte Kurseinträge, 13 Modultests, die zwölfteilige A0-Abschlussprüfung, eindeutige dauerhafte IDs, sämtliche Lektions-/Aufgaben-/Wörterbuch-/Grammatik-/Konjugationsverweise, Musterlösungen aller Aufgaben, Fortschrittsmigration und IndexedDB-Rundtrip.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 58 Module transformiert, Ausgabe in `dist/` erzeugt. Das JavaScript-Hauptpaket ist rund 362,5 kB groß, gzip-komprimiert rund 114,0 kB.
- HTTP-Smoke-Test – erfolgreich: Startseite, Manifest, Service Worker und Wörterbuchpaket antworteten mit HTTP 200. Die Cachekennung `piano-app-v0.9.0-r2`, das aktuelle Build-Asset und das 4.535.824 Byte große Open-Data-Wörterbuch wurden erkannt.
- Browser-Funktionsprüfung – erfolgreich: Version 0.9.0, Dashboard mit 84 Lektionen, einklappbarer Kursbaum mit allen 13 Modulen, Modul-1-Inhalte, A0-Vokabellisten, eine Artikel-Lektion mit Grammatikverweis und zwei Aufgaben, direkt geöffnete Grammatikregel, gezielter Wörterbuchsprung, Zahlwort `ventitré` in der richtigen Lektion, A0-Abschlussprüfung mit zwölf Aufgaben und direktes korrektes Aufgabenfeedback wurden in einer frischen Produktionsvorschau geprüft. Es wurden keine Browserfehler protokolliert.
- Releasepaket-Prüfung – erfolgreich: 102 Einträge im Vollpaket und 89 Einträge im Patchpaket kontrolliert; Version 0.9.0 und Cachekennung wurden aus dem Archiv gelesen, alle 58 Patch-Payload-Prüfsummen stimmen und `sources/`, `node_modules/`, alte Patchordner sowie Audiopfade fehlen im Vollpaket.

Eine Smartphone-Breite ließ sich in der eingebetteten Browserumgebung nicht technisch umschalten; die vorhandenen responsiven CSS-Regeln wurden daher durch Build und statische Prüfung, aber nicht in einem realen Mobilgerät kontrolliert. Aussprachewiedergabe und akustisches Hörverstehen wurden nicht getestet, weil das Audiosystem auf Nutzerwunsch entfernt bleibt. Eine unabhängige muttersprachliche Prüfung aller Inhalte wurde nicht durchgeführt.

## Phase 6 / Version 0.6.0 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 25 Tests bestanden. Neu geprüft wurden die transparenten Intervalle für „Nochmal“, „Schwer“ und „Sicher gewusst“, die gemeinsame Planung von Aufgabe, Vokabeln und Grammatik, Fehler- und Schwächenanalyse, gezielte Tests, Migration alter Wiederholungslisten sowie die Markierung schwieriger Wörter.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 54 Module transformiert, Ausgabe in `dist/` erzeugt.
- HTTP-Smoke-Test – erfolgreich: Startseite, Manifest, Service Worker und Wörterbuchpaket antworteten mit HTTP 200; Cachekennung `piano-app-v0.6.0-r2` und das aktuelle Build-Asset wurden erkannt.
- Browser-Funktionsprüfung – erfolgreich: In der laufenden Produktionsvorschau wurde absichtlich eine Aufgabe falsch beantwortet. Daraus erschienen eine konkrete Wiederholung, eine offene Fehlerliste, das schwache Grammatikthema „Begrüßungen und Situation“, das schwierige Wort „ciao“ sowie der nächste Termin. Anschließend wurde das allgemeine Wörterbuchwort `caffè` markiert und als persönliche Wortwiederholung angezeigt. Die Bewertung „Sicher gewusst“ wurde gespeichert.
- Releasepaket-Prüfung – erfolgreich: 70 Einträge im Vollpaket und 37 Einträge im Patchpaket geprüft; alle 31 Patch-Payload-Prüfsummen stimmen. Die erforderlichen Programm-, Wiederholungs- und Dokumentationsdateien sind enthalten; `sources/`, `node_modules/` und Audiopfade fehlen wie vorgesehen.

Die bereits geöffnete PWA zeigte beim ersten Neuladen noch den vorherigen Cache. Nach Aktivierung des neuen Service Workers und einem weiteren Neuladen erschienen die korrigierten Texte der Version 0.6.0. Eine langfristige Prüfung über reale Warteintervalle, Safari/iOS und verschiedene Android-Geräte wurde nicht durchgeführt.

## Patch 0.5.3 – 2026-08-05

- `npm test` – erfolgreich: 1 Testdatei, 20 Tests bestanden. Neu geprüft wurden Laden und Anzeigen des offenen Wörterbuchpakets, deutsche Bedeutungs- und Formensuche, akzentunabhängige Suche, Favoritenfunktion sowie die bestehenden Daten- und Migrationsregeln ohne Audiofelder.
- `npm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 52 Module transformiert, Ausgabe in `dist/` erzeugt.
- `npm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `npm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- Wörterbuchimport – erfolgreich: 17.916 Quelldatensätze wurden zu 16.707 unterschiedlichen Wortformen zusammengefasst; das erzeugte JSON-Paket ist 4.535.824 Bytes groß.
- HTTP-Smoke-Test – erfolgreich: Startseite, Service Worker und Wörterbuchpaket antworteten mit HTTP 200; Cachekennung `piano-app-v0.5.3`, App-Version 0.5.3, Wörterbuchanzahl und das Fehlen der Audio-Navigation im neuen Programmcode wurden geprüft.
- Browser-Funktionsprüfung – erfolgreich: Version 0.5.3, entfernte Audio-Navigation, 16.707 offene Wortformen beziehungsweise 16.711 kombinierte Einträge, deutsche Suche nach „Kaffee“, akzentfreie Suche nach `caffe` und Weiterleitung von `/audio` zum Wörterbuch wurden in der laufenden Produktionsvorschau geprüft.
- Releasepaket-Prüfung – erfolgreich: 67 Einträge im Vollpaket und 41 Einträge im Patchpaket geprüft; Wörterbuch, Importskript und Open-Data-Dokumentation sind enthalten, keine Audiopfade sind im Vollpaket vorhanden und alle 34 Patch-Payload-Prüfsummen stimmen.

Beim ersten Neuladen zeigte die bereits geöffnete PWA erwartungsgemäß noch den alten Cache 0.5.2. Der neue Service Worker wurde im Hintergrund aktiviert; nach einem weiteren Neuladen erschien 0.5.3. Eine akustische Prüfung entfällt, weil das Audiosystem in diesem Patch vollständig entfernt wurde. Die inhaltliche Richtigkeit aller 16.707 Gemeinschaftseinträge wurde nicht einzeln redaktionell geprüft.

## Patch 0.5.2 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 23 Tests bestanden. Neu geprüft wurden aktive Lautsprechertasten und die Auswahl der passenden mitgelieferten italienischen Audiodatei, wenn die Browser-Sprachausgabe vollständig fehlt. Zusätzlich bleiben die Tests gegen englische Ersatzstimmen bestehen.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 58 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- WAV-/HTTP-Prüfung – erfolgreich: neun RIFF/WAVE-Dateien mit insgesamt 377.152 Bytes geprüft; jede Datei wurde von der laufenden Produktionsvorschau vollständig mit HTTP 200 ausgeliefert und ist in der Vorabladeliste des Service Workers enthalten.
- Browser-Funktionsprüfung – erfolgreich: Im eingebetteten Browser wurde das vollständige Fehlen der Web-Speech-Schnittstelle bestätigt. Anschließend wurden Version 0.5.2, der sichtbare Status „Italienisches Offline-Audio bereit“, aktive Lautsprechertasten, der gestartete Abspielzustand für „Ciao!“ sowie das Ausbleiben von Konsolenfehlern geprüft.

Vor dem abschließenden Lauf erfasste Vitest zusätzlich die bereits erzeugte Payload des alten Patchpakets 0.5.1 als unvollständige zweite Testquelle. Die Testsuche wurde deshalb ausdrücklich auf `src/**/*.test.{ts,tsx}` begrenzt; danach bestand der vollständige Lauf mit 23 Tests. Die tatsächliche Klangwahrnehmung kann nicht automatisiert bewertet werden. Die Audiodateien wurden mit einer italienischen Offline-Stimme erzeugt, sind jedoch hörbar synthetisch.

## Patch 0.5.1 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 22 Tests bestanden. Neu geprüft wurde, dass ausschließlich Stimmen mit italienischem Sprachcode ausgewählt werden und eine vorhandene beziehungsweise gespeicherte englische Standardstimme keinen Sprechvorgang auslöst.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 56 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- HTTP-Smoke-Test – erfolgreich: Startseite und Service Worker antworteten mit HTTP 200; Build-Assets und Cachekennung `piano-app-v0.5.1` wurden erkannt.

Die konkrete Stimme des Betriebssystems konnte in der automatisierten Umgebung nicht akustisch beurteilt werden. Der Fix validiert stattdessen den gemeldeten Sprachcode und blockiert jede nicht-italienische Ersatzstimme.

## Phase 5 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 21 Tests bestanden. Geprüft wurden Browser-Audioadapter mit nachgebildeter Web-Speech-API, Übergabe von Text, italienischer Stimme und Tempo, Vorlesen eines zentralen Beispiels, verständlicher Fallback ohne Sprachausgabe/Mikrofon, eindeutige Medien-IDs, vollständige Zuordnung aller zentralen Lektionsbeispiele, Migration auf Datenschema 5 sowie lokale Wiederherstellung der Einstellungen.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 56 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne Fehler oder Warnungen.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- HTTP-Smoke-Test der laufenden Produktionsvorschau – erfolgreich: Startseite, Manifest und Service Worker antworteten mit HTTP 200; Build-Assets und Cachekennung `piano-app-v0.5.0` wurden erkannt.

Die erste Phase-5-Testrunde hatte einen Fehler in der Testbereinigung: Die nachgebildete Browser-API wurde vor dem Aushängen des AudioProviders entfernt. Nach Korrektur bestanden alle 21 Tests; eine anschließende einzelne Fast-Refresh-Lint-Warnung wurde ebenfalls beseitigt. Der danach ausgeführte vollständige Prüflauf war ohne Warnungen erfolgreich. Eine echte Mikrofonaufnahme, konkrete Systemstimmen und gerätespezifische Audiowiedergabe wurden in dieser Umgebung nicht manuell geprüft.

## Phase 4 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 18 Tests bestanden. Geprüft wurden Wörterbuchsuche auf Italienisch und Deutsch, Favoritenaktion, vollständige Grammatikelemente, sechs Präsensformen von `chiamarsi`, dauerhafte und auflösbare Querverweise, Quellen-/Lizenzfelder, Migration auf Datenschema 4 sowie IndexedDB-Speichern und -Wiederherstellen von Versuchen, Favoriten und Wortlisten.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 51 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne gemeldete Fehler.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- HTTP-Smoke-Test der laufenden Produktionsvorschau – erfolgreich: Startseite, Manifest und Service Worker antworteten mit HTTP 200; Build-Assets und Cachekennung `piano-app-v0.4.0` wurden erkannt.

Die erste Phase-4-Testrunde enthielt eine mehrdeutige Abfrage für den absichtlich in jeder Grammatikregel vorhandenen Text „Einfach erklärt“. Nach Präzisierung bestanden alle 18 Tests; der anschließende Build meldete eine zu breite Typableitung in der Migration. Diese wurde auf Schema 3 eingegrenzt. Der danach einschließlich Anker-Navigation ausgeführte vollständige Prüflauf war erfolgreich. Eine gerätespezifische visuelle Browserprüfung wurde nicht durchgeführt.

## Phase 3 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 14 Tests bestanden. Geprüft wurden Lektions-/Kursintegration, alle sechs Aufgabentypen, normalisierte Eingaben, erklärendes Fehlerfeedback, Ergebnisanalyse, eindeutige IDs, auflösbare Übungsreferenzen, Migration von Phase 2 sowie ein echter IndexedDB-Speichern-/Wiederherstellen-Rundtrip.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 42 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne gemeldete Fehler.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- HTTP-Smoke-Test der laufenden Produktionsvorschau – erfolgreich: Startseite, Manifest und Service Worker antworteten mit HTTP 200; Build-Assets und Cachekennung `piano-app-v0.3.0` wurden erkannt.

Im ersten vollständigen Phase-3-Lauf bestanden die 13 damaligen Funktionstests, während der TypeScript-Build eine nicht ausreichend eingegrenzte Union im Migrationscode meldete. Die Typprüfung wurde präzisiert. Danach wurde zusätzlich der IndexedDB-Rundtrip-Test ergänzt; der abschließende vollständige Lauf mit 14 Tests war erfolgreich. Eine gerätespezifische visuelle Browserprüfung wurde nicht durchgeführt.

## Phase 2 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 5 Tests bestanden. Geprüft wurden nächste Lektion auf dem Dashboard, URL-gesteuertes Laden einer Lektion, Vor-/Zurücknavigation, Kursbaum mit Modul/Kapitel/Lektionen, eindeutige dauerhafte IDs, auflösbare Referenzen und verlustfreie Migration eines Phase-1-Fortschritts.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 37 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne gemeldete Fehler.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.
- HTTP-Smoke-Test der laufenden Produktionsvorschau – erfolgreich: Startseite, Manifest und Service Worker antworteten mit HTTP 200; Build-Assets und Cachekennung `piano-app-v0.2.0` wurden erkannt.

Die erste Phase-2-Testrunde enthielt zwei mehrdeutige Testabfragen, weil dieselben Lektionsnamen absichtlich an mehreren sichtbaren Stellen vorkommen. Die Abfragen wurden auf Überschriftenebene beziehungsweise Navigationsrichtung präzisiert; der danach ausgeführte vollständige Prüflauf war erfolgreich. Eine gerätespezifische visuelle Browserprüfung wurde nicht durchgeführt.

## Phase 1 – 2026-08-05

- `pnpm test` – erfolgreich: 1 Testdatei, 2 Tests bestanden. Geprüft wurden Dashboard/Startlink und das Rendern der einzelnen datengetriebenen Demo-Lektion.
- `pnpm run build` – erfolgreich: TypeScript-Projektprüfung und Vite-Produktionsbuild; 30 Module transformiert, Ausgabe in `dist/` erzeugt.
- `pnpm run lint` – erfolgreich: ESLint ohne gemeldete Fehler.
- `pnpm run format:check` – erfolgreich: alle einbezogenen Release-Dateien entsprechen der Prettier-Formatierung.

Die erste Prüfrunde schlug wegen fehlender Test-Globals und inkompatibler, durch `latest` installierter Werkzeugversionen fehl. Diese Konfiguration wurde korrigiert; die oben genannten Ergebnisse stammen vom anschließend vollständig erfolgreichen Durchlauf.

## Manuelle Prüfungen

In dieser Umgebung wurden keine gerätespezifischen Browserprüfungen durchgeführt. Der Versuch einer Browser-Sichtprüfung wurde vor dem Öffnen der App von der lokalen Dateisandbox blockiert und wird deshalb nicht als ausgeführter UI-Test gewertet.
