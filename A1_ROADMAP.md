# Verbindliche A1-Umsetzungsroadmap

Status: verbindlicher Plan ab Version 1.1.0
Ziel: vollständiger, geprüfter A1-Kurs in Version 2.0.0

Diese Roadmap konkretisiert den A1-Abschnitt der allgemeinen `ROADMAP.md`. Sie verändert weder bestehende A0-IDs noch den veröffentlichten A0-Fortschritt. Jede Stufe muss eigenständig startbar, prüfbar und als vollständiges Paket sowie als Patch veröffentlichbar sein.

## Leitplanken

- A0 bleibt während der gesamten A1-Entwicklung vollständig nutzbar.
- Neue Inhalte werden ausschließlich datengetrieben angelegt.
- Eine neue Version darf keine nur angekündigten Lektionen als verfügbar darstellen.
- Jede freigegebene Lektion hat dauerhafte IDs, Lernziele, Wortschatz, Grammatikbezug und mindestens drei sinnvolle Übungen.
- Neue Grammatik wird erklärt, bevor sie produktiv geprüft wird.
- Eine A1-Kompetenz gilt nur dann als umgesetzt, wenn die App sie tatsächlich trainiert und angemessen prüft.
- Die entfernte Audiofunktion wird nicht nebenbei oder mit ungeeigneter Systemstimme wieder eingeführt.
- App-Version und Inhaltsversion werden weiterhin getrennt geführt.

## Versionsstufen

### Version 1.1.0 – A1 verbindlich planen

- vollständiger A1-Lehrplan mit 12 Modulen und 72 Lektionen
- dauerhafte A1-ID-Regeln
- technische und redaktionelle Umsetzungsstufen
- dokumentierte Primärquellen und Qualitätsregeln
- noch keine freigeschaltete A1-Lektion
- Inhaltsversion bleibt `1.0.0`, weil der veröffentlichte Kursbestand unverändert A0 ist

### Version 1.2.0 – Mehrkurs-Grundlage und Pilotlektion

- Kursregister für mehrere Niveaus statt einer fest verdrahteten A0-Kursstruktur
- eindeutige Niveauauswahl und A0/A1-Navigation
- bestehender A0-Kurs ohne ID- oder Fortschrittsverlust
- verallgemeinerte Katalog-, Übungs- und Prüfungszuordnung
- erweiterbare Grammatik- und Zeitformtypen für A1
- A1-Diagnose und genau eine datengetriebene Pilotlektion: `lesson.it.a1.01.01`
- Migrationstests mit vorhandenen A0-Daten

Die Pilotlektion dient der technischen und didaktischen Abnahme. Weitere A1-Lektionen werden erst nach bestandener Pilotprüfung freigegeben.

### Version 1.3.0 – A1 Module 1 bis 3

- Übergang von A0, persönliche Angaben und Formulare
- Tagesablauf und reflexive Verben
- Wohnen, Nachbarschaft und häufige Präpositionen mit Artikel
- drei Modultests und eine kumulative Wiederholung

### Version 1.4.0 – A1 Module 4 bis 6

- Menschen, Beziehungen und Kontakte
- Essen, Einkaufen und Dienstleistungen
- Verkehr, Reise und Unterkunft
- drei Modultests und eine kumulative Wiederholung

### Version 1.5.0 – A1 Module 7 bis 9

- Wetter, Freizeit und konkrete Pläne
- Körper, Gesundheit und Anweisungen
- Einführung des `passato prossimo` mit `avere`
- drei Modultests und eine kumulative Wiederholung

### Version 1.6.0 – A1 Module 10 bis 12

- `passato prossimo` mit `essere`
- Lesen, Schreiben und einfache Informationsvermittlung
- A1-Festigung und Abschlussprojekt
- drei Modultests und Grundstruktur der Abschlussprüfung

### Version 1.7.0 – Produktion, Interaktion und Vermittlung

- freie Kurztexte mit transparenten Checklisten
- geführte Dialogsimulationen und Reparaturstrategien
- Aufgaben zur Weitergabe konkreter Angaben
- Musterlösungen ohne falsche Behauptung objektiver Automatikbewertung
- vollständige Verknüpfung mit Fehleranalyse und Wiederholung

### Version 1.8.0 – Hörverstehen nur nach Audiofreigabe

- Entscheidung über eine technisch und lizenzrechtlich geeignete italienische Audioquelle
- dokumentierte Sprecher-, Lizenz- und Qualitätsprüfung
- Offline-Verfügbarkeit der freigegebenen Audiodateien
- Hörübungen mit langsamem, klarem Italienisch und Transkript
- Alternative ohne Audio für barrierearme Nutzung

Falls diese Anforderungen nicht erfüllt werden, bleibt Hörverstehen sichtbar als noch nicht umgesetzt markiert. Eine englisch klingende Systemstimme ist kein akzeptabler Ersatz.

### Version 1.9.0 – A1-Freigabekandidat

- vollständiger Inhalts-, Sprach- und Techniktest
- A0-Regressionsprüfung
- Prüfung aller IDs, Verweise, Lösungen und Wiederholungszuordnungen
- mobile und Desktop-Abnahme
- Offline-, PWA-, Import-, Export- und Updateprüfung
- Korrekturrunde nach dokumentiertem Review

### Version 2.0.0 – Stabiler A1-Gesamtkurs

- alle 72 A1-Lektionen und 12 Modultests freigegeben
- A1-Abschlussprüfung vollständig nutzbar
- redaktionell geprüfter A1-Wortschatz im Wörterbuch
- vollständige Lernpfade und Wiederholungsempfehlungen
- aktualisierte Pakete, Patch, Prüfsummen, Startanleitung und Release Notes
- keine bekannte kritische oder hohe offene Abweichung

