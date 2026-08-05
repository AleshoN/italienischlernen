# Offene Wörterbuchdaten

Das allgemeine Italienisch–Deutsch-Wörterbuch wird reproduzierbar aus der deutschsprachigen Wiktionary-Extraktion von Kaikki.org erzeugt.

- Quelle: [Deutschsprachiges Wiktionary – Italienisch](https://kaikki.org/dewiktionary/Italienisch/index.html)
- Rohdaten: `kaikki.org-dictionary-Italienisch.jsonl`
- Extraktion: [Wiktextract](https://github.com/tatuylonen/wiktextract) über Kaikki.org
- Inhaltslizenz: [CC BY-SA 4.0](https://de.wiktionary.org/wiki/Wiktionary:Lizenzbestimmungen)
- Importbefehl: `npm run dictionary:import`
- Erzeugtes Datenpaket: `public/data/dictionary-it-de.wiktionary.json`

Der Import fasst mehrere Wortarten desselben Stichworts zusammen, bewahrt deutsche Bedeutungen, IPA-Angaben, Flexionsformen und bis zu zwei zweisprachige Beispiele und erzeugt aus dem Stichwort eine dauerhafte ID. Die manuell erstellten Einträge der Lernlektionen bleiben als redaktionell ausführlichere Ergänzung erhalten.

Italienisch besitzt – wie jede lebende Sprache – kein endgültig abgeschlossenes „gesamtes Vokabular“. Das Datenpaket bildet den vollständigen, zum angegebenen Quellenstand im deutschsprachigen Wiktionary erfassten italienischen Bestand ab. Fachwörter, Neubildungen oder regionale Wörter können in der Quelle fehlen und werden bei späteren Importen ergänzt.

## Technischer Hinweis

Kaikki.org kennzeichnet die praktische sprachbezogene JSONL-Ausgabe inzwischen als veraltet und verweist langfristig auf die aktuellen Wiktextract-Rohdaten. Das Projekt nutzt sie derzeit wegen des deutlich kleineren, gezielt italienischen Downloads. Der Zugriff ist vollständig im Importskript gekapselt, damit die Quelle später ohne Umbau der Oberfläche gewechselt werden kann.
