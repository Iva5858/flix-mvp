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
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Publicly, in front of the team' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Privately, in a personal conversation' },
      { archetype: 'word-collector' as ArchetypeId, text: 'In a thoughtful written message' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Through small gifts or perks' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Through learning opportunities' },
    ],
  },
  {
    id: 2,
    question: 'What makes you feel most appreciated?',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Being celebrated in team meetings' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'A heartfelt 1:1 conversation' },
      { archetype: 'word-collector' as ArchetypeId, text: 'A well-written note or email' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A small token or gift' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'A new challenge or project' },
    ],
  },
  {
    id: 3,
    question: 'When someone appreciates your work, you prefer:',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Everyone to know about it' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'It to be just between you and them' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Something you can read and reflect on' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Something concrete to remember it by' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'It to lead to new opportunities' },
    ],
  },
  {
    id: 4,
    question: 'How often would you like to receive appreciation?',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Frequently - I love regular recognition' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Occasionally - only for significant achievements' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Regularly - consistent feedback means a lot' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'After milestones - tied to specific accomplishments' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Ongoing - as part of development conversations' },
    ],
  },
  {
    id: 5,
    question: 'The best recognition I ever received was:',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Being praised in front of senior leadership' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'A meaningful private thank you from my manager' },
      { archetype: 'word-collector' as ArchetypeId, text: 'A detailed email explaining my impact' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A surprise gift or experience' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Being chosen for a high-visibility project' },
    ],
  },
  {
    id: 6,
    question: 'What matters most to you about appreciation?',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'That others see my contributions' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'That it feels genuine and personal' },
      { archetype: 'word-collector' as ArchetypeId, text: 'The specific details of what I did well' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'That there\'s something I can enjoy or use' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'That it opens doors for my future' },
    ],
  },
  {
    id: 7,
    question: 'When celebrating a team success, you prefer:',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'A team announcement with individual shoutouts' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Individual thank yous to team members privately' },
      { archetype: 'word-collector' as ArchetypeId, text: 'A message highlighting each person\'s contribution' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A team celebration with food or activities' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'A debrief on learnings and next opportunities' },
    ],
  },
  {
    id: 8,
    question: 'The ideal timing for recognition is:',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Immediately and visibly' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Soon after, in a calm moment' },
      { archetype: 'word-collector' as ArchetypeId, text: 'When they can articulate the full impact' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'With something planned and thoughtful' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'During performance/development discussions' },
    ],
  },
  {
    id: 9,
    question: 'What type of rewards do you value most?',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Public awards or certificates' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Extra time off or flexibility' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Personalized messages from leadership' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Gift cards, vouchers, or physical gifts' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Training budget or conference attendance' },
    ],
  },
  {
    id: 10,
    question: 'When you achieve something significant:',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'I want it shared widely (newsletters, social media)' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'I prefer it stays within my immediate team' },
      { archetype: 'word-collector' as ArchetypeId, text: 'I want a detailed acknowledgment of the work' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'I\'d love a celebration or gift' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'I want to discuss what\'s next for my career' },
    ],
  },
  {
    id: 11,
    question: 'Who do you most want to hear appreciation from?',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Senior leadership or company-wide' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'My direct manager or close colleagues' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Anyone who takes time to be specific and thoughtful' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Whoever is giving me the reward!' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'People who can influence my career path' },
    ],
  },
  {
    id: 12,
    question: 'A meaningful "thank you" for me includes:',
    options: [
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Recognition of my visibility and influence' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Acknowledgment of my behind-the-scenes efforts' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Specific examples of my impact' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A token that shows they were thinking of me' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'How this sets me up for future success' },
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
      'spotlight-seeker': 0,
      'quiet-achiever': 0,
      'word-collector': 0,
      'reward-enthusiast': 0,
      'growth-chaser': 0,
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

