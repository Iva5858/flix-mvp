import type { TrainingModule } from './training';

export const trainingModulesDe: TrainingModule[] = [
  {
    id: 1,
    title: 'Die Kraft der Wertschätzung',
    description: 'Erfahre, warum Wertschätzung am Arbeitsplatz wichtig ist',
    icon: 'Lightbulb',
    duration: '5 Min',
    lessons: [
      {
        type: 'content',
        title: 'Willkommen!',
        content: 'Wertschätzung ist nicht nur nett – sie ist unerlässlich für eine florierende Arbeitsplatzkultur. Lass uns erkunden, warum sie wichtig ist.',
        icon: 'Hand',
      },
      {
        type: 'content',
        title: 'Warum Wertschätzung wichtig ist',
        content: 'Studien zeigen, dass Mitarbeiter, die sich wertgeschätzt fühlen:\n\n• 50 % produktiver sind\n• 3x wahrscheinlicher bei ihrem Unternehmen bleiben\n• Deutlich engagierter in ihrer Arbeit sind',
        icon: 'BarChart3',
      },
      {
        type: 'content',
        title: 'Der Welleneffekt',
        content: 'Wenn du jemanden wertschätzt, entsteht ein positiver Welleneffekt:\n\n1. Die Person fühlt sich wertgeschätzt und motiviert\n2. Sie schätzt eher andere wert\n3. Die gesamte Teamkultur verbessert sich',
        icon: 'Waves',
      },
      {
        type: 'quiz',
        title: 'Schnell-Check',
        content: 'Wie viel Prozent der Mitarbeiter sind produktiver, wenn sie sich wertgeschätzt fühlen?',
        options: ['5 %', '50 %', '15 %', '45 %'],
        correctAnswer: 1,
        explanation: 'Richtig! Mitarbeiter, die sich wertgeschätzt fühlen, sind 50 % produktiver. Das ist eine enorme Wirkung!',
        incorrectExplanation: 'Nicht ganz. Die richtige Antwort ist 50 %. Studien zeigen, dass Mitarbeiter, die sich wertgeschätzt fühlen, 50 % produktiver sind – das ist ein erheblicher Schub!',
      },
      {
        type: 'example',
        title: 'Reales Beispiel',
        content: 'Sarah bemerkte, dass ihr Teammitglied Alex Überstunden machte, um ein Projekt abzuschließen. Statt nur „danke" zu sagen, schrieb sie:\n\n„Alex, ich habe wirklich geschätzt, wie du gestern über dich hinausgewachsen bist. Deine Hilfe hat den Unterschied gemacht, und ich habe viel von deinem Ansatz gelernt. Danke!"',
        icon: 'Sparkles',
      },
      {
        type: 'content',
        title: 'Wichtigste Erkenntnis',
        content: 'Wertschätzung ist eine Superkraft! Sie kostet nichts, schafft aber immensen Wert:\n\n• Steigert die Moral\n• Stärkt Beziehungen\n• Verbessert die Teamleistung\n• Schafft eine positive Kultur',
        icon: 'Target',
      },
    ],
  },
  {
    id: 2,
    title: 'Wertschätzungsstile verstehen',
    description: 'Entdecke verschiedene Arten, wie Menschen anerkannt werden möchten',
    icon: 'Target',
    duration: '7 Min',
    lessons: [
      {
        type: 'content',
        title: 'Jeder ist anders',
        content: 'Nicht jeder schätzt Anerkennung auf die gleiche Weise. Manche lieben öffentliches Lob, andere bevorzugen privates Feedback. Diese Unterschiede zu verstehen ist der Schlüssel!',
        icon: 'Drama',
      },
      {
        type: 'content',
        title: 'Die 5 Wertschätzungsstile',
        content:
          'Feuer – Gedeiht bei sichtbarer, öffentlicher Anerkennung\n\n' +
          'Mond – Bevorzugt echte, private Wertschätzung\n\n' +
          'Wind – Schätzt detaillierte, durchdachte schriftliche Anerkennung, die sie später lesen können\n\n' +
          'Wasser – Fühlt sich am meisten wertgeschätzt durch greifbare Belohnungen und Erlebnisse\n\n' +
          'Blitz – Motiviert durch herausfordernde Möglichkeiten und klare Wachstumspfade',
        icon: 'Palette',
      },
      {
        type: 'quiz',
        title: 'Nachdenken',
        content: 'Wenn jemand privates Feedback bevorzugt, was solltest du vermeiden?',
        options: [
          'Ihm/ihr eine persönliche Nachricht senden',
          'Die Person in einer Teambesprechung hervorheben',
          'Ein 1:1-Gespräch führen',
          'Ihm/ihr eine durchdachte Notiz schreiben',
        ],
        correctAnswer: 1,
        explanation: 'Genau! Menschen, die privates Feedback bevorzugen, würden sich bei öffentlicher Anerkennung unwohl fühlen. Respektiere immer ihre Präferenz!',
        incorrectExplanation: 'Nicht ganz. Die richtige Antwort ist „Die Person in einer Teambesprechung hervorheben." Menschen, die privates Feedback bevorzugen, würden sich bei öffentlicher Anerkennung unwohl fühlen. Respektiere immer ihre Präferenz!',
      },
      {
        type: 'content',
        title: 'Profi-Tipp',
        content: 'Der beste Weg, die Präferenz eines Menschen zu kennen? Frag! Oder prüfe, ob sie ihre Präferenzen in ihrem Profil festgelegt haben.',
        icon: 'Lightbulb',
      },
    ],
  },
  {
    id: 3,
    title: 'Effektives Feedback geben',
    description: 'Meistere die Kunst bedeutungsvoller Anerkennung',
    icon: 'Sparkles',
    duration: '6 Min',
    lessons: [
      {
        type: 'content',
        title: 'Was macht Wertschätzung effektiv?',
        content: 'Großartige Wertschätzung ist:\n\n• Spezifisch – Erwähne genau, was du geschätzt hast\n• Aufrichtig – Meine, was du sagst\n• Rechtzeitig – Bald nach der Aktion gegeben\n• Persönlich – An den Empfänger angepasst',
        icon: 'Star',
      },
      {
        type: 'example',
        title: 'Gut vs. Großartig',
        content: 'Allgemein: „Gute Arbeit!"\n\nSpezifisch: „Ich habe wirklich geschätzt, wie du gestern das schwierige Kundengespräch gemeistert hast. Deine Geduld und klare Kommunikation verwandelten eine angespannte Situation in ein positives Ergebnis."',
        icon: 'FileText',
      },
      {
        type: 'quiz',
        title: 'Was ist besser?',
        content: 'Welche Wertschätzungsnachricht ist effektiver?',
        options: [
          '"Danke für deine Hilfe."',
          '"Ich habe wirklich geschätzt, wie du Überstunden gemacht hast, um mir beim Debuggen zu helfen. Dein systematischer Ansatz half uns, es viel schneller zu lösen als ich allein gekonnt hätte."',
          '"Du bist toll!"',
          '"Gute Arbeit."',
        ],
        correctAnswer: 1,
        explanation: 'Perfekt! Die zweite Option ist spezifisch, aufrichtig und erklärt die Wirkung. Das macht Wertschätzung bedeutungsvoll!',
        incorrectExplanation: 'Nicht ganz. Die zweite Option ist am effektivsten, weil sie spezifisch, aufrichtig ist und die Wirkung erklärt. Effektive Wertschätzung konzentriert sich auf die konkrete Aktion, ihre Wirkung und warum sie wichtig war.',
      },
      {
        type: 'content',
        title: 'Merke dir',
        content: 'Effektive Wertschätzung konzentriert sich auf:\n\n• Die konkrete Aktion oder das Verhalten\n• Die Wirkung, die es hatte\n• Warum es dir oder dem Team wichtig war',
        icon: 'Target',
      },
    ],
  },
  {
    id: 4,
    title: 'Timing & Kontext',
    description: 'Wisse, wann und wie du Wertschätzung zeigen solltest',
    icon: 'Clock',
    duration: '5 Min',
    lessons: [
      {
        type: 'content',
        title: 'Timing ist wichtig',
        content: 'Die beste Wertschätzung ist rechtzeitig:\n\n• Direkt nach einer Leistung\n• Während oder direkt nach einer herausfordernden Situation\n• Wenn jemand über sich hinauswächst\n\nWarte nicht zu lange – der Moment zählt!',
        icon: 'Clock',
      },
      {
        type: 'content',
        title: 'Kontext ist der Schlüssel',
        content: 'Berücksichtigen Sie die Situation:\n\n• Großer Erfolg? → Formellere Anerkennung\n• Kleine Geste? → Schnelle, lockere Wertschätzung\n• Bei Stress? → Unterstützender, ermutigender Ton\n• Feierzeit? → Begeistert und öffentlich',
        icon: 'Drama',
      },
      {
        type: 'quiz',
        title: 'Wann wertschätzen?',
        content: 'Dein Kollege hat dir gerade geholfen, ein kniffliges Problem zu lösen. Wann solltest du Wertschätzung zeigen?',
        options: [
          'Bis zum Ende der Woche warten',
          'Sofort, während es frisch ist',
          'Nur während Leistungsbeurteilungen',
          'Nie, sie haben nur ihren Job gemacht',
        ],
        correctAnswer: 1,
        explanation: 'Ja! Schätze sofort wert, während die Wirkung frisch ist. Das macht es bedeutungsvoller und einprägsamer.',
        incorrectExplanation: 'Nicht ganz. Der beste Zeitpunkt für Wertschätzung ist sofort, während die Wirkung frisch ist. Rechtzeitige Wertschätzung ist bedeutungsvoller und einprägsamer als zu warten.',
      },
      {
        type: 'content',
        title: 'Du schaffst das!',
        content: 'Merke dir:\n\n• Schätze zeitnah wert\n• Passe den Kontext an\n• Berücksichtige den Stil des Empfängers\n• Sei aufrichtig',
        icon: 'PartyPopper',
      },
    ],
  },
];
