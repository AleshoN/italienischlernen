export type VocabularyItem = { italian: string; german: string }

export type LessonSpec = {
  module: number
  lesson: number
  title: string
  objective: string
  grammarIds: string[]
}

export type ModuleSpec = {
  number: number
  title: string
  description: string
  lessons: Omit<LessonSpec, 'module'>[]
}

const lesson = (
  lessonNumber: number,
  title: string,
  objective: string,
  grammarIds: string[] = [],
): Omit<LessonSpec, 'module'> => ({
  lesson: lessonNumber,
  title,
  objective,
  grammarIds,
})

export const moduleSpecs: ModuleSpec[] = [
  {
    number: 0,
    title: 'Orientierung',
    description: 'Lernweg, Wiederholung und gute Lerngewohnheiten verstehen.',
    lessons: [
      lesson(
        1,
        'So funktioniert dein Kurs',
        'Kurs, Wörterbuch, Wiederholung, Fehleranalyse und Datensicherung sicher nutzen.',
      ),
      lesson(
        2,
        'So lernst du wirksam',
        'Mit aktivem Erinnern, kurzen Einheiten und mutigem Sprechen lernen.',
      ),
    ],
  },
  {
    number: 1,
    title: 'Hören, lesen und aussprechen',
    description: 'Die wichtigsten Laut- und Schriftregeln des Italienischen.',
    lessons: [
      lesson(
        1,
        'Das italienische Alphabet',
        'Die 21 Grundbuchstaben benennen und Wörter buchstabieren.',
        ['grammar.it.pronunciation.alphabet.001'],
      ),
      lesson(
        2,
        'Die fünf Vokale',
        'a, e, i, o und u klar und gleichmäßig aussprechen.',
        ['grammar.it.pronunciation.vowels.001'],
      ),
      lesson(
        3,
        'C und G richtig sprechen',
        'Harte und weiche c- und g-Laute unterscheiden.',
        ['grammar.it.pronunciation.cg.001'],
      ),
      lesson(
        4,
        'Besondere Lautfolgen',
        'sc, sch, gn, gli, qu, z und s in häufigen Wörtern erkennen.',
        ['grammar.it.pronunciation.combinations.001'],
      ),
      lesson(
        5,
        'Doppelkonsonanten',
        'Kurze und lange Konsonanten hörbar unterscheiden.',
        ['grammar.it.pronunciation.doubles.001'],
      ),
      lesson(
        6,
        'Betonung und Akzente',
        'Wortbetonung wahrnehmen und geschriebene Akzente beachten.',
        ['grammar.it.pronunciation.stress.001'],
      ),
    ],
  },
  {
    number: 2,
    title: 'Erste Begegnungen',
    description: 'Begrüßen, höflich reagieren und sich vorstellen.',
    lessons: [
      lesson(
        1,
        'Begrüßen',
        'Informelle und höfliche Begrüßungen passend auswählen.',
        ['grammar.it.register.greetings.001'],
      ),
      lesson(
        2,
        'Höflichkeit',
        'Bitten, danken, reagieren und sich entschuldigen.',
        ['grammar.it.politeness.formulas.001'],
      ),
      lesson(
        3,
        'Sich vorstellen',
        'Den eigenen Namen nennen und nach einem Namen fragen.',
        ['grammar.it.expression.mi-chiamo.001'],
      ),
      lesson(
        4,
        'Du oder Sie?',
        'Zwischen tu und dem höflichen Lei unterscheiden.',
        ['grammar.it.register.tu-lei.001'],
      ),
      lesson(
        5,
        'Wie geht es dir?',
        'Nach dem Befinden fragen und kurz antworten.',
        ['grammar.it.communication.wellbeing.001'],
      ),
      lesson(
        6,
        'Dialog: eine erste Begegnung',
        'Begrüßung, Vorstellung und Abschied in einem kurzen Dialog verbinden.',
      ),
    ],
  },
  {
    number: 3,
    title: 'Nomen, Artikel und Adjektive',
    description: 'Die Grundbausteine italienischer Nominalgruppen.',
    lessons: [
      lesson(
        1,
        'Nomen erkennen',
        'Italienische Nomen als Namen für Personen, Dinge und Orte erkennen.',
        ['grammar.it.noun.basics.001'],
      ),
      lesson(
        2,
        'Männlich oder weiblich',
        'Häufige Genus-Endungen -o und -a zuordnen.',
        ['grammar.it.noun.gender.001'],
      ),
      lesson(
        3,
        'Einzahl und Mehrzahl',
        'Regelmäßige Pluralformen auf -i und -e bilden.',
        ['grammar.it.noun.plural.001'],
      ),
      lesson(
        4,
        'Bestimmte Artikel',
        'il, la, l’, i und le passend verwenden.',
        ['grammar.it.article.definite.001'],
      ),
      lesson(
        5,
        'Lo und gli',
        'Sonderformen vor s + Konsonant, z, gn, ps und x anwenden.',
        ['grammar.it.article.lo-gli.001'],
      ),
      lesson(6, 'Unbestimmte Artikel', 'un, uno, una und un’ unterscheiden.', [
        'grammar.it.article.indefinite.001',
      ]),
      lesson(
        7,
        'Adjektive',
        'Eigenschaften mit einfachen Adjektiven ausdrücken.',
        ['grammar.it.adjective.basics.001'],
      ),
      lesson(
        8,
        'Nomen und Adjektiv angleichen',
        'Adjektive in Genus und Numerus an das Nomen anpassen.',
        ['grammar.it.adjective.agreement.001'],
      ),
    ],
  },
  {
    number: 4,
    title: 'Personen und Herkunft',
    description: 'Über Identität, Wohnort und Herkunft sprechen.',
    lessons: [
      lesson(
        1,
        'Personalpronomen',
        'io, tu, lui, lei, noi, voi und loro verstehen.',
        ['grammar.it.pronoun.subject.001'],
      ),
      lesson(
        2,
        'Das Verb essere',
        'Essere im Präsens für Identität und Eigenschaften verwenden.',
        ['grammar.it.verb.essere.001'],
      ),
      lesson(
        3,
        'Woher kommst du?',
        'Mit essere di und venire da Herkunft nennen.',
        ['grammar.it.preposition.origin.001'],
      ),
      lesson(
        4,
        'Länder und Nationalitäten',
        'Länder, Städte und Nationalitäten korrekt verbinden.',
        ['grammar.it.adjective.nationality.001'],
      ),
      lesson(
        5,
        'Ja-/Nein-Fragen',
        'Durch Intonation einfache Entscheidungsfragen bilden.',
        ['grammar.it.question.yes-no.001'],
      ),
      lesson(6, 'W-Fragen', 'Mit chi, come, dove und cosa gezielt fragen.', [
        'grammar.it.question.words.001',
      ]),
      lesson(
        7,
        'Dialog: neue Bekanntschaften',
        'Name, Herkunft und Wohnort in einem Dialog austauschen.',
      ),
    ],
  },
  {
    number: 5,
    title: 'Zahlen und persönliche Angaben',
    description: 'Zahlen verstehen und wichtige Kontaktdaten austauschen.',
    lessons: [
      lesson(
        1,
        'Zahlen von 0 bis 20',
        'Die Grundzahlen von null bis zwanzig erkennen und verwenden.',
      ),
      lesson(
        2,
        'Zahlen von 21 bis 100',
        'Zehner und zusammengesetzte Zahlen sicher bilden.',
      ),
      lesson(
        3,
        'Das Alter',
        'Mit avere und anni nach dem Alter fragen und antworten.',
        ['grammar.it.expression.age.001'],
      ),
      lesson(
        4,
        'Das Verb avere',
        'Avere im Präsens für Besitz und feste Wendungen verwenden.',
        ['grammar.it.verb.avere.001'],
      ),
      lesson(
        5,
        'Telefon, Adresse und Buchstabieren',
        'Telefonnummer und Anschrift nennen und rückfragen.',
      ),
      lesson(
        6,
        'E-Mail und Sonderzeichen',
        'Eine E-Mail-Adresse langsam und verständlich diktieren.',
      ),
    ],
  },
  {
    number: 6,
    title: 'Familie und Besitz',
    description: 'Familie, Beziehungen und einfache Beschreibungen.',
    lessons: [
      lesson(1, 'Die Familie', 'Nahe Familienmitglieder benennen.'),
      lesson(
        2,
        'Possessivbegleiter',
        'mio, tuo, suo, nostro und vostro angleichen.',
        ['grammar.it.possessive.basics.001'],
      ),
      lesson(
        3,
        'Familienwörter ohne Artikel',
        'Die Artikelregel bei einzelnen nahen Verwandten anwenden.',
        ['grammar.it.possessive.family.001'],
      ),
      lesson(
        4,
        'Personen beschreiben',
        'Aussehen und Charakter mit einfachen Adjektiven beschreiben.',
      ),
      lesson(
        5,
        'C’è und ci sono',
        'Sagen, dass etwas oder jemand vorhanden ist.',
        ['grammar.it.expression.ce-ci-sono.001'],
      ),
    ],
  },
  {
    number: 7,
    title: 'Regelmäßige Verben im Präsens',
    description: 'Einfache Aussagen und Verneinungen mit regelmäßigen Verben.',
    lessons: [
      lesson(
        1,
        'So funktioniert Konjugation',
        'Stamm, Endung und Person als System verstehen.',
        ['grammar.it.verb.conjugation.001'],
      ),
      lesson(
        2,
        'Verben auf -are',
        'Regelmäßige -are-Verben im Präsens konjugieren.',
        ['grammar.it.verb.are.001'],
      ),
      lesson(
        3,
        'Verben auf -ere',
        'Regelmäßige -ere-Verben im Präsens konjugieren.',
        ['grammar.it.verb.ere.001'],
      ),
      lesson(
        4,
        'Verben auf -ire',
        'Regelmäßige -ire-Verben im Präsens konjugieren.',
        ['grammar.it.verb.ire.001'],
      ),
      lesson(
        5,
        'Das Pronomen weglassen',
        'Die handelnde Person an der Verbendung erkennen.',
        ['grammar.it.pronoun.omission.001'],
      ),
      lesson(
        6,
        'Mit non verneinen',
        'Aussagen durch non vor dem Verb verneinen.',
        ['grammar.it.negation.non.001'],
      ),
      lesson(
        7,
        'Einfacher Satzbau',
        'Kurze italienische Hauptsätze natürlich ordnen.',
        ['grammar.it.sentence.order.001'],
      ),
    ],
  },
  {
    number: 8,
    title: 'Tagesablauf, Uhrzeit und Datum',
    description: 'Über Zeit, Termine und Gewohnheiten sprechen.',
    lessons: [
      lesson(
        1,
        'Tageszeiten',
        'Morgen, Mittag, Nachmittag, Abend und Nacht benennen.',
      ),
      lesson(
        2,
        'Wie spät ist es?',
        'Volle Uhrzeiten mit è l’una und sono le bilden.',
        ['grammar.it.time.clock.001'],
      ),
      lesson(
        3,
        'Viertel, halb und Minuten',
        'Genauere Uhrzeiten mit e, meno, quarto und mezza nennen.',
        ['grammar.it.time.minutes.001'],
      ),
      lesson(4, 'Wochentage', 'Wochentage in Terminangaben verwenden.'),
      lesson(
        5,
        'Datum, Monat und Jahr',
        'Das Datum einschließlich il primo korrekt nennen.',
        ['grammar.it.date.basics.001'],
      ),
      lesson(6, 'Mein Tagesablauf', 'Einfache Routinen zeitlich ordnen.'),
      lesson(7, 'Wie oft?', 'Frequenzadverbien passend im Satz platzieren.', [
        'grammar.it.adverb.frequency.001',
      ]),
    ],
  },
  {
    number: 9,
    title: 'Essen und Trinken',
    description: 'Im Café, Restaurant und beim Einkauf kommunizieren.',
    lessons: [
      lesson(
        1,
        'Lebensmittel und Getränke',
        'Grundlegende Speisen und Getränke benennen.',
      ),
      lesson(
        2,
        'Im Café bestellen',
        'Mit vorrei und per me höflich bestellen.',
        ['grammar.it.politeness.vorrei.001'],
      ),
      lesson(
        3,
        'Im Restaurant',
        'Bestellen, nachfragen und um die Rechnung bitten.',
      ),
      lesson(
        4,
        'Mi piace und mi piacciono',
        'Vorlieben im Singular und Plural ausdrücken.',
        ['grammar.it.verb.piacere.001'],
      ),
      lesson(
        5,
        'Mengen und Behälter',
        'Einfache Mengenangaben mit di verbinden.',
        ['grammar.it.quantity.di.001'],
      ),
      lesson(
        6,
        'Dialog: Café und Restaurant',
        'Eine Bestellung vom Gruß bis zur Rechnung bewältigen.',
      ),
    ],
  },
  {
    number: 10,
    title: 'Orte und Orientierung',
    description: 'Orte finden, Wege verstehen und Ziele nennen.',
    lessons: [
      lesson(1, 'Orte in der Stadt', 'Wichtige Gebäude und Plätze benennen.'),
      lesson(
        2,
        'Einfache Präpositionen',
        'a, in, da, di, con, su, per und tra/fra grundlegend verwenden.',
        ['grammar.it.preposition.simple.001'],
      ),
      lesson(
        3,
        'Wo ist …?',
        'Lagewörter und c’è/ci sono zur Orientierung nutzen.',
        ['grammar.it.location.basics.001'],
      ),
      lesson(
        4,
        'Nach dem Weg fragen',
        'Höflich nach einem Ziel und einer Richtung fragen.',
      ),
      lesson(5, 'Das Verb andare', 'Andare im Präsens mit Zielen verwenden.', [
        'grammar.it.verb.andare.001',
      ]),
      lesson(
        6,
        'Das Verb venire',
        'Venire im Präsens mit Herkunft und Bewegung verwenden.',
        ['grammar.it.verb.venire.001'],
      ),
      lesson(
        7,
        'Dialog: in der Stadt',
        'Eine Wegbeschreibung erfragen und nachvollziehen.',
      ),
    ],
  },
  {
    number: 11,
    title: 'Einkaufen und einfache Wünsche',
    description: 'Produkte auswählen, Preise erfragen und Wünsche äußern.',
    lessons: [
      lesson(
        1,
        'Geschäfte und Produkte',
        'Typische Geschäfte und Waren zuordnen.',
      ),
      lesson(2, 'Preise verstehen', 'Preise mit Euro und centesimi nennen.'),
      lesson(
        3,
        'Quanto costa?',
        'Nach dem Preis im Singular und Plural fragen.',
        ['grammar.it.question.price.001'],
      ),
      lesson(
        4,
        'Questo und questa',
        'Nahe Dinge mit dem passenden Demonstrativbegleiter zeigen.',
        ['grammar.it.demonstrative.questo.001'],
      ),
      lesson(
        5,
        'Farben und Größen',
        'Kleidung durch Farbe und Größe genauer beschreiben.',
      ),
      lesson(
        6,
        'Wünsche und Vorlieben',
        'preferisco, voglio und das höfliche vorrei unterscheiden.',
        ['grammar.it.politeness.wants.001'],
      ),
      lesson(
        7,
        'Dialog: im Geschäft',
        'Größe, Farbe und Preis in einem Kaufgespräch klären.',
      ),
    ],
  },
  {
    number: 12,
    title: 'Festigung und Abschluss',
    description:
      'Alle A0-Kompetenzen verbinden und in Alltagssituationen anwenden.',
    lessons: [
      lesson(
        1,
        'Aussprache wiederholen',
        'Laute, Doppelkonsonanten und Betonung gezielt kontrollieren.',
      ),
      lesson(
        2,
        'Artikel und Plural wiederholen',
        'Artikel, Genus und Plural gemeinsam anwenden.',
      ),
      lesson(
        3,
        'Essere und avere wiederholen',
        'Die beiden zentralen unregelmäßigen Verben sicher unterscheiden.',
      ),
      lesson(
        4,
        'Regelmäßige Verben wiederholen',
        'Alle drei regelmäßigen Verbgruppen festigen.',
      ),
      lesson(
        5,
        'Fragen und Verneinung',
        'W-Fragen, Entscheidungsfragen und non verbinden.',
      ),
      lesson(
        6,
        'Alltagssituationen verbinden',
        'Begrüßen, bestellen, einkaufen und nach dem Weg fragen.',
      ),
      lesson(
        7,
        'Projekt: Das bin ich',
        'Eine kurze persönliche Vorstellung planen und schreiben.',
      ),
      lesson(
        8,
        'Dialogtraining A0',
        'Kurze gesprochene Alltagssituationen als Dialogtexte verstehen.',
      ),
      lesson(
        9,
        'Lesetraining A0',
        'Kurze Schilder, Nachrichten und Profile verstehen.',
      ),
      lesson(
        10,
        'Schreibtraining A0',
        'Ein kurzes Profil und eine einfache Nachricht verfassen.',
      ),
    ],
  },
]

