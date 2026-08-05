import type { GrammarRule } from '../../types/reference'
import { projectSource } from '../reference/source'
import { lessonId, lessonSpecs } from './curriculum'

type RuleSpec = {
  id: string
  title: string
  category: string
  explanation: string
  formation: string
  italian: string
  german: string
  error: string
  correction: string
}

const specs: RuleSpec[] = [
  {
    id: 'grammar.it.pronunciation.alphabet.001',
    title: 'Das italienische Alphabet',
    category: 'Aussprache',
    explanation:
      'Das italienische Grundalphabet hat 21 Buchstaben. j, k, w, x und y kommen vor allem in Fremdwörtern vor.',
    formation:
      'a, bi, ci, di, e, effe, gi, acca, i, elle, emme, enne, o, pi, qu, erre, esse, ti, u, vi, zeta',
    italian: 'Roma: erre – o – emme – a.',
    german: 'Rom wird Buchstabe für Buchstabe genannt.',
    error: 'Buchstabennamen wie im Deutschen aussprechen.',
    correction: 'Die italienischen Buchstabennamen verwenden.',
  },
  {
    id: 'grammar.it.pronunciation.vowels.001',
    title: 'Die fünf Vokale',
    category: 'Aussprache',
    explanation:
      'a, e, i, o und u bleiben auch in unbetonten Silben klar. Sie werden nicht zu einem undeutlichen Murmellaut.',
    formation: 'a · e · i · o · u',
    italian: 'amico, telefono, musica',
    german: 'Freund, Telefon, Musik',
    error: 'Endvokale verschlucken.',
    correction: 'Jeden Endvokal hörbar sprechen.',
  },
  {
    id: 'grammar.it.pronunciation.cg.001',
    title: 'Harte und weiche C-/G-Laute',
    category: 'Aussprache',
    explanation:
      'c und g klingen vor e/i weich, sonst hart. Ein h hält den Laut vor e/i hart; i macht ihn vor a/o/u weich.',
    formation: 'ce/ci · che/chi · ge/gi · ghe/ghi · cia/gia',
    italian: 'cena, chi, gelato, spaghetti',
    german: 'Abendessen, wer, Eis, Spaghetti',
    error: 'chi wie „tschi“ sprechen.',
    correction: 'chi mit hartem k sprechen.',
  },
  {
    id: 'grammar.it.pronunciation.combinations.001',
    title: 'Besondere Lautfolgen',
    category: 'Aussprache',
    explanation:
      'sc vor e/i klingt wie sch, sch vor e/i wie sk. gn, gli und qu bilden feste Lautverbindungen.',
    formation: 'sce/sci · sche/schi · gn · gli · qu',
    italian: 'scena, schiena, gnocchi, famiglia, quattro',
    german: 'Szene, Rücken, Gnocchi, Familie, vier',
    error: 'gn in gnocchi getrennt sprechen.',
    correction: 'gn als zusammengehörigen Laut sprechen.',
  },
  {
    id: 'grammar.it.pronunciation.doubles.001',
    title: 'Doppelkonsonanten',
    category: 'Aussprache',
    explanation:
      'Doppelte Konsonanten werden länger gehalten. Der Unterschied kann die Bedeutung verändern.',
    formation: 'Konsonant kurz: pala · Konsonant lang: palla',
    italian: 'pala – palla',
    german: 'Schaufel – Ball',
    error: 'pala und palla gleich aussprechen.',
    correction: 'Bei palla das l deutlich länger halten.',
  },
  {
    id: 'grammar.it.pronunciation.stress.001',
    title: 'Betonung und Akzent',
    category: 'Aussprache',
    explanation:
      'Viele Wörter werden auf der vorletzten Silbe betont. Ein geschriebener Endakzent zeigt eine abweichende Betonung und gehört zum Wort.',
    formation: 'città · caffè · perché',
    italian: 'Il caffè è qui.',
    german: 'Der Kaffee ist hier.',
    error: 'caffe ohne Endbetonung sprechen oder schreiben.',
    correction: 'caffè mit Akzent und Endbetonung.',
  },
  {
    id: 'grammar.it.register.tu-lei.001',
    title: 'Tu und höfliches Lei',
    category: 'Register',
    explanation:
      'tu wird vertraut verwendet. Das höfliche Lei steht mit der Verbform der dritten Person Singular.',
    formation: 'tu + 2. Person · Lei + 3. Person',
    italian: 'Come stai? – Come sta?',
    german: 'Wie geht es dir? – Wie geht es Ihnen?',
    error: 'Lei mit der tu-Form verbinden.',
    correction: 'Lei mit der Form der dritten Person verwenden.',
  },
  {
    id: 'grammar.it.communication.wellbeing.001',
    title: 'Nach dem Befinden fragen',
    category: 'Kommunikation',
    explanation:
      'Auf come stai? oder come sta? reichen auf A0 kurze Antworten wie bene, così così oder male.',
    formation: 'Come stai/sta? – (Molto) bene, grazie.',
    italian: 'Bene, grazie. E tu?',
    german: 'Gut, danke. Und du?',
    error: 'Nach der Antwort keine Rückfrage ermöglichen.',
    correction: 'Mit e tu? oder e Lei? zurückfragen.',
  },
  {
    id: 'grammar.it.noun.basics.001',
    title: 'Nomen',
    category: 'Nomen',
    explanation:
      'Nomen bezeichnen Personen, Orte, Dinge oder Begriffe. Im Italienischen werden sie kleingeschrieben, wenn sie keinen Eigennamen bilden.',
    formation: 'Artikel + Nomen: il libro, la casa',
    italian: 'La casa è grande.',
    german: 'Das Haus ist groß.',
    error: 'Alle Nomen wie im Deutschen großschreiben.',
    correction: 'Italienische Gattungsnamen kleinschreiben.',
  },
  {
    id: 'grammar.it.noun.gender.001',
    title: 'Genus der Nomen',
    category: 'Nomen',
    explanation:
      'Viele Nomen auf -o sind männlich und viele auf -a weiblich. Das ist eine hilfreiche Tendenz, aber keine ausnahmslose Regel.',
    formation: '-o oft maskulin · -a oft feminin',
    italian: 'il libro – la casa',
    german: 'das Buch – das Haus',
    error: 'Das Genus aus dem Deutschen übernehmen.',
    correction: 'Italienisches Nomen zusammen mit seinem Artikel lernen.',
  },
  {
    id: 'grammar.it.noun.plural.001',
    title: 'Regelmäßiger Plural',
    category: 'Nomen',
    explanation:
      'Typisch wird -o zu -i, -a zu -e und -e zu -i. Artikel und Adjektive ändern sich mit.',
    formation: '-o → -i · -a → -e · -e → -i',
    italian: 'il libro – i libri; la casa – le case',
    german: 'das Buch – die Bücher; das Haus – die Häuser',
    error: 'Den Plural mit einem angehängten s bilden.',
    correction: 'Die italienische Endung verändern.',
  },
  {
    id: 'grammar.it.article.definite.001',
    title: 'Bestimmte Artikel',
    category: 'Artikel',
    explanation:
      'il/i stehen meist bei männlichen Nomen, la/le bei weiblichen. Vor Vokal wird im Singular häufig l’ verwendet.',
    formation: 'il → i · la → le · l’ → gli/le',
    italian: 'il libro, la casa, l’amico, l’amica',
    german: 'das Buch, das Haus, der Freund, die Freundin',
    error: 'Vor jedem Vokal il oder la unverändert lassen.',
    correction: 'Im Singular vor Vokal l’ verwenden.',
  },
  {
    id: 'grammar.it.article.lo-gli.001',
    title: 'Lo und gli',
    category: 'Artikel',
    explanation:
      'Vor s + Konsonant, z, gn, ps, x und ähnlichen Anfangsgruppen stehen im Maskulinum lo und gli.',
    formation: 'lo studente → gli studenti',
    italian: 'lo zaino – gli zaini',
    german: 'der Rucksack – die Rucksäcke',
    error: 'il studente sagen.',
    correction: 'lo studente sagen.',
  },
  {
    id: 'grammar.it.article.indefinite.001',
    title: 'Unbestimmte Artikel',
    category: 'Artikel',
    explanation:
      'un steht meist bei männlichen Nomen, uno vor den lo-Anfängen, una bei weiblichen Nomen und un’ vor weiblichem Vokal.',
    formation: 'un · uno · una · un’',
    italian: 'un libro, uno studente, una casa, un’amica',
    german: 'ein Buch, ein Student, ein Haus, eine Freundin',
    error: 'un’amico mit Apostroph schreiben.',
    correction: 'un amico ohne Apostroph; un’ ist feminin.',
  },
  {
    id: 'grammar.it.adjective.basics.001',
    title: 'Adjektive',
    category: 'Adjektive',
    explanation:
      'Adjektive beschreiben Eigenschaften und stehen häufig nach dem Nomen. Viele Formen enden auf -o/-a oder auf -e.',
    formation: 'Nomen + Adjektiv: una casa grande',
    italian: 'un libro interessante',
    german: 'ein interessantes Buch',
    error: 'Die deutsche Wortstellung immer übertragen.',
    correction: 'Das beschreibende Adjektiv zunächst nachstellen.',
  },
  {
    id: 'grammar.it.adjective.agreement.001',
    title: 'Adjektivangleichung',
    category: 'Adjektive',
    explanation:
      'Veränderliche Adjektive stimmen mit dem Nomen in Genus und Numerus überein.',
    formation: '-o/-a/-i/-e oder -e/-i',
    italian: 'ragazzo italiano – ragazze italiane',
    german: 'italienischer Junge – italienische Mädchen',
    error: 'Die männliche Singularform überall verwenden.',
    correction: 'Die Endung an das Nomen angleichen.',
  },
  {
    id: 'grammar.it.pronoun.subject.001',
    title: 'Subjektpronomen',
    category: 'Pronomen',
    explanation:
      'io, tu, lui/lei, noi, voi und loro bezeichnen die handelnden Personen. Lei mit großem L kann die höfliche Anrede markieren.',
    formation: 'io · tu · lui/lei/Lei · noi · voi · loro',
    italian: 'Noi siamo di Berlino.',
    german: 'Wir sind aus Berlin.',
    error: 'lei und Lei ohne Kontext verwechseln.',
    correction: 'Auf Verbform und Gesprächssituation achten.',
  },
  {
    id: 'grammar.it.verb.essere.001',
    title: 'Essere im Präsens',
    category: 'Verben',
    explanation:
      'Essere bedeutet sein und ist unregelmäßig. Es verbindet Personen mit Identität, Herkunft oder Eigenschaften.',
    formation: 'sono · sei · è · siamo · siete · sono',
    italian: 'Sono tedesca. Siamo a Roma.',
    german: 'Ich bin Deutsche. Wir sind in Rom.',
    error: 'io essere sagen.',
    correction: 'io sono sagen.',
  },
  {
    id: 'grammar.it.preposition.origin.001',
    title: 'Herkunft mit di und da',
    category: 'Präpositionen',
    explanation:
      'essere di nennt Zugehörigkeit oder Herkunft. venire da betont das Kommen aus einem Ort.',
    formation: 'essere di + Ort · venire da + Ort',
    italian: 'Sono di Vienna. Vengo da Vienna.',
    german: 'Ich bin aus Wien. Ich komme aus Wien.',
    error: 'sono da Vienna für Herkunft sagen.',
    correction: 'sono di Vienna oder vengo da Vienna.',
  },
  {
    id: 'grammar.it.adjective.nationality.001',
    title: 'Nationalitäten',
    category: 'Adjektive',
    explanation:
      'Nationalitätswörter werden kleingeschrieben und als Adjektive an die Person angeglichen.',
    formation: 'italiano/italiana · tedeschi/tedesche',
    italian: 'Lei è italiana.',
    german: 'Sie ist Italienerin.',
    error: 'Nationalitäten großschreiben.',
    correction: 'italiano und tedesco kleinschreiben.',
  },
  {
    id: 'grammar.it.question.yes-no.001',
    title: 'Ja-/Nein-Fragen',
    category: 'Fragen',
    explanation:
      'Die Wortstellung kann wie in der Aussage bleiben. Die steigende Frageintonation und das Fragezeichen zeigen die Frage.',
    formation: 'Sei di Roma? – Sì/No.',
    italian: 'Abiti a Berlino?',
    german: 'Wohnst du in Berlin?',
    error: 'Zwingend eine deutsche Verb-Erst-Stellung nachbauen.',
    correction: 'Die Aussageform mit Frageintonation verwenden.',
  },
  {
    id: 'grammar.it.question.words.001',
    title: 'W-Fragewörter',
    category: 'Fragen',
    explanation:
      'chi fragt nach Personen, dove nach Orten, come nach Art oder Namen und cosa nach Dingen.',
    formation: 'Fragewort + Verb + Ergänzung?',
    italian: 'Dove abiti? Come ti chiami?',
    german: 'Wo wohnst du? Wie heißt du?',
    error: 'Fragewort und passende Bedeutung vertauschen.',
    correction: 'chi = wer, dove = wo, come = wie, cosa = was.',
  },
  {
    id: 'grammar.it.expression.age.001',
    title: 'Das Alter mit avere',
    category: 'Feste Wendungen',
    explanation:
      'Italienisch hat Jahre: Man verwendet avere + Zahl + anni, nicht essere.',
    formation: 'avere + Zahl + anni',
    italian: 'Ho vent’anni.',
    german: 'Ich bin zwanzig Jahre alt.',
    error: 'Sono venti anni.',
    correction: 'Ho vent’anni.',
  },
  {
    id: 'grammar.it.verb.avere.001',
    title: 'Avere im Präsens',
    category: 'Verben',
    explanation:
      'Avere bedeutet haben und ist unregelmäßig. Das h wird geschrieben, aber nicht gesprochen.',
    formation: 'ho · hai · ha · abbiamo · avete · hanno',
    italian: 'Abbiamo una domanda.',
    german: 'Wir haben eine Frage.',
    error: 'o statt ho schreiben.',
    correction: 'Die Verbform ho mit stummem h schreiben.',
  },
  {
    id: 'grammar.it.possessive.basics.001',
    title: 'Possessivbegleiter',
    category: 'Begleiter',
    explanation:
      'mio, tuo, suo, nostro, vostro und loro richten sich nach dem besessenen Nomen, nicht nach der besitzenden Person.',
    formation: 'il mio libro · la mia casa · i miei libri · le mie case',
    italian: 'Questa è la mia casa.',
    german: 'Das ist mein Haus.',
    error: 'mia nach einer weiblichen Besitzerin wählen.',
    correction: 'Die Form nach casa wählen: la mia casa.',
  },
  {
    id: 'grammar.it.possessive.family.001',
    title: 'Possessivbegleiter bei Familie',
    category: 'Begleiter',
    explanation:
      'Bei einem einzelnen, unveränderten nahen Familienmitglied entfällt der bestimmte Artikel meist.',
    formation: 'mia madre · mio fratello; aber i miei fratelli',
    italian: 'Mio padre è simpatico.',
    german: 'Mein Vater ist sympathisch.',
    error: 'la mia madre sagen.',
    correction: 'In der Grundregel mia madre ohne Artikel.',
  },
  {
    id: 'grammar.it.expression.ce-ci-sono.001',
    title: 'C’è und ci sono',
    category: 'Feste Wendungen',
    explanation: 'c’è steht vor einer Sache oder Person, ci sono vor mehreren.',
    formation: 'c’è + Singular · ci sono + Plural',
    italian: 'C’è un bar. Ci sono due negozi.',
    german: 'Es gibt ein Café. Es gibt zwei Geschäfte.',
    error: 'ci sono un bar.',
    correction: 'c’è un bar.',
  },
  {
    id: 'grammar.it.verb.conjugation.001',
    title: 'Stamm und Verbendung',
    category: 'Verben',
    explanation:
      'Bei regelmäßigen Verben wird die Infinitivendung entfernt und eine Personenendung an den Stamm gesetzt.',
    formation: 'parl-are → parl-o',
    italian: 'parlare → parlo',
    german: 'sprechen → ich spreche',
    error: 'io parlare unverändert lassen.',
    correction: 'io parlo konjugieren.',
  },
  {
    id: 'grammar.it.verb.are.001',
    title: 'Regelmäßige -are-Verben',
    category: 'Verben',
    explanation:
      'Regelmäßige -are-Verben verwenden im Präsens die Endungen -o, -i, -a, -iamo, -ate, -ano.',
    formation: '-o · -i · -a · -iamo · -ate · -ano',
    italian: 'parlo, parli, parla, parliamo, parlate, parlano',
    german: 'ich spreche bis sie sprechen',
    error: 'noi parlano.',
    correction: 'noi parliamo.',
  },
  {
    id: 'grammar.it.verb.ere.001',
    title: 'Regelmäßige -ere-Verben',
    category: 'Verben',
    explanation:
      'Regelmäßige -ere-Verben verwenden -o, -i, -e, -iamo, -ete, -ono.',
    formation: '-o · -i · -e · -iamo · -ete · -ono',
    italian: 'prendo, prendi, prende, prendiamo, prendete, prendono',
    german: 'ich nehme bis sie nehmen',
    error: 'voi prendate.',
    correction: 'voi prendete.',
  },
  {
    id: 'grammar.it.verb.ire.001',
    title: 'Regelmäßige -ire-Verben',
    category: 'Verben',
    explanation:
      'Viele regelmäßige -ire-Verben verwenden -o, -i, -e, -iamo, -ite, -ono. Verben mit -isc- werden später vertieft.',
    formation: '-o · -i · -e · -iamo · -ite · -ono',
    italian: 'dormo, dormi, dorme, dormiamo, dormite, dormono',
    german: 'ich schlafe bis sie schlafen',
    error: 'voi dormete.',
    correction: 'voi dormite.',
  },
  {
    id: 'grammar.it.pronoun.omission.001',
    title: 'Subjektpronomen weglassen',
    category: 'Pronomen',
    explanation:
      'Die Verbendung zeigt meist eindeutig die Person. Deshalb kann das Subjektpronomen entfallen, wenn kein Kontrast nötig ist.',
    formation: '(Io) parlo italiano.',
    italian: 'Abitiamo a Vienna.',
    german: 'Wir wohnen in Wien.',
    error: 'Jeden Satz zwingend mit io oder noi beginnen.',
    correction: 'Das Pronomen weglassen, wenn die Verbform klar ist.',
  },
  {
    id: 'grammar.it.negation.non.001',
    title: 'Verneinung mit non',
    category: 'Satzbau',
    explanation: 'non steht direkt vor dem konjugierten Verb.',
    formation: 'Subjekt + non + Verb + Ergänzung',
    italian: 'Non parlo inglese.',
    german: 'Ich spreche nicht Englisch.',
    error: 'parlo non italiano.',
    correction: 'non parlo italiano.',
  },
  {
    id: 'grammar.it.sentence.order.001',
    title: 'Einfacher Satzbau',
    category: 'Satzbau',
    explanation:
      'Die neutrale Grundfolge lautet Subjekt–Verb–Ergänzung. Das Subjekt kann oft fehlen; Zeitangaben sind beweglich.',
    formation: '(Subjekt) + Verb + Ergänzung + Zeit',
    italian: 'Studio italiano ogni giorno.',
    german: 'Ich lerne jeden Tag Italienisch.',
    error: 'Die Verbform ans Satzende setzen.',
    correction: 'Das konjugierte Verb früh im Satz platzieren.',
  },
  {
    id: 'grammar.it.time.clock.001',
    title: 'Volle Uhrzeiten',
    category: 'Zeit',
    explanation:
      'Für ein Uhr verwendet man è l’una, für alle anderen Stunden sono le. Mit a wird die Uhrzeit zum Zeitpunkt.',
    formation: 'È l’una. · Sono le due. · alle due',
    italian: 'Sono le otto. Il corso è alle nove.',
    german: 'Es ist acht Uhr. Der Kurs ist um neun.',
    error: 'sono l’una.',
    correction: 'è l’una.',
  },
  {
    id: 'grammar.it.time.minutes.001',
    title: 'Minuten, Viertel und halb',
    category: 'Zeit',
    explanation:
      'Minuten nach der Stunde stehen mit e, Minuten vor der nächsten Stunde mit meno. mezza bedeutet halb.',
    formation: 'e un quarto · e mezza · meno dieci',
    italian: 'Sono le tre e mezza.',
    german: 'Es ist halb vier.',
    error: 'Die deutsche Zählweise „halb drei“ wörtlich übertragen.',
    correction: 'Die laufende Stunde + e mezza nennen.',
  },
  {
    id: 'grammar.it.date.basics.001',
    title: 'Das Datum',
    category: 'Zeit',
    explanation:
      'Das Datum steht mit dem bestimmten Artikel. Nur der erste Tag des Monats heißt il primo; danach verwendet man Grundzahlen.',
    formation: 'il primo maggio · il due maggio',
    italian: 'Oggi è il tre agosto.',
    german: 'Heute ist der dritte August.',
    error: 'il uno maggio.',
    correction: 'il primo maggio.',
  },
  {
    id: 'grammar.it.adverb.frequency.001',
    title: 'Frequenzadverbien',
    category: 'Adverbien',
    explanation:
      'sempre, spesso, qualche volta, raramente und mai geben Häufigkeit an. mai steht in verneinten Sätzen meist mit non.',
    formation: 'Verb + spesso/sempre · non + Verb + mai',
    italian: 'Studio spesso. Non bevo mai caffè.',
    german: 'Ich lerne oft. Ich trinke nie Kaffee.',
    error: 'bevo mai ohne non.',
    correction: 'non bevo mai.',
  },
  {
    id: 'grammar.it.politeness.vorrei.001',
    title: 'Höflich bestellen mit vorrei',
    category: 'Kommunikation',
    explanation:
      'vorrei bedeutet „ich hätte gern“ und klingt in Bestellungen höflicher als voglio.',
    formation: 'Vorrei + Sache, per favore.',
    italian: 'Vorrei un caffè, per favore.',
    german: 'Ich hätte gern einen Kaffee, bitte.',
    error: 'voglio in jeder Bestellung verwenden.',
    correction: 'Für eine höfliche Bestellung vorrei verwenden.',
  },
  {
    id: 'grammar.it.verb.piacere.001',
    title: 'Mi piace und mi piacciono',
    category: 'Verben',
    explanation:
      'mi piace steht vor einem einzelnen Ding oder einem Verb, mi piacciono vor mehreren Dingen.',
    formation: 'mi piace + Singular/Infinitiv · mi piacciono + Plural',
    italian: 'Mi piace la pizza. Mi piacciono le mele.',
    german: 'Ich mag Pizza. Ich mag Äpfel.',
    error: 'mi piace le mele.',
    correction: 'mi piacciono le mele.',
  },
  {
    id: 'grammar.it.quantity.di.001',
    title: 'Mengenangaben mit di',
    category: 'Mengen',
    explanation:
      'Nach Behältern und Mengen steht di vor dem Lebensmittel; ein zusätzlicher Artikel entfällt in der Grundform.',
    formation: 'Menge/Behälter + di + Lebensmittel',
    italian: 'una bottiglia di acqua',
    german: 'eine Flasche Wasser',
    error: 'una bottiglia della acqua.',
    correction: 'una bottiglia d’acqua.',
  },
  {
    id: 'grammar.it.preposition.simple.001',
    title: 'Einfache Präpositionen',
    category: 'Präpositionen',
    explanation:
      'a, in, da, di, con, su, per und tra/fra drücken Ort, Richtung, Herkunft, Begleitung und weitere Beziehungen aus.',
    formation: 'a Roma · in Italia · da Luca · con Anna',
    italian: 'Vado a Roma con Anna.',
    german: 'Ich fahre mit Anna nach Rom.',
    error: 'in Roma sagen.',
    correction: 'Bei Städten meist a Roma.',
  },
  {
    id: 'grammar.it.location.basics.001',
    title: 'Lage und Orientierung',
    category: 'Ort',
    explanation:
      'Lagewörter stehen oft mit a: davanti a, accanto a. vicino und lontano werden häufig mit da verbunden.',
    formation: 'davanti a · dietro · accanto a · vicino a/da',
    italian: 'La banca è accanto al bar.',
    german: 'Die Bank ist neben dem Café.',
    error: 'Rechts und links vertauschen.',
    correction: 'a destra = rechts, a sinistra = links.',
  },
  {
    id: 'grammar.it.verb.andare.001',
    title: 'Andare im Präsens',
    category: 'Verben',
    explanation: 'Andare bedeutet gehen oder fahren und ist unregelmäßig.',
    formation: 'vado · vai · va · andiamo · andate · vanno',
    italian: 'Andiamo al museo.',
    german: 'Wir gehen ins Museum.',
    error: 'io ando.',
    correction: 'io vado.',
  },
  {
    id: 'grammar.it.verb.venire.001',
    title: 'Venire im Präsens',
    category: 'Verben',
    explanation:
      'Venire bedeutet kommen und verändert den Stamm in mehreren Personen.',
    formation: 'vengo · vieni · viene · veniamo · venite · vengono',
    italian: 'Vieni da Roma?',
    german: 'Kommst du aus Rom?',
    error: 'loro venono.',
    correction: 'loro vengono.',
  },
  {
    id: 'grammar.it.question.price.001',
    title: 'Nach dem Preis fragen',
    category: 'Fragen',
    explanation:
      'quanto costa? steht bei einer Sache, quanto costano? bei mehreren.',
    formation: 'Quanto costa + Singular? · Quanto costano + Plural?',
    italian: 'Quanto costano le scarpe?',
    german: 'Wie viel kosten die Schuhe?',
    error: 'quanto costa le scarpe?',
    correction: 'quanto costano le scarpe?',
  },
  {
    id: 'grammar.it.demonstrative.questo.001',
    title: 'Questo und questa',
    category: 'Begleiter',
    explanation:
      'questo richtet sich wie ein Adjektiv nach Genus und Numerus des gezeigten Nomens.',
    formation: 'questo/questa · questi/queste',
    italian: 'Vorrei questa maglietta.',
    german: 'Ich hätte gern dieses T-Shirt.',
    error: 'questo borsa.',
    correction: 'questa borsa.',
  },
  {
    id: 'grammar.it.politeness.wants.001',
    title: 'Preferisco, voglio und vorrei',
    category: 'Kommunikation',
    explanation:
      'preferisco nennt eine Vorliebe, voglio einen direkten Willen und vorrei einen höflichen Wunsch.',
    formation: 'preferisco + Nomen · voglio + Nomen/Verb · vorrei + Nomen/Verb',
    italian: 'Preferisco il blu. Vorrei questa giacca.',
    german: 'Ich bevorzuge Blau. Ich hätte gern diese Jacke.',
    error: 'voglio zum Personal in jeder Situation sagen.',
    correction: 'Bei höflichen Wünschen vorrei wählen.',
  },
]

