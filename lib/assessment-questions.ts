export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
}

export const assessmentQuestionsEn: AssessmentQuestion[] = [
  { id: 1, question: 'How often do you show appreciation to colleagues?', options: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
  { id: 2, question: "What's your preferred way to show appreciation?", options: ['Public recognition', 'Private messages', 'Written notes', 'Small gestures'] },
  { id: 3, question: 'When do you typically show appreciation?', options: ['Immediately after achievement', 'During team meetings', 'In 1:1 conversations', 'When reminded'] },
  { id: 4, question: 'How do you feel about public recognition?', options: ['Love it', "It's okay", 'Prefer private', 'Uncomfortable'] },
  { id: 5, question: 'What motivates you to show appreciation?', options: ['Genuine gratitude', 'Team culture', 'Company policy', 'Personal values'] },
];

export const assessmentQuestionsDe: AssessmentQuestion[] = [
  { id: 1, question: 'Wie oft zeigst du Kollegen Wertschätzung?', options: ['Täglich', 'Wöchentlich', 'Monatlich', 'Selten'] },
  { id: 2, question: 'Wie zeigst du am liebsten Wertschätzung?', options: ['Öffentliche Anerkennung', 'Private Nachrichten', 'Schriftliche Notizen', 'Kleine Gesten'] },
  { id: 3, question: 'Wann zeigst du typischerweise Wertschätzung?', options: ['Direkt nach einem Erfolg', 'Während Teambesprechungen', 'In 1:1-Gesprächen', 'Wenn ich daran erinnert werde'] },
  { id: 4, question: 'Wie stehst du zu öffentlicher Anerkennung?', options: ['Liebe es', 'Ist okay', 'Bevorzug privat', 'Unbehaglich'] },
  { id: 5, question: 'Was motiviert dich, Wertschätzung zu zeigen?', options: ['Echte Dankbarkeit', 'Teamkultur', 'Unternehmensrichtlinie', 'Persönliche Werte'] },
];
