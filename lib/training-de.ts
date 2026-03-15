import type { TrainingModule } from './training';

export const trainingModulesDe: TrainingModule[] = [
  {
    id: 1,
    title: 'Die Kraft der Wertschätzung',
    description: 'Verstehe den Wert bedeutungsvoller Anerkennung und was sie mit der Teamkultur macht',
    icon: 'Lightbulb',
    duration: '5 Min',
    lessons: [
      {
        type: 'content',
        title: 'Warum das wichtig ist',
        content: 'Wertschätzung ist kein nettes Extra — sie ist ein zentraler Treiber von Teamleistung, Mitarbeiterbindung und psychologischer Sicherheit am Arbeitsplatz. Die Frage ist nicht ob, sondern wie man sie so gibt, dass sie wirklich ankommt.',
        icon: 'Hand',
      },
      {
        type: 'content',
        title: 'Was die Forschung zeigt',
        content: 'Mitarbeiter, die sich konsequent wertgeschätzt fühlen, sind:\n\n• 50 % produktiver\n• 3x wahrscheinlicher, in ihrer Organisation zu bleiben\n• Deutlich engagierter in ihrer täglichen Arbeit\n\nDer letzte Punkt — dreimal höhere Bindungswahrscheinlichkeit — macht Wertschätzung zu einem der wirksamsten Bindungsinstrumente, die Führungskräften zur Verfügung stehen.',
        icon: 'BarChart3',
      },
      {
        type: 'content',
        title: 'Der Welleneffekt',
        content: 'Wertschätzung verstärkt sich selbst. Wenn du jemanden wirkungsvoll anerkennst:\n\n1. Fühlt er oder sie sich wirklich wertgeschätzt und ist motivierter beizutragen\n2. Gibt die Person diese Anerkennung eher an andere weiter\n3. Verändert sich die gesamte Teamkultur in Richtung Offenheit und Vertrauen\n\nEine einzige, gut platzierte, spezifische Anerkennung kann beeinflussen, wie jemand wochenlang im Team auftritt.',
        icon: 'Waves',
      },
      {
        type: 'quiz',
        title: 'Schnell-Check',
        content: 'Um wie viel Prozent sind Mitarbeiter produktiver, die sich konsequent wertgeschätzt fühlen?',
        options: ['5 %', '50 %', '15 %', '45 %'],
        correctAnswer: 1,
        explanation: 'Richtig. Ein Produktivitätszuwachs von 50 % ist erheblich — und er kostet nichts außer Aufmerksamkeit und Absicht.',
        incorrectExplanation: 'Nicht ganz. Studien zeigen einen Produktivitätszuwachs von 50 % bei Mitarbeitern, die sich wirklich wertgeschätzt fühlen. Das ist eine beachtliche Rendite auf etwas, das nur Zeit und Nachdenken kostet.',
      },
      {
        type: 'example',
        title: 'In der Praxis',
        content: 'María bemerkte, dass ihr Kollege Sven am Vorabend stundenlang an einem kritischen Integrationsproblem vor einem Produktrelease gearbeitet hatte. Statt einer kurzen Nachricht im Team-Kanal schrieb sie ihm direkt:\n\n„Sven, ich habe wirklich geschätzt, wie du dich gestern Abend um das Integrationsproblem gekümmert hast. Durch deine Sorgfalt verlief der Release reibungslos und das Team konnte sich auf den Launch konzentrieren. Diese Art von Verantwortungsbewusstsein hat echten Einfluss — danke."',
        icon: 'Sparkles',
      },
      {
        type: 'content',
        title: 'Was du mitnehmen solltest',
        content: 'Wirkungsvolle Wertschätzung ist spezifisch, zeitnah und kostet nichts — aber ihre Wirkung auf Motivation, Vertrauen und Teamkultur ist messbar:\n\n• Steigert die individuelle Motivation\n• Stärkt Arbeitsbeziehungen\n• Verbessert die Teamleistung langfristig\n• Schafft ein Umfeld, in dem Menschen wirklich beitragen wollen',
        icon: 'Target',
      },
    ],
  },
  {
    id: 2,
    title: 'Wertschätzungsstile verstehen',
    description: 'Die fünf Arten, wie Menschen Anerkennung bevorzugen — und warum es darauf ankommt, Stil und Person abzustimmen',
    icon: 'Target',
    duration: '7 Min',
    lessons: [
      {
        type: 'content',
        title: 'Einheitsgröße funktioniert nicht',
        content: 'Menschen reagieren nicht alle gleich auf Anerkennung. Was für eine Person bedeutungsvoll ist, kann für eine andere unangenehm oder sogar kontraproduktiv sein. Wertschätzung wirkungsvoll zu geben bedeutet, den Menschen zu verstehen — nicht einfach eine Geste zu wählen.',
        icon: 'Drama',
      },
      {
        type: 'content',
        title: 'Die 5 Wertschätzungsstile',
        content:
          'Feuer — Gedeiht bei sichtbarer, öffentlicher Anerkennung vor Kollegen und Führungskräften\n\n' +
          'Mond — Schätzt echte, persönliche Wertschätzung im privaten Rahmen\n\n' +
          'Wind — Schätzt durchdachte, sorgfältig formulierte schriftliche Anerkennung, die sie später lesen können\n\n' +
          'Wasser — Fühlt sich am stärksten anerkannt durch greifbare Belohnungen und gemeinsame Erlebnisse\n\n' +
          'Blitz — Wird durch Entwicklungsmöglichkeiten und klare Wachstumspfade energetisiert',
        icon: 'Palette',
      },
      {
        type: 'quiz',
        title: 'Anwenden',
        content: 'Ein Kollege mit Mond-Stil hat bei einem Projekt außerordentliches geleistet. Was solltest du vermeiden?',
        options: [
          'Eine persönliche, durchdachte Nachricht schicken',
          'Die Person ohne Vorwarnung in einer Teambesprechung hervorheben',
          'Ein dediziertes 1:1-Gespräch führen, um den Einsatz anzuerkennen',
          'Eine private Notiz schreiben, die die spezifische Wirkung festhält',
        ],
        correctAnswer: 1,
        explanation: 'Genau richtig. Jemand mit Mond-Stil schätzt private, echte Anerkennung. Öffentliche Erwähnungen — auch gut gemeint — können sich für sie eher exponierend als bestätigend anfühlen.',
        incorrectExplanation: 'Nicht ganz. Die Antwort ist „Die Person ohne Vorwarnung in einer Teambesprechung hervorheben." Jemand mit Mond-Stil schätzt private Anerkennung. Öffentliches Lob, auch wenn gut gemeint, kann unangenehm statt bestätigend wirken.',
      },
      {
        type: 'content',
        title: 'Der direkteste Weg',
        content: 'Der direkteste Weg, die Präferenz einer Person zu kennen? Frag sie. Ein einfaches „Wie möchtest du am liebsten Anerkennung erhalten?" öffnet ein wertvolles Gespräch.\n\nWenn jemand das Wertschätzungs-Quiz auf dieser Plattform abgeschlossen hat, ist sein primärer Stil und seine bevorzugten Kanäle bereits in seinem Profil gespeichert — nutze diese Information.',
        icon: 'Lightbulb',
      },
    ],
  },
  {
    id: 3,
    title: 'Anerkennung, die ankommt',
    description: 'Lerne, was generische Wertschätzung von Anerkennung unterscheidet, die wirklich resoniert — und übe es anzuwenden',
    icon: 'Sparkles',
    duration: '6 Min',
    lessons: [
      {
        type: 'content',
        title: 'Was sie zum Landen bringt',
        content: 'Wertschätzung, die wirklich ankommt, ist in der Regel:\n\n• Spezifisch — du nennst die genaue Handlung oder das Verhalten\n• Aufrichtig — du sagst nur, was du wirklich meinst\n• Zeitnah — sie wird nah am Moment gegeben, in dem er passiert ist\n• Persönlich — sie wird auf die vom Empfänger bevorzugte Art übermittelt',
        icon: 'Star',
      },
      {
        type: 'example',
        title: 'Generisch vs. Spezifisch',
        content: 'Generisch: „Gute Präsentation!"\n\nSpezifisch: „Ich habe wirklich geschätzt, wie du die Daten in der Stakeholder-Präsentation letzte Woche neu gerahmt hast. Die Art, wie du die Zahlen mit dem Geschäftsergebnis verbunden hast, hat die Empfehlung für das Führungsteam viel leichter umsetzbar gemacht. Das erforderte echtes Urteilsvermögen."',
        icon: 'FileText',
      },
      {
        type: 'quiz',
        title: 'Was wirkt?',
        content: 'Welche Wertschätzungsnachricht ist am effektivsten?',
        options: [
          '"Danke für deine Hilfe."',
          '"Ich habe wirklich geschätzt, wie du beim Kundengespräch am Montag eingesprungen bist. Dein ruhiges Eingehen auf die Bedenken hat verhindert, dass die Beziehung angespannt wurde. Das hat wirklich einen Unterschied gemacht."',
          '"Du bist ein Star!"',
          '"Wieder mal gute Arbeit."',
        ],
        correctAnswer: 1,
        explanation: 'Die zweite Nachricht funktioniert, weil sie einen spezifischen Moment benennt, die Wirkung beschreibt und erklärt, warum es wichtig war. Das ist die Kombination, die Wertschätzung aufrichtig wirken lässt.',
        incorrectExplanation: 'Die effektivste Nachricht ist die zweite. Sie benennt eine spezifische Situation, beschreibt die Wirkung und erklärt, warum es wichtig war. Generische Phrasen wie „gute Arbeit" sind leicht zu geben, aber schwer bedeutungsvoll zu empfangen.',
      },
      {
        type: 'content',
        title: 'Das Dreiteile-Framework',
        content: 'Jede wirkungsvolle Wertschätzungsnachricht enthält drei Elemente:\n\n• Die spezifische Handlung oder das Verhalten, das du beobachtet hast\n• Die Wirkung — auf das Projekt, das Team oder das Ergebnis\n• Warum es wichtig war — für dich persönlich oder für das übergeordnete Ziel\n\nDu musst nicht ausführlich sein. Auch eine kurze Nachricht landet gut, wenn sie alle drei Punkte trifft.',
        icon: 'Target',
      },
    ],
  },
  {
    id: 4,
    title: 'Timing & Kontext',
    description: 'Verstehe, wie Timing und Kontext bestimmen, ob Wertschätzung ankommt — oder verfehlt',
    icon: 'Clock',
    duration: '5 Min',
    lessons: [
      {
        type: 'content',
        title: 'Timing verändert alles',
        content: 'Die beste Wertschätzung ist zeitnah:\n\n• Direkt nach einer bemerkenswerten Leistung\n• Während oder unmittelbar nach einer schwierigen oder druckintensiven Phase\n• Wenn jemand über das Erwartete hinausgeht\n\nAnerkennung, die Tage oder Wochen später kommt, verliert ihren Bezug zum Moment — und kann wie eine Pflichtübung wirken statt wie echte Anerkennung.',
        icon: 'Clock',
      },
      {
        type: 'content',
        title: 'Auf die Situation abstimmen',
        content: 'Der Kontext beeinflusst den richtigen Ansatz:\n\n• Große Leistung → überlegtere, formalere Anerkennung\n• Kontinuierlicher, stiller Einsatz → kurze, aber ehrliche Würdigung\n• Hochbelasteter Moment → eine unterstützende, private Nachricht\n• Teamerfolg → öffentliche Feier, wenn die Person das begrüßt\n\nDas Gewicht deiner Wertschätzung der Größe des Moments anzupassen zeigt gutes Urteilsvermögen.',
        icon: 'Drama',
      },
      {
        type: 'quiz',
        title: 'Wann ist der richtige Moment?',
        content: 'Ein Kollege blieb bis spät, um dir bei einem kritischen Problem kurz vor einer Produktdeadline zu helfen. Wann solltest du Wertschätzung zeigen?',
        options: [
          'Es für die nächste Leistungsbeurteilung aufheben',
          'Sofort — während die Wirkung noch frisch ist',
          'Am Ende der Woche, wenn sich alles gelegt hat',
          'Nur, wenn er oder sie es selbst anspricht',
        ],
        correctAnswer: 1,
        explanation: 'Sofort ist richtig. Anerkennung nah am Moment gegeben ist weit bedeutungsvoller als verzögertes Lob. Die Verbindung zwischen Handlung und Anerkennung zählt.',
        incorrectExplanation: 'Der beste Zeitpunkt ist sofort. Anerkennung, die nah am Moment landet, wirkt echt und verbunden. Zu warten — auch nur bis zum Wochenende — schwächt diesen Zusammenhang.',
      },
      {
        type: 'content',
        title: 'Deine Wertschätzungs-Checkliste',
        content: 'Bevor du Wertschätzung sendest, prüfe:\n\n• Ist sie spezifisch — nenne ich, was die Person wirklich getan hat?\n• Ist sie zeitnah — gebe ich sie nah an dem Moment, in dem es passiert ist?\n• Passt sie zum Stil — nutze ich den Kanal, den die Person bevorzugt?\n• Ist sie aufrichtig — meine ich es wirklich?\n\nWenn alle vier Fragen mit Ja beantwortet werden können — sende sie.',
        icon: 'Check',
      },
    ],
  },
];