const linkedLessons = (grammarId: string) =>
  lessonSpecs.filter((item) => item.grammarIds.includes(grammarId))

export const generatedGrammarRules: GrammarRule[] = specs.map((spec) => {
  const lessons = linkedLessons(spec.id)
  return {
    id: spec.id,
    title: spec.title,
    category: spec.category,
    simpleExplanation: spec.explanation,
    detailedExplanation: `${spec.explanation} Für A0 wird diese Regel in kurzen, kontrollierten Beispielen verwendet; weiterführende Sonderfälle folgen erst nach dem A0-Kurs.`,
    formation: spec.formation,
    usage: [
      'Die Form in den verknüpften A0-Lektionen erkennen.',
      'Die Form in einer kurzen eigenen Aussage anwenden.',
    ],
    examples: [{ italian: spec.italian, german: spec.german }],
    counterExamples: [
      { text: spec.error, explanation: `Besser: ${spec.correction}` },
    ],
    exceptions: [
      'Die Regel beschreibt den für A0 benötigten Kern; lexikalische und regionale Sonderfälle sind nicht vollständig erfasst.',
    ],
    commonErrors: [
      {
        error: spec.error,
        correction: spec.correction,
        explanation: spec.explanation,
      },
    ],
    germanComparison:
      'Die italienische Form sollte als eigenes Muster gelernt und nicht Wort für Wort aus dem Deutschen übertragen werden.',
    relatedRuleIds: [],
    lessonIds: lessons.map((item) => lessonId(item.module, item.lesson)),
    exerciseIds: lessons.map(
      (item) =>
        `exercise.it.a0.${String(item.module).padStart(2, '0')}.${String(item.lesson).padStart(2, '0')}.001`,
    ),
    vocabularyIds: [],
    sources: [projectSource],
  }
})