## Dauerhafte IDs

Alle neuen IDs sind klein geschrieben, ASCII-basiert und nach der ersten Veröffentlichung unveränderlich.

| Objekt           | Muster                        | Beispiel                      |
| ---------------- | ----------------------------- | ----------------------------- |
| Kurs             | `course.it.a1`                | `course.it.a1`                |
| Modul            | `module.it.a1.MM`             | `module.it.a1.01`             |
| Kapitel          | `chapter.it.a1.MM.LL`         | `chapter.it.a1.01.01`         |
| Lektion          | `lesson.it.a1.MM.LL`          | `lesson.it.a1.01.01`          |
| Übung            | `exercise.it.a1.MM.LL.NNN`    | `exercise.it.a1.01.01.001`    |
| Modultest        | `assessment.it.a1.MM`         | `assessment.it.a1.01`         |
| Abschlussprüfung | `assessment.it.a1.final`      | `assessment.it.a1.final`      |
| Grammatikthema   | `grammar.it.<thema>`          | `grammar.it.passato-prossimo` |
| Quellenbeleg     | `source.<herausgeber>.<werk>` | `source.coe.cefr.2020`        |

Regeln:

- Gelöschte oder ersetzte IDs werden stillgelegt und niemals für andere Inhalte wiederverwendet.
- Grammatik-IDs sind niveauübergreifend semantisch. Eine A1-Lektion darf auf ein bestehendes A0-Thema verweisen.
- Wird ein Thema fachlich wesentlich geteilt, entstehen neue präzise IDs statt einer Bedeutungsänderung der alten ID.
- Wörterbuch-IDs bleiben lemma- und bedeutungsbezogen. A1 erzeugt keine Dublette nur wegen des Niveaus.
- Medien erhalten erst nach der Audioentscheidung eigene dauerhafte IDs.

## Daten- und Migrationsregeln

Version 1.2.0 muss vor der Inhaltsausweitung folgende Grundlage schaffen:

1. Ein Kursregister liefert A0 und A1 über dieselbe stabile Schnittstelle.
2. Routen und Navigation leiten aus der Kurs-ID ab und enthalten keine A0-Sonderfälle für neue Inhalte.
3. Übungen und Prüfungen werden nach Kurs-, Modul- und Lektionsbezug aufgelöst.
4. Die Zeitformtypen werden rückwärtskompatibel um die tatsächlich benötigten A1-Formen erweitert.
5. Bestehende lokale Fortschrittsdaten bleiben lesbar. A0-Abschlüsse, Fehlerdaten, Wiederholungen und Einstellungen dürfen nicht verschwinden.
6. Neue A1-IDs dürfen in den bestehenden Fortschrittslisten gespeichert werden, ohne alte IDs umzuschreiben.
7. Eine Datenbankschema-Erhöhung erfolgt nur bei tatsächlicher Strukturänderung und benötigt einen getesteten Migrationspfad.
8. Import und Export müssen gemischten A0/A1-Fortschritt erhalten.

## Prüfungsregeln

- Jeder Modultest prüft nur zuvor eingeführte Inhalte.
- Mindestens eine Aufgabe pro Modultest verlangt Transfer statt bloßer Wiedererkennung.
- Automatisch bewertete Aufgaben haben eindeutige Lösungen, tolerieren dokumentierte harmlose Varianten und erklären Fehler.
- Freie Produktion nutzt Kriterien und Muster, wird aber nicht als formell zertifizierte Leistung ausgegeben.
- Die Abschlussprüfung trennt Lesen, sprachliche Strukturen, Schreiben, Interaktion und Vermittlung nachvollziehbar.
- Hörverstehen wird nur bewertet, wenn freigegebenes italienisches Audiomaterial verfügbar ist.
- Zufallsauswahl darf die fachliche Abdeckung und Reproduzierbarkeit der Tests nicht zerstören.

## Qualitätsgates für Version 2.0.0

### Inhalt

- 72 von 72 Lektionen vollständig
- 12 von 12 Modultests vollständig
- eine vollständige A1-Abschlussprüfung
- 600 bis 900 neue redaktionell geprüfte Wörter und Wendungen
- keine ungeklärten Platzhalter, leeren Aufgaben oder ungültigen Verweise
- jede neue Grammatik vor produktiver Prüfung erklärt
- Abgrenzung zu A2 eingehalten

### Technik

- alle automatisierten Tests erfolgreich
- Produktions-Build und GitHub-Pages-Build erfolgreich
- PWA- und Offline-Grundfunktionen geprüft
- A0-Fortschritt vor und nach Migration identisch
- A0 und A1 parallel navigierbar
- Import und Export mit beiden Niveaus geprüft
- vollständiges Paket und inkrementeller Patch erfolgreich verifiziert

### Darstellung und Bedienung

- Kernwege auf Smartphone und Desktop geprüft
- Tastaturbedienung und sichtbarer Fokus vorhanden
- Light- und Dark-Theme lesbar
- lange italienische und deutsche Texte brechen korrekt um
- nicht automatisch bewertbare Aufgaben sind klar gekennzeichnet

### Redaktion

- Quellen und Lizenzen dokumentiert
- italienische Beispiele sprachlich geprüft
- deutsche Erklärungen klar und konsistent
- keine Behauptung einer offiziellen CEFR-, CILS- oder CELI-Zertifizierung
- bekannte Einschränkungen in Release Notes und README genannt

## Tatsächlicher nächster Schritt

Nach Veröffentlichung von Version 1.1.0 beginnt ausschließlich Version 1.2.0: Mehrkurs-Grundlage, A1-Diagnose und eine Pilotlektion. Die übrigen 71 Lektionen werden in dieser Stufe noch nicht angelegt.