export const lessonSpecs: LessonSpec[] = moduleSpecs.flatMap((module) =>
  module.lessons.map((item) => ({ ...item, module: module.number })),
)

const parseVocabulary = (source: string): VocabularyItem[] =>
  source
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [italian, german] = item.split('|').map((part) => part.trim())
      return { italian, german }
    })

const numberNames = [
  'zero',
  'uno',
  'due',
  'tre',
  'quattro',
  'cinque',
  'sei',
  'sette',
  'otto',
  'nove',
  'dieci',
  'undici',
  'dodici',
  'tredici',
  'quattordici',
  'quindici',
  'sedici',
  'diciassette',
  'diciotto',
  'diciannove',
  'venti',
]
const tens = [
  '',
  '',
  'venti',
  'trenta',
  'quaranta',
  'cinquanta',
  'sessanta',
  'settanta',
  'ottanta',
  'novanta',
]
const italianNumber = (value: number) => {
  if (value <= 20) return numberNames[value]
  if (value === 100) return 'cento'
  const ten = Math.floor(value / 10)
  const unit = value % 10
  const base = unit === 1 || unit === 8 ? tens[ten].slice(0, -1) : tens[ten]
  if (unit === 3) return `${base}tré`
  return `${base}${unit ? numberNames[unit] : ''}`
}
const numbers = Array.from({ length: 101 }, (_, value) => ({
  italian: italianNumber(value),
  german: String(value),
}))

