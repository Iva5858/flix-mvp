'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArchetypeId, archetypes, UserPreferences } from '@/lib/archetypes';
import ArchetypeCard from './ArchetypeCard';

interface PreferenceQuizProps {
  onComplete: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
}

const quizQuestions = [
  {
    id: 1,
    question: 'How do you prefer to receive recognition?',
    options: [
      { archetype: 'public-praise' as ArchetypeId, text: 'Publicly, in front of the team' },
      { archetype: 'private-feedback' as ArchetypeId, text: 'Privately, in a personal conversation' },
      { archetype: 'written-words' as ArchetypeId, text: 'In a thoughtful written message' },
      { archetype: 'tangible-rewards' as ArchetypeId, text: 'Through small gifts or perks' },
      { archetype: 'growth-oriented' as ArchetypeId, text: 'Through learning opportunities' },
    ],
  },
  {
    id: 2,
    question: 'What makes you feel most appreciated?',
    options: [
      { archetype: 'public-praise' as ArchetypeId, text: 'Being celebrated in team meetings' },
      { archetype: 'private-feedback' as ArchetypeId, text: 'A heartfelt 1:1 conversation' },
      { archetype: 'written-words' as ArchetypeId, text: 'A well-written note or email' },
      { archetype: 'tangible-rewards' as ArchetypeId, text: 'A small token or gift' },
      { archetype: 'growth-oriented' as ArchetypeId, text: 'A new challenge or project' },
    ],
  },
  {
    id: 3,
    question: 'When someone appreciates your work, you prefer:',
    options: [
      { archetype: 'public-praise' as ArchetypeId, text: 'Everyone to know about it' },
      { archetype: 'private-feedback' as ArchetypeId, text: 'It to be just between you and them' },
      { archetype: 'written-words' as ArchetypeId, text: 'Something you can read and reflect on' },
      { archetype: 'tangible-rewards' as ArchetypeId, text: 'Something concrete to remember it by' },
      { archetype: 'growth-oriented' as ArchetypeId, text: 'It to lead to new opportunities' },
    ],
  },
];

export default function PreferenceQuiz({ onComplete, initialPreferences }: PreferenceQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ArchetypeId>>({});
  const [selectedArchetypes, setSelectedArchetypes] = useState<Set<ArchetypeId>>(
    new Set(initialPreferences ? [initialPreferences.primaryArchetype, ...initialPreferences.secondaryPreferences] : [])
  );

  const handleAnswer = (archetypeId: ArchetypeId) => {
    const newAnswers = { ...answers, [currentQuestion]: archetypeId };
    setAnswers(newAnswers);
    setSelectedArchetypes(prev => new Set([...prev, archetypeId]));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, ArchetypeId>) => {
    // Count occurrences of each archetype
    const counts: Record<ArchetypeId, number> = {
      'public-praise': 0,
      'private-feedback': 0,
      'written-words': 0,
      'tangible-rewards': 0,
      'growth-oriented': 0,
    };

    Object.values(finalAnswers).forEach(archetype => {
      counts[archetype]++;
    });

    // Find primary archetype (most common)
    const primaryArchetype = Object.entries(counts).reduce((a, b) =>
      counts[a[0] as ArchetypeId] > counts[b[0] as ArchetypeId] ? a : b
    )[0] as ArchetypeId;

    // Get secondary preferences (others that were selected)
    const secondaryPreferences = Object.keys(counts)
      .filter(id => id !== primaryArchetype && counts[id as ArchetypeId] > 0)
      .slice(0, 2) as ArchetypeId[];

    const preferences: UserPreferences = {
      primaryArchetype,
      secondaryPreferences,
      visibility: initialPreferences?.visibility || 'team',
    };

    onComplete(preferences);
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-flix-grayscale-100">Preference Quiz</h3>
          <span className="text-sm text-flix-grayscale-70">
            {currentQuestion + 1}/{quizQuestions.length}
          </span>
        </div>
        <div className="h-2 bg-flix-grayscale-30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-flix-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h4 className="text-lg font-semibold text-flix-grayscale-100 mb-4">
          {question.question}
        </h4>

        <div className="space-y-3">
          {question.options.map((option) => {
            const archetype = archetypes[option.archetype];
            return (
              <motion.div
                key={option.archetype}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.archetype)}
                className="cursor-pointer"
              >
                <div className="p-4 rounded-card border-2 border-flix-grayscale-30 bg-flix-background hover:border-flix-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{archetype.emoji}</span>
                    <span className="text-flix-grayscale-100 font-medium">{option.text}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

