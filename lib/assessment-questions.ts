export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
}

export const assessmentQuestionsEn: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'A colleague delivers an important piece of work ahead of deadline. What is your most natural response?',
    options: [
      'Give them a public shoutout in the team channel or next meeting',
      'Send a direct, personal message to acknowledge it privately',
      'Write a thoughtful note capturing specifically what they did and why it mattered',
      'Suggest a small team celebration or gesture to mark the win',
      'Bring it up in their next development conversation as evidence of their growth',
    ],
  },
  {
    id: 2,
    question: 'How do you typically recognise consistent, day-to-day effort from a colleague?',
    options: [
      'Regular public recognition in standups or team channels',
      'Personal check-ins and private messages when something stands out',
      'Thoughtful written messages that document the specific impact',
      'A small gesture — coffee, lunch, or a team treat',
      'Connecting their effort to future opportunities or their development plan',
    ],
  },
  {
    id: 3,
    question: 'When you think about the appreciation you give, which description fits best?',
    options: [
      'I make it visible — I want peers and leaders to know about good work',
      'I keep it personal — recognition feels more genuine in a 1:1 setting',
      'I put it in writing — I choose my words carefully and want them to last',
      'I back it up with something tangible or experiential',
      'I connect it to growth — praise paired with opportunity means the most',
    ],
  },
  {
    id: 4,
    question: 'How often do you actively show appreciation to colleagues?',
    options: [
      'Very regularly — it comes naturally and I do not need prompting',
      'Weekly, with intention — I try to build it into my rhythm',
      'When there is a clear achievement or contribution worth noting',
      'Less often than I would like — I want to become more consistent',
      'Rarely — I am still building this as a habit',
    ],
  },
  {
    id: 5,
    question: 'What most often holds you back from showing more appreciation?',
    options: [
      'Choosing the right moment and channel',
      'Not being sure how the person prefers to receive it',
      'Not wanting to give generic praise that feels hollow or performative',
      'Finding the time to make it a consistent practice',
      'Nothing significant — I appreciate colleagues regularly and feel confident doing so',
    ],
  },
  {
    id: 6,
    question: 'A colleague has been quietly covering extra work while a teammate is on extended leave. You have not said anything yet. What do you most likely do?',
    options: [
      'Post a shoutout in the team channel to make their effort visible',
      'Drop them a private message to let them know you have noticed',
      'Write a detailed note capturing what you have observed and why it matters',
      'Organise a small team lunch as a group thank-you',
      'Mention their reliability in their next development conversation',
    ],
  },
  {
    id: 7,
    question: 'Your manager asks you to recognise a junior colleague in front of the entire department. You...',
    options: [
      'Do it enthusiastically — public recognition is a gift',
      'Ask them first whether they would be comfortable with it',
      'Suggest pairing it with a short written note to make it last',
      'Propose adding a small team gesture or gift to accompany it',
      'Use the moment to spotlight their growth trajectory and potential',
    ],
  },
  {
    id: 8,
    question: 'After a successful project, how do you typically share credit with your team?',
    options: [
      'Call people out by name in the wider team debrief or all-hands',
      'Send a personal message to each person individually',
      'Write a thoughtful summary naming each contribution and its impact',
      'Suggest a team celebration — lunch, outing, or a shared experience',
      'Highlight how each person grew and what it means for their development',
    ],
  },
  {
    id: 9,
    question: 'A colleague did something worth recognising three weeks ago and you forgot at the time. What do you do now?',
    options: [
      'Bring it up in the next team meeting — better late than never',
      'Send a personal note acknowledging it is overdue but entirely genuine',
      'Write a thoughtful message capturing what they did and why it still matters',
      'Suggest a belated coffee or lunch to catch up and celebrate properly',
      'Reference it in a 1:1 as a clear example of their progress',
    ],
  },
  {
    id: 10,
    question: 'You show appreciation to a colleague and it does not seem to land well. What do you do next?',
    options: [
      'Try again more visibly — perhaps they did not hear it clearly',
      'Ask them privately how they prefer to receive recognition',
      'Write it down instead — sometimes words on a page land differently',
      'Switch to something tangible to make the appreciation feel real',
      'Reframe it as encouragement linked to where they are heading',
    ],
  },
];