const vocabularySources: Record<number, string> = {
  0: 'il corso|der Kurs; la lezione|die Lektion; il modulo|das Modul; imparare|lernen; ripetere|wiederholen; ricordare|sich erinnern; leggere|lesen; scrivere|schreiben; parlare|sprechen; ascoltare|zuhören; capire|verstehen; provare|versuchen; controllare|kontrollieren; correggere|verbessern; l’errore|der Fehler; la risposta|die Antwort; la domanda|die Frage; l’esercizio|die Übung; il test|der Test; il progresso|der Fortschritt; il dizionario|das Wörterbuch; la grammatica|die Grammatik; la parola|das Wort; la frase|der Satz; il dialogo|der Dialog; facile|einfach; difficile|schwierig; giusto|richtig; sbagliato|falsch; ogni giorno|jeden Tag; oggi|heute; domani|morgen; piano piano|Schritt für Schritt; ad alta voce|laut; ancora|noch einmal; pronto|bereit; iniziare|beginnen; finire|beenden; salvare|speichern; i dati|die Daten',
  1: 'a|A; bi|B; ci|C; di|D; e|E; effe|F; gi|G; acca|H; i|I; elle|L; emme|M; enne|N; o|O; pi|P; qu|Q; erre|R; esse|S; ti|T; u|U; vi|V; zeta|Z; casa|Haus; cena|Abendessen; cinema|Kino; cane|Hund; chi|wer; che|was; gelato|Eis; giro|Runde; lago|See; gnocchi|Gnocchi; famiglia|Familie; figlio|Sohn; scuola|Schule; scherzo|Scherz; pizza|Pizza; penna|Stift; anno|Jahr; nonno|Großvater; mamma|Mutter; papà|Vater; città|Stadt; università|Universität; perché|warum; caffè|Kaffee; tè|Tee; zucchero|Zucker; acqua|Wasser; quattro|vier; mezzo|halb; azzurro|hellblau',
  2: 'ciao|hallo; buongiorno|guten Tag; buonasera|guten Abend; buonanotte|gute Nacht; arrivederci|auf Wiedersehen; a presto|bis bald; a domani|bis morgen; salve|guten Tag; per favore|bitte; grazie|danke; grazie mille|vielen Dank; prego|bitte schön; scusi|entschuldigen Sie; scusa|entschuldige; mi dispiace|es tut mir leid; permesso|darf ich; piacere|freut mich; mi chiamo|ich heiße; come ti chiami?|wie heißt du?; come si chiama?|wie heißen Sie?; sono|ich bin; questo è|das ist; ti presento|ich stelle dir vor; signore|Herr; signora|Frau; ragazzo|Junge; ragazza|Mädchen; amico|Freund; amica|Freundin; tu|du; Lei|Sie; come stai?|wie geht es dir?; come sta?|wie geht es Ihnen?; bene|gut; molto bene|sehr gut; abbastanza bene|ziemlich gut; così così|so lala; male|schlecht; tutto bene?|alles gut?; sì|ja; no|nein; anche io|ich auch; e tu?|und du?; e Lei?|und Sie?; ci vediamo|wir sehen uns; benvenuto|willkommen; benvenuta|willkommen; felice|glücklich; stanco|müde',
  3: 'il libro|das Buch; la casa|das Haus; l’amico|der Freund; l’amica|die Freundin; i libri|die Bücher; le case|die Häuser; gli amici|die Freunde; un libro|ein Buch; uno studente|ein Student; una studentessa|eine Studentin; un’amica|eine Freundin; il tavolo|der Tisch; la sedia|der Stuhl; il fiore|die Blume; la notte|die Nacht; il nome|der Name; la mano|die Hand; il problema|das Problem; il ristorante|das Restaurant; la stazione|der Bahnhof; lo zaino|der Rucksack; lo studente|der Student; lo specchio|der Spiegel; lo psicologo|der Psychologe; lo gnomo|der Zwerg; gli zaini|die Rucksäcke; gli studenti|die Studenten; gli specchi|die Spiegel; gli psicologi|die Psychologen; bello|schön; bella|schön; belli|schön; belle|schön; nuovo|neu; nuova|neu; grande|groß; grandi|groß; piccolo|klein; piccola|klein; italiano|italienisch; italiana|italienisch; rosso|rot; rossa|rot; interessante|interessant; gentile|freundlich; giovane|jung; vecchio|alt; buono|gut; cattivo|schlecht; alto|groß gewachsen; basso|klein gewachsen; aperto|offen; chiuso|geschlossen; veloce|schnell; lento|langsam',
  4: 'io|ich; tu|du; lui|er; lei|sie; noi|wir; voi|ihr; loro|sie; essere|sein; sono|bin; sei|bist; è|ist; siamo|sind; siete|seid; sono loro|sie sind; di dove sei?|woher kommst du?; sono di|ich bin aus; vengo da|ich komme aus; abito a|ich wohne in; vivere|leben; Italia|Italien; Germania|Deutschland; Austria|Österreich; Svizzera|Schweiz; Francia|Frankreich; Spagna|Spanien; Portogallo|Portugal; Grecia|Griechenland; Polonia|Polen; Romania|Rumänien; Turchia|Türkei; Europa|Europa; Roma|Rom; Milano|Mailand; Napoli|Neapel; Berlino|Berlin; Vienna|Wien; Zurigo|Zürich; italiano|Italiener; italiana|Italienerin; tedesco|Deutscher; tedesca|Deutsche; austriaco|Österreicher; austriaca|Österreicherin; svizzero|Schweizer; svizzera|Schweizerin; francese|Franzose; spagnolo|Spanier; europeo|Europäer; chi?|wer?; come?|wie?; dove?|wo?; cosa?|was?; quale?|welche?; quando?|wann?; perché?|warum?; davvero?|wirklich?; certo|natürlich; forse|vielleicht',
  5: 'l’età|das Alter; quanti anni hai?|wie alt bist du?; ho vent’anni|ich bin zwanzig Jahre alt; avere|haben; ho|ich habe; hai|du hast; ha|er oder sie hat; abbiamo|wir haben; avete|ihr habt; hanno|sie haben; il telefono|das Telefon; il numero|die Nummer; il cellulare|das Handy; chiamare|anrufen; la via|die Straße; il viale|die Allee; la piazza|der Platz; l’indirizzo|die Adresse; il codice postale|die Postleitzahl; la città|die Stadt; il paese|das Land; abitare|wohnen; come si scrive?|wie schreibt man das?; può ripetere?|können Sie wiederholen?; lentamente|langsam; l’e-mail|die E-Mail; la chiocciola|das At-Zeichen; il punto|der Punkt; il trattino|der Bindestrich; il trattino basso|der Unterstrich; la lettera|der Buchstabe; maiuscolo|großgeschrieben; minuscolo|kleingeschrieben; doppia|doppelt; il contatto|der Kontakt; il prefisso|die Vorwahl; più|plus; meno|minus; uguale|gleich; primo|erste; secondo|zweite; terzo|dritte; ultimo|letzte',
  6: 'la famiglia|die Familie; la madre|die Mutter; il padre|der Vater; la mamma|die Mama; il papà|der Papa; i genitori|die Eltern; il figlio|der Sohn; la figlia|die Tochter; i figli|die Kinder; il fratello|der Bruder; la sorella|die Schwester; il marito|der Ehemann; la moglie|die Ehefrau; il compagno|der Partner; la compagna|die Partnerin; il nonno|der Großvater; la nonna|die Großmutter; i nonni|die Großeltern; lo zio|der Onkel; la zia|die Tante; il cugino|der Cousin; la cugina|die Cousine; il nipote|der Enkel oder Neffe; la nipote|die Enkelin oder Nichte; mio|mein; mia|meine; miei|meine; mie|meine; tuo|dein; tua|deine; suo|sein oder ihr; sua|seine oder ihre; nostro|unser; nostra|unsere; vostro|euer; vostra|eure; il loro|ihr; c’è|es gibt; ci sono|es gibt; solo|allein; sposato|verheiratet; sposata|verheiratet; single|ledig; simpatico|sympathisch; simpatica|sympathisch; serio|ernst; allegro|fröhlich; timido|schüchtern; biondo|blond; bruno|dunkelhaarig; i capelli|die Haare; gli occhi|die Augen; il bambino|das Kind; la bambina|das Kind; la foto|das Foto',
  7: 'parlare|sprechen; lavorare|arbeiten; abitare|wohnen; studiare|studieren; ascoltare|zuhören; guardare|anschauen; comprare|kaufen; cercare|suchen; aspettare|warten; preparare|vorbereiten; cucinare|kochen; viaggiare|reisen; prendere|nehmen; leggere|lesen; scrivere|schreiben; vedere|sehen; credere|glauben; vivere|leben; ricevere|erhalten; vendere|verkaufen; chiudere|schließen; perdere|verlieren; dormire|schlafen; partire|abreisen; aprire|öffnen; sentire|hören oder fühlen; offrire|anbieten; scoprire|entdecken; seguire|folgen; servire|brauchen oder dienen; finire|beenden; capisco|ich verstehe; parlo|ich spreche; parli|du sprichst; parla|er oder sie spricht; parliamo|wir sprechen; parlate|ihr sprecht; parlano|sie sprechen; prendo|ich nehme; prendi|du nimmst; prende|er oder sie nimmt; prendiamo|wir nehmen; prendete|ihr nehmt; prendono|sie nehmen; dormo|ich schlafe; dormi|du schläfst; dorme|er oder sie schläft; dormiamo|wir schlafen; dormite|ihr schlaft; dormono|sie schlafen; non|nicht; sempre|immer; spesso|oft; qui|hier; insieme|zusammen',
  8: 'la mattina|der Morgen; il mezzogiorno|der Mittag; il pomeriggio|der Nachmittag; la sera|der Abend; la notte|die Nacht; mezzanotte|Mitternacht; che ore sono?|wie spät ist es?; è l’una|es ist ein Uhr; sono le due|es ist zwei Uhr; in punto|genau; e cinque|fünf nach; e dieci|zehn nach; e un quarto|Viertel nach; e mezza|halb; meno un quarto|Viertel vor; meno dieci|zehn vor; l’ora|die Uhrzeit; il minuto|die Minute; lunedì|Montag; martedì|Dienstag; mercoledì|Mittwoch; giovedì|Donnerstag; venerdì|Freitag; sabato|Samstag; domenica|Sonntag; gennaio|Januar; febbraio|Februar; marzo|März; aprile|April; maggio|Mai; giugno|Juni; luglio|Juli; agosto|August; settembre|September; ottobre|Oktober; novembre|November; dicembre|Dezember; la data|das Datum; l’anno|das Jahr; il primo|der Erste; svegliarsi|aufwachen; alzarsi|aufstehen; fare colazione|frühstücken; andare al lavoro|zur Arbeit gehen; pranzare|zu Mittag essen; tornare|zurückkehren; cenare|zu Abend essen; andare a letto|ins Bett gehen; presto|früh; tardi|spät; sempre|immer; spesso|oft; qualche volta|manchmal; raramente|selten; mai|nie; di solito|gewöhnlich',
  9: 'il pane|das Brot; il panino|das Brötchen; la pasta|die Nudeln; il riso|der Reis; la pizza|die Pizza; la carne|das Fleisch; il pesce|der Fisch; il pollo|das Hähnchen; il formaggio|der Käse; l’uovo|das Ei; le uova|die Eier; la verdura|das Gemüse; la frutta|das Obst; il pomodoro|die Tomate; la patata|die Kartoffel; l’insalata|der Salat; la mela|der Apfel; la banana|die Banane; l’arancia|die Orange; la fragola|die Erdbeere; l’acqua|das Wasser; il caffè|der Kaffee; il tè|der Tee; il latte|die Milch; il succo|der Saft; il vino|der Wein; la birra|das Bier; la colazione|das Frühstück; il pranzo|das Mittagessen; la cena|das Abendessen; il bar|das Café; il ristorante|das Restaurant; il menù|die Speisekarte; il cameriere|der Kellner; la cameriera|die Kellnerin; vorrei|ich hätte gern; per me|für mich; prendo|ich nehme; il conto|die Rechnung; posso avere?|kann ich haben?; mi piace|mir gefällt; mi piacciono|mir gefallen; preferire|bevorzugen; mangiare|essen; bere|trinken; assaggiare|probieren; buono|lecker; dolce|süß; salato|salzig; caldo|warm; freddo|kalt; un chilo di|ein Kilo; mezzo chilo di|ein halbes Kilo; un litro di|ein Liter; una bottiglia di|eine Flasche; un bicchiere di|ein Glas; una tazza di|eine Tasse; un pezzo di|ein Stück; una fetta di|eine Scheibe; un po’ di|ein wenig; senza|ohne; con|mit',
  10: 'la città|die Stadt; il centro|das Zentrum; la strada|die Straße; la piazza|der Platz; la stazione|der Bahnhof; la fermata|die Haltestelle; l’aeroporto|der Flughafen; l’albergo|das Hotel; il museo|das Museum; la chiesa|die Kirche; il supermercato|der Supermarkt; la farmacia|die Apotheke; la banca|die Bank; l’ufficio postale|die Post; l’ospedale|das Krankenhaus; il ristorante|das Restaurant; il bar|das Café; il parco|der Park; il bagno|die Toilette; a|nach oder in; in|in; da|von oder bei; di|von; con|mit; su|auf; per|für oder durch; tra|zwischen; fra|zwischen; dov’è?|wo ist?; vicino|nah; lontano|weit; davanti a|vor; dietro|hinter; accanto a|neben; a destra|rechts; a sinistra|links; dritto|geradeaus; attraversare|überqueren; girare|abbiegen; il semaforo|die Ampel; l’incrocio|die Kreuzung; andare|gehen oder fahren; vado|ich gehe; vai|du gehst; va|er oder sie geht; andiamo|wir gehen; andate|ihr geht; vanno|sie gehen; venire|kommen; vengo|ich komme; vieni|du kommst; viene|er oder sie kommt; veniamo|wir kommen; venite|ihr kommt; vengono|sie kommen; mi sono perso|ich habe mich verirrt; mi sono persa|ich habe mich verirrt; sulla mappa|auf der Karte',
  11: 'il negozio|das Geschäft; il supermercato|der Supermarkt; il mercato|der Markt; la panetteria|die Bäckerei; la macelleria|die Metzgerei; la libreria|die Buchhandlung; il negozio di abbigliamento|das Bekleidungsgeschäft; la scarpa|der Schuh; le scarpe|die Schuhe; la maglietta|das T-Shirt; la camicia|das Hemd; i pantaloni|die Hose; il vestito|das Kleid; la giacca|die Jacke; il cappotto|der Mantel; la borsa|die Tasche; il regalo|das Geschenk; comprare|kaufen; vendere|verkaufen; provare|anprobieren; pagare|bezahlen; costare|kosten; quanto costa?|wie viel kostet es?; quanto costano?|wie viel kosten sie?; l’euro|der Euro; il centesimo|der Cent; caro|teuer; economico|preiswert; lo sconto|der Rabatt; la cassa|die Kasse; il contante|das Bargeld; la carta|die Karte; questo|dieser; questa|diese; questi|diese; queste|diese; rosso|rot; blu|blau; verde|grün; giallo|gelb; nero|schwarz; bianco|weiß; grigio|grau; marrone|braun; rosa|rosa; arancione|orange; viola|violett; chiaro|hell; scuro|dunkel; la taglia|die Größe; piccolo|klein; medio|mittel; grande|groß; stretto|eng; largo|weit; preferisco|ich bevorzuge; voglio|ich will; vorrei|ich hätte gern; mi piace|mir gefällt; va bene|es passt; posso provarlo?|kann ich es anprobieren?; prendo questo|ich nehme dieses',
  12: 'presentarsi|sich vorstellen; descrivere|beschreiben; chiedere|fragen; rispondere|antworten; ordinare|bestellen; orientarsi|sich orientieren; scegliere|auswählen; raccontare|erzählen; il profilo|das Profil; il messaggio|die Nachricht; il cartello|das Schild; l’orario|der Fahrplan; l’annuncio|die Anzeige; l’informazione|die Information; il testo|der Text; la conversazione|das Gespräch; la situazione|die Situation; la soluzione|die Lösung; il progetto|das Projekt; la verifica|die Überprüfung; completo|vollständig; breve|kurz; chiaro|klar; corretto|korrekt; personale|persönlich; quotidiano|alltäglich; prima|zuerst; poi|dann; dopo|danach; infine|schließlich; secondo me|meiner Meinung nach; mi chiamo|ich heiße; vengo da|ich komme aus; abito a|ich wohne in; mi piace|mir gefällt; nel tempo libero|in der Freizeit; vorrei|ich hätte gern; posso?|kann ich?; dov’è?|wo ist?; quanto costa?|wie viel kostet es?; non capisco|ich verstehe nicht; può ripetere?|können Sie wiederholen?; più lentamente|langsamer; ecco|hier ist; perfetto|perfekt; va bene|in Ordnung; fatto|erledigt; il risultato|das Ergebnis; l’obiettivo|das Ziel; continuare|weitermachen',
}

