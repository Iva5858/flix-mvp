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
];