export const assessmentQuestionsDe: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'Ein Kollege liefert eine wichtige Arbeit vor dem Termin ab. Was ist deine natürlichste Reaktion?',
    options: [
      'Öffentlicher Shoutout im Team-Kanal oder in der nächsten Besprechung',
      'Eine direkte, persönliche Nachricht zur privaten Anerkennung',
      'Eine durchdachte Notiz, die genau festhält, was er getan hat und warum es wichtig war',
      'Eine kleine Teamfeier oder Geste vorschlagen, um den Erfolg zu markieren',
      'Es beim nächsten Entwicklungsgespräch als Beleg für seine Entwicklung ansprechen',
    ],
  },
  {
    id: 2,
    question: 'Wie erkennst du typischerweise den kontinuierlichen, alltäglichen Einsatz eines Kollegen an?',
    options: [
      'Regelmäßige öffentliche Anerkennung in Standups oder Team-Kanälen',
      'Persönliche Check-ins und private Nachrichten, wenn etwas auffällt',
      'Durchdachte schriftliche Nachrichten, die die spezifische Wirkung festhalten',
      'Eine kleine Geste — Kaffee, Mittagessen oder ein Teamtreat',
      'Ihren Einsatz mit zukünftigen Möglichkeiten oder ihrem Entwicklungsplan verknüpfen',
    ],
  },
  {
    id: 3,
    question: 'Wenn du an die Wertschätzung denkst, die du gibst, welche Beschreibung passt am besten?',
    options: [
      'Ich mache es sichtbar — ich möchte, dass Kollegen und Führungskräfte von guter Arbeit wissen',
      'Ich halte es persönlich — Anerkennung fühlt sich im 1:1-Rahmen echter an',
      'Ich schreibe es auf — ich wähle meine Worte sorgfältig und möchte, dass sie bleiben',
      'Ich untermauere es mit etwas Greifbarem oder einer gemeinsamen Erfahrung',
      'Ich verknüpfe es mit Wachstum — Lob zusammen mit einer Möglichkeit bedeutet am meisten',
    ],
  },
  {
    id: 4,
    question: 'Wie oft zeigst du Kollegen aktiv Wertschätzung?',
    options: [
      'Sehr regelmäßig — es kommt mir natürlich und ich brauche keine Erinnerung',
      'Wöchentlich, mit Absicht — ich versuche, es in meinen Rhythmus zu integrieren',
      'Wenn es eine klare Leistung oder einen Beitrag gibt, der es wert ist anzuerkennen',
      'Seltener als ich möchte — ich möchte konsequenter werden',
      'Selten — ich baue diese Gewohnheit noch auf',
    ],
  },
  {
    id: 5,
    question: 'Was hält dich am häufigsten davon ab, mehr Wertschätzung zu zeigen?',
    options: [
      'Den richtigen Moment und Kanal zu wählen',
      'Nicht sicher zu sein, wie die Person es am liebsten erhält',
      'Keine generische Wertschätzung geben zu wollen, die hohl oder performativ wirkt',
      'Die Zeit zu finden, um es zu einer konsistenten Praxis zu machen',
      'Nichts Wesentliches — ich schätze Kollegen regelmäßig wert und fühle mich dabei sicher',
    ],
  },
  {
    id: 6,
    question: 'Ein Kollege übernimmt still und leise Zusatzaufgaben, während ein Teammitglied im Langzeiturlaub ist. Du hast noch nichts gesagt. Was tust du am ehesten?',
    options: [
      'Einen Shoutout im Team-Kanal posten, um den Einsatz sichtbar zu machen',
      'Ihm eine private Nachricht schicken und zeigen, dass du es bemerkt hast',
      'Eine ausführliche Notiz schreiben, die festhält, was du gesehen hast und warum es wichtig ist',
      'Ein kleines Team-Mittagessen organisieren als gemeinsames Dankeschön',
      'Die Zuverlässigkeit beim nächsten Entwicklungsgespräch ansprechen',
    ],
  },
  {
    id: 7,
    question: 'Dein Vorgesetzter bittet dich, einen jüngeren Kollegen vor der gesamten Abteilung anzuerkennen. Du...',
    options: [
      'Tust es enthusiastisch — öffentliche Anerkennung ist ein Geschenk',
      'Fragst ihn zuerst, ob er sich damit wohlfühlt',
      'Schlägst vor, es mit einem kurzen schriftlichen Beitrag zu verbinden',
      'Empfiehlst, eine kleine Teamgeste oder ein Geschenk dazuzugeben',
      'Nutzt den Moment, um die Entwicklung und das Potenzial der Person hervorzuheben',
    ],
  },
  {
    id: 8,
    question: 'Nach einem erfolgreichen Projekt — wie teilst du die Anerkennung typischerweise mit deinem Team?',
    options: [
      'Nennst Personen namentlich im Team-Debrief oder All-Hands',
      'Schickst jedem Teammitglied eine persönliche Nachricht',
      'Schreibst eine durchdachte Zusammenfassung mit den jeweiligen Beiträgen und ihrer Wirkung',
      'Schlägst eine Teamfeier vor — Mittagessen, Ausflug oder gemeinsames Erlebnis',
      'Hebst hervor, wie jede Person gewachsen ist und was das für ihre Entwicklung bedeutet',
    ],
  },
  {
    id: 9,
    question: 'Ein Kollege hat vor drei Wochen etwas geleistet, das Anerkennung verdient hätte, und damals hast du es vergessen. Was tust du jetzt?',
    options: [
      'Es beim nächsten Team-Meeting ansprechen — besser spät als nie',
      'Eine persönliche Nachricht schicken, die offen zugibt, dass es überfällig ist, aber ehrlich gemeint',
      'Eine durchdachte Nachricht schreiben, die festhält, was getan wurde und warum es immer noch zählt',
      'Ein nachträgliches Kaffee- oder Mittagessen vorschlagen, um es in Ruhe nachzuholen',
      'Es in einem 1:1 als klares Beispiel für seinen Fortschritt aufgreifen',
    ],
  },
  {
    id: 10,
    question: 'Du zeigst einem Kollegen Wertschätzung und sie scheint nicht anzukommen. Was tust du als Nächstes?',
    options: [
      'Es sichtbarer versuchen — vielleicht wurde es nicht klar wahrgenommen',
      'Privat fragen, wie er Anerkennung am liebsten erhält',
      'Es stattdessen aufschreiben — manchmal landen Worte auf Papier anders',
      'Zu etwas Greifbarem wechseln, um die Wertschätzung spürbar zu machen',
      'Es als Ermutigung mit Blick auf die Zukunft der Person neu formulieren',
    ],
  },
];