const moduleVocabulary = Object.fromEntries(
  Object.entries(vocabularySources).map(([module, source]) => [
    Number(module),
    parseVocabulary(source),
  ]),
) as Record<number, VocabularyItem[]>
moduleVocabulary[5] = [...numbers, ...moduleVocabulary[5]]

const legacyIds: Record<string, string> = {
  ciao: 'word.it.ciao',
  buongiorno: 'word.it.buongiorno',
  buonasera: 'word.it.buonasera',
  'per favore': 'word.it.per-favore',
  grazie: 'word.it.grazie',
  prego: 'word.it.prego',
  'mi chiamo': 'word.it.mi-chiamo',
  'come ti chiami?': 'word.it.come-ti-chiami',
  piacere: 'word.it.piacere',
}
const hash = (value: string) =>
  Math.abs(
    [...value].reduce(
      (total, character) => (total * 31 + character.charCodeAt(0)) | 0,
      7,
    ),
  ).toString(36)
export const wordId = (italian: string) => {
  const normalized = italian.trim().toLocaleLowerCase('it-IT')
  if (legacyIds[normalized]) return legacyIds[normalized]
  const slug =
    normalized
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'voce'
  return `word.it.a0.${slug}.${hash(normalized)}`
}

export const vocabularyForLesson = (module: number, lessonNumber: number) => {
  if (module === 5) {
    if (lessonNumber === 1) return moduleVocabulary[5].slice(0, 21)
    if (lessonNumber === 2) return moduleVocabulary[5].slice(21, 101)
    const personalDetails = moduleVocabulary[5].slice(101)
    if (lessonNumber === 3) return personalDetails.slice(0, 3)
    if (lessonNumber === 4) return personalDetails.slice(3, 10)
    if (lessonNumber === 5) return personalDetails.slice(10, 31)
    return personalDetails.slice(26)
  }
  if (module === 8) {
    const timeVocabulary = moduleVocabulary[8]
    const ranges: Record<number, [number, number]> = {
      1: [0, 6],
      2: [6, 10],
      3: [10, 18],
      4: [18, 25],
      5: [25, 40],
      6: [40, 50],
      7: [50, timeVocabulary.length],
    }
    const [start, end] = ranges[lessonNumber]
    return timeVocabulary.slice(start, end)
  }
  const lessonsInModule = moduleSpecs.find((item) => item.number === module)!
    .lessons.length
  return (moduleVocabulary[module] ?? []).filter(
    (_, index) => index % lessonsInModule === lessonNumber - 1,
  )
}

export const allVocabulary = Array.from(
  new Map(
    moduleSpecs.flatMap((module) =>
      module.lessons.flatMap((item) =>
        vocabularyForLesson(module.number, item.lesson).map(
          (word) =>
            [
              wordId(word.italian),
              {
                ...word,
                id: wordId(word.italian),
                lessonId: lessonId(module.number, item.lesson),
              },
            ] as const,
        ),
      ),
    ),
  ).values(),
)

export function lessonId(module: number, lessonNumber: number) {
  return `lesson.it.a0.${String(module).padStart(2, '0')}.${String(lessonNumber).padStart(2, '0')}`
}

export const vocabularyIdsForLesson = (module: number, lessonNumber: number) =>
  vocabularyForLesson(module, lessonNumber).map((word) => wordId(word.italian))
