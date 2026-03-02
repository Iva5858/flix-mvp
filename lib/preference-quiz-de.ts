import type { ArchetypeId } from './archetypes';

export interface QuizQuestion {
  id: number;
  question: string;
  options: { archetype: ArchetypeId; text: string }[];
}

export const quizQuestionsDe: QuizQuestion[] = [
  {
    id: 1,
    question: 'Nach Abschluss eines größeren Projekts – welche Nachbereitung wäre für dich am bedeutungsvollsten?',
    options: [
      { archetype: 'word-collector', text: 'Eine detaillierte schriftliche Nachricht, die beschreibt, was ich getan habe und warum es wichtig war.' },
      { archetype: 'spotlight-seeker', text: 'Anerkennung in einer Teambesprechung oder unternehmensweitem Forum.' },
      { archetype: 'quiet-achiever', text: 'Ein privates 1:1-Gespräch, das meinen Beitrag würdigt.' },
      { archetype: 'growth-chaser', text: 'Ein Gespräch darüber, wie mich dies für größere Möglichkeiten positioniert.' },
      { archetype: 'reward-enthusiast', text: 'Ein kleines feierliches Erlebnis oder eine greifbare Belohnung, um den Erfolg zu markieren.' },
    ],
  },
  {
    id: 2,
    question: 'Wenn dein Vorgesetzter sich bei dir bedankt – was macht es für dich aufrichtig?',
    options: [
      { archetype: 'word-collector', text: 'Konkrete Beispiele, schriftlich dokumentiert.' },
      { archetype: 'spotlight-seeker', text: 'Gelobt zu werden, wo Kollegen und Führungskräfte es hören können.' },
      { archetype: 'quiet-achiever', text: 'Eine persönliche und durchdachte Nachricht, die direkt an mich gesendet wird.' },
      { archetype: 'growth-chaser', text: 'Klare Verbindung zwischen dem Lob und meinem langfristigen Wachstum.' },
      { archetype: 'reward-enthusiast', text: 'Die Wertschätzung mit etwas Greifbarem oder Erlebnishaftem zu verbinden.' },
    ],
  },
  {
    id: 3,
    question: 'Wenn du an deine besten Momente bei der Arbeit denkst – was ist am auffälligsten?',
    options: [
      { archetype: 'word-collector', text: 'Durchdachte Nachrichten, die meine Wirkung klar darstellten.' },
      { archetype: 'spotlight-seeker', text: 'Öffentliche Anerkennung vor respektierten Kollegen.' },
      { archetype: 'quiet-achiever', text: 'Bedeutungsvolle 1:1-Gespräche über meine Bemühungen.' },
      { archetype: 'growth-chaser', text: 'Möglichkeiten, die meinen Aufgabenbereich oder Einfluss erweiterten.' },
      { archetype: 'reward-enthusiast', text: 'Feiern oder Belohnungen, die an Erfolge geknüpft waren.' },
    ],
  },
  {
    id: 4,
    question: 'Wenn dein Vorgesetzter Arbeit hinter den Kulissen anerkennen möchte – was sollte er/sie tun?',
    options: [
      { archetype: 'word-collector', text: 'Eine detaillierte Notiz schreiben, die die unsichtbare Wirkung erklärt.' },
      { archetype: 'spotlight-seeker', text: 'Es öffentlich hervorheben, damit andere den Wert verstehen.' },
      { archetype: 'quiet-achiever', text: 'Die Bemühung privat anerkennen, ohne mich in den Mittelpunkt zu stellen.' },
      { archetype: 'growth-chaser', text: 'Es mit erweiterten Verantwortlichkeiten oder Führungsmöglichkeiten verbinden.' },
      { archetype: 'reward-enthusiast', text: 'Die Wertschätzung mit einer kleinen aber bedeutungsvollen Geste verbinden.' },
    ],
  },
  {
    id: 5,
    question: 'Wenn du an langfristige Motivation denkst – was hält dich am meisten am Laufen?',
    options: [
      { archetype: 'word-collector', text: 'Schriftliche Bestätigung der Qualität und Tiefe meiner Arbeit.' },
      { archetype: 'spotlight-seeker', text: 'Sichtbare Anerkennung, die meinen Ruf aufbaut.' },
      { archetype: 'quiet-achiever', text: 'Persönliches Vertrauen und privat ausgedrückte Wertschätzung.' },
      { archetype: 'growth-chaser', text: 'Kontinuierliche Weiterentwicklung und Kompetenzaufbau.' },
      { archetype: 'reward-enthusiast', text: 'Greifbare Belohnungen, die signalisieren, dass meine Beiträge wichtig sind.' },
    ],
  },
  {
    id: 6,
    question: 'Wenn dein Name in Unternehmenskommunikation erscheint, würdest du bevorzugen:',
    options: [
      { archetype: 'word-collector', text: 'Eine gut formulierte schriftliche Hervorhebung deiner Beiträge.' },
      { archetype: 'spotlight-seeker', text: 'Eine Feature-Ankündigung, die breit geteilt wird.' },
      { archetype: 'quiet-achiever', text: 'Zuerst konsultiert zu werden und es möglicherweise privat zu halten.' },
      { archetype: 'growth-chaser', text: 'Dass es deine Führungstrajektorie betont.' },
      { archetype: 'reward-enthusiast', text: 'Dass es mit einer formellen Auszeichnung oder einem Zertifikat verbunden ist.' },
    ],
  },
  {
    id: 7,
    question: 'Wenn Feedback geliefert wird, schätzt du am meisten:',
    options: [
      { archetype: 'word-collector', text: 'Tiefe und Spezifität, schriftlich festgehalten.' },
      { archetype: 'spotlight-seeker', text: 'Anerkennung, die meine Sichtbarkeit erhöht.' },
      { archetype: 'quiet-achiever', text: 'Emotionale Authentizität in einem privaten Gespräch.' },
      { archetype: 'growth-chaser', text: 'Klare nächste Schritte für den Aufstieg.' },
      { archetype: 'reward-enthusiast', text: 'Eine feierliche Geste neben dem Feedback.' },
    ],
  },
  {
    id: 8,
    question: 'Wenn jemand deine Stärken würdigt – was spricht dich am meisten an?',
    options: [
      { archetype: 'word-collector', text: 'Eine detaillierte Beschreibung dessen, was meine Arbeit einzigartig macht.' },
      { archetype: 'spotlight-seeker', text: 'Eine öffentliche Empfehlung, die andere hören können.' },
      { archetype: 'quiet-achiever', text: 'Ein persönlicher Ausdruck von Vertrauen und Dankbarkeit.' },
      { archetype: 'growth-chaser', text: 'Ein Weg, diese Stärken auf höherem Niveau einzusetzen.' },
      { archetype: 'reward-enthusiast', text: 'Anerkennung, die etwas beinhaltet, das ich physisch behalten oder erleben kann.' },
    ],
  },
  {
    id: 9,
    question: 'Wenn du andere mentorierst – welche Art von Anerkennung gibst du natürlich?',
    options: [
      { archetype: 'word-collector', text: 'Detailliertes schriftliches Lob.' },
      { archetype: 'spotlight-seeker', text: 'Öffentliche Shoutouts.' },
      { archetype: 'quiet-achiever', text: 'Ruhige 1:1-Ermutigung.' },
      { archetype: 'growth-chaser', text: 'Wachstumsmöglichkeiten.' },
      { archetype: 'reward-enthusiast', text: 'Kleine Geschenke oder Feiern.' },
    ],
  },
  {
    id: 10,
    question: 'Wenn du dich unterbewertet fühlst – was fehlt meist?',
    options: [
      { archetype: 'word-collector', text: 'Klare schriftliche Anerkennung meiner Wirkung.' },
      { archetype: 'spotlight-seeker', text: 'Sichtbarkeit unter Kollegen oder Führungskräften.' },
      { archetype: 'quiet-achiever', text: 'Persönliche Wertschätzung in einem sicheren Raum.' },
      { archetype: 'growth-chaser', text: 'Karrierebewegung oder Herausforderung.' },
      { archetype: 'reward-enthusiast', text: 'Greifbare Beweise, dass meine Bemühung belohnt wurde.' },
    ],
  },
  {
    id: 11,
    question: 'Welches Szenario würde dich am meisten begeistern?',
    options: [
      { archetype: 'word-collector', text: 'Eine durchdachte Notiz zu erhalten, die ich erneut lesen kann.' },
      { archetype: 'spotlight-seeker', text: 'In einem Teamforum applaudiert zu werden.' },
      { archetype: 'quiet-achiever', text: 'Dass ein Vorgesetzter mich privat und aufrichtig dankt.' },
      { archetype: 'growth-chaser', text: 'Für eine herausfordernde Aufgabe ausgewählt zu werden.' },
      { archetype: 'reward-enthusiast', text: 'Mit einem feierlichen Erlebnis überrascht zu werden.' },
    ],
  },
  {
    id: 12,
    question: 'Wenn du an die Langlebigkeit von Anerkennung denkst – was ist am wichtigsten?',
    options: [
      { archetype: 'word-collector', text: 'Schriftliches Lob später erneut lesen zu können.' },
      { archetype: 'spotlight-seeker', text: 'Die anhaltende Sichtbarkeit öffentlicher Anerkennung.' },
      { archetype: 'quiet-achiever', text: 'Die Stärke persönlicher Beziehungen durch private Dankesworte.' },
      { archetype: 'growth-chaser', text: 'Langfristiger Aufstieg, der mit meinem Erfolg verbunden ist.' },
      { archetype: 'reward-enthusiast', text: 'Ein greifbarer Erinnerung an die Leistung.' },
    ],
  },
  {
    id: 13,
    question: 'Wenn die Führung deine Arbeit bemerkt hat, würdest du bevorzugen, dass sie:',
    options: [
      { archetype: 'word-collector', text: 'Eine detaillierte E-Mail senden, die den strategischen Wert erklärt.' },
      { archetype: 'spotlight-seeker', text: 'Es in einer sichtbaren Führungssituation erwähnen.' },
      { archetype: 'quiet-achiever', text: 'Ein privates Check-in planen, um darüber zu sprechen.' },
      { archetype: 'growth-chaser', text: 'Mentoring oder Sponsoring anbieten.' },
      { archetype: 'reward-enthusiast', text: 'Ein bedeutungsvolles Zeichen der Wertschätzung bieten.' },
    ],
  },
  {
    id: 14,
    question: 'Wenn ein Kollege dich lobt – was fühlt sich am bestätigendsten an?',
    options: [
      { archetype: 'word-collector', text: 'Spezifisches schriftliches Feedback, auf das ich später zurückgreifen kann.' },
      { archetype: 'spotlight-seeker', text: 'Lob, das in einem Gruppenkanal geteilt wird.' },
      { archetype: 'quiet-achiever', text: 'Eine durchdachte Direktnachricht.' },
      { archetype: 'growth-chaser', text: 'Eine Einführung in eine neue Möglichkeit aufgrund dessen.' },
      { archetype: 'reward-enthusiast', text: 'Eine Einladung, gemeinsam zu feiern.' },
    ],
  },
  {
    id: 15,
    question: 'Wenn du dir ideale Anerkennung im nächsten Jahr vorstellst – du stellst dir vor:',
    options: [
      { archetype: 'word-collector', text: 'Eine Sammlung dokumentierter Lobes, die deine Wirkung hervorheben.' },
      { archetype: 'spotlight-seeker', text: 'Wachsende Sichtbarkeit und Anerkennung in der Organisation.' },
      { archetype: 'quiet-achiever', text: 'Stärkere persönliche Bindungen durch private Wertschätzung.' },
      { archetype: 'growth-chaser', text: 'Klarer Aufstieg und neue Herausforderungen.' },
      { archetype: 'reward-enthusiast', text: 'Unvergessliche Erlebnisse oder greifbare Belohnungen, die an Erfolge geknüpft sind.' },
    ],
  },
  {
    id: 16,
    question: 'Der ideale Zeitpunkt für Anerkennung für dich ist:',
    options: [
      { archetype: 'quiet-achiever', text: 'Bald danach, in einem ruhigen Moment.' },
      { archetype: 'spotlight-seeker', text: 'Sofort und sichtbar.' },
      { archetype: 'growth-chaser', text: 'Während der Karriereentwicklungsgespräche.' },
      { archetype: 'word-collector', text: 'Wenn die volle Wirkung gewürdigt werden kann.' },
      { archetype: 'reward-enthusiast', text: 'Mit etwas Geplantem und Durchdachtem.' },
    ],
  },
  {
    id: 17,
    question: 'Von wem möchtest du am meisten Wertschätzung hören?',
    options: [
      { archetype: 'quiet-achiever', text: 'Meinem direkten Vorgesetzten oder engen Kollegen.' },
      { archetype: 'spotlight-seeker', text: 'Führungskräften oder unternehmensweit.' },
      { archetype: 'reward-enthusiast', text: 'Die Person, die es liefert, ist unwichtig. Mir ist die Belohnung wichtiger.' },
      { archetype: 'growth-chaser', text: 'Menschen, die meinen Karriereweg beeinflussen können.' },
      { archetype: 'word-collector', text: 'Jeder, der sich die Zeit nimmt, spezifisch und durchdacht zu sein.' },
    ],
  },
  {
    id: 18,
    question: 'Wie oft möchtest du Wertschätzung erhalten?',
    options: [
      { archetype: 'growth-chaser', text: 'Laufend und als Teil von Entwicklungsgesprächen.' },
      { archetype: 'reward-enthusiast', text: 'Nach Meilensteinen.' },
      { archetype: 'word-collector', text: 'Regelmäßig und nach einem festen Zeitplan.' },
      { archetype: 'spotlight-seeker', text: 'Häufig.' },
      { archetype: 'quiet-achiever', text: 'Nur bei bedeutenden Erfolgen.' },
    ],
  },
];
