'use client';

import { useState, useMemo } from 'react';
import { ArchetypeId, archetypes, UserPreferences } from '@/lib/archetypes';
import { Icon } from '@/lib/icons';
import ArchetypeCard from './ArchetypeCard';
import type { QuestionResponse } from '@/lib/firestore';
import { getOrCreateUserId } from '@/lib/userId';

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
  // Randomize questions and answer choices once on mount
  const randomizedQuestions = useMemo(() => {
    const shuffled = [...quizQuestions].map(question => {
      // Randomize answer choices within each question
      const shuffledOptions = [...question.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return {
        ...question,
        options: shuffledOptions,
      };
    });
    
    // Randomize question order
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ArchetypeId[]>>({});
  const [openEndedResponses, setOpenEndedResponses] = useState<Record<number, string>>({});
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());
  const [selectedArchetypes, setSelectedArchetypes] = useState<Set<ArchetypeId>>(
    new Set(initialPreferences ? [initialPreferences.primaryArchetype, ...initialPreferences.secondaryPreferences] : [])
  );
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState<UserPreferences | null>(null);
  const [selectedArchetypeForDetails, setSelectedArchetypeForDetails] = useState<ArchetypeId | null>(null);
  const [showOpenEndedInput, setShowOpenEndedInput] = useState(false);
  const [openEndedText, setOpenEndedText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const toggleAnswer = (archetypeId: ArchetypeId) => {
    const currentSelections = answers[currentQuestion] || [];
    const isSelected = currentSelections.includes(archetypeId);
    const newSelections = isSelected
      ? currentSelections.filter((id) => id !== archetypeId)
      : [...currentSelections, archetypeId];
    const newAnswers = { ...answers, [currentQuestion]: newSelections };
    setAnswers(newAnswers);
    setSelectedArchetypes((prev) => new Set([...prev, ...newSelections]));
    setShowOpenEndedInput(false);
    setOpenEndedText('');
  };

  const handleNext = () => {
    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(answers);
    }
  };

  const handleSkip = () => {
    setSkippedQuestions((prev) => new Set([...prev, currentQuestion]));
    const updatedAnswers = { ...answers, [currentQuestion]: [] };
    setAnswers(updatedAnswers);
    setShowOpenEndedInput(false);
    setOpenEndedText('');

    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const handleOpenEndedSubmit = () => {
    if (openEndedText.trim()) {
      setOpenEndedResponses((prev) => ({ ...prev, [currentQuestion]: openEndedText.trim() }));
      setAnswers((prev) => ({ ...prev, [currentQuestion]: [] }));
      setShowOpenEndedInput(false);
      setOpenEndedText('');

      if (currentQuestion < randomizedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResult(answers);
      }
    }
  };

  const calculateResult = (finalAnswers: Record<number, ArchetypeId[]>) => {
    // Count occurrences of each archetype (each selection counts)
    const counts: Record<ArchetypeId, number> = {
      'spotlight-seeker': 0,
      'quiet-achiever': 0,
      'word-collector': 0,
      'reward-enthusiast': 0,
      'growth-chaser': 0,
    };

    Object.values(finalAnswers).forEach((archetypes) => {
      (archetypes || []).forEach((archetype) => {
        counts[archetype]++;
      });
    });

    // Find primary archetype (most common)
    // If no answers, use a default or initial preference
    const totalAnswers = Object.values(counts).reduce((sum, count) => sum + count, 0);
    let primaryArchetype: ArchetypeId;
    
    if (totalAnswers === 0) {
      // Fallback to initial preference or default
      primaryArchetype = initialPreferences?.primaryArchetype || 'spotlight-seeker';
    } else {
      primaryArchetype = Object.entries(counts).reduce((a, b) =>
        counts[a[0] as ArchetypeId] > counts[b[0] as ArchetypeId] ? a : b
      )[0] as ArchetypeId;
    }

    // Get secondary preferences (others that were selected)
    const secondaryPreferences = Object.keys(counts)
      .filter(id => id !== primaryArchetype && counts[id as ArchetypeId] > 0)
      .slice(0, 2) as ArchetypeId[];

    const preferences: UserPreferences = {
      primaryArchetype,
      secondaryPreferences,
      visibility: initialPreferences?.visibility || 'team',
    };

    setResult(preferences);
    setQuizComplete(true);
  };

  const buildQuestionResponses = (): QuestionResponse[] => {
    const responses: QuestionResponse[] = [];

    randomizedQuestions.forEach((question, index) => {
      const selectedArchetypes = answers[index];
      // Check if this question was answered with archetype(s)
      if (selectedArchetypes !== undefined && selectedArchetypes.length > 0) {
        const archetypeNames = selectedArchetypes.map(
          (id) => archetypes[id]?.name || id
        );
        const answerTexts = selectedArchetypes.map((id) => {
          const opt = question.options.find((o) => o.archetype === id);
          return opt?.text || '';
        });
        responses.push({
          questionId: question.id,
          questionText: question.question,
          answerType: 'archetype',
          archetypeAnswers: archetypeNames,
          answerTexts,
          archetypeAnswer: archetypeNames[0],
          answerText: answerTexts[0],
        });
      }
      // Check if this question was answered with open-ended text
      else if (openEndedResponses[index]) {
        responses.push({
          questionId: question.id,
          questionText: question.question,
          answerType: 'open-ended',
          openEndedAnswer: openEndedResponses[index],
        });
      }
      // Check if this question was skipped
      else if (skippedQuestions.has(index)) {
        responses.push({
          questionId: question.id,
          questionText: question.question,
          answerType: 'skipped',
        });
      }
    });
    
    return responses;
  };

  const handleConfirm = async () => {
    if (result) {
      setSaving(true);
      setSaveError(null);
      
      try {
        const userId = getOrCreateUserId();
        const questionResponses = buildQuestionResponses();
        const { saveQuizResults } = await import('@/lib/firestore');
        await saveQuizResults(result, questionResponses, userId);
        
        // Call the onComplete callback
        onComplete(result);
      } catch (error: any) {
        console.error('Error saving quiz results:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to save results. Please try again.';
        
        if (error?.message?.includes('Firebase is not initialized')) {
          errorMessage = 'Firebase is not configured. Please check your environment variables and restart the development server.';
        } else if (error?.message?.includes('permission-denied') || error?.code === 'permission-denied') {
          errorMessage = 'Permission denied. Please check your Firestore security rules.';
        } else if (error?.message?.includes('ERR_BLOCKED_BY_CLIENT') || error?.code === 'ERR_BLOCKED_BY_CLIENT') {
          errorMessage = 'Request blocked. Please disable ad blockers or browser extensions that might be blocking Firebase requests.';
        } else if (error?.message?.includes('undefined')) {
          errorMessage = 'Firebase configuration is missing. Please ensure all environment variables are set in .env.local and restart the server.';
        }
        
        setSaveError(errorMessage);
        setSaving(false);
      }
    }
  };

  const question = randomizedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / randomizedQuestions.length) * 100;
  const currentSelections = answers[currentQuestion] || [];
  const hasAnswer =
    currentSelections.length > 0 || openEndedResponses[currentQuestion] !== undefined;

  // Show results screen
  if (quizComplete && result) {
    const primaryArchetype = archetypes[result.primaryArchetype];
    const detailArchetype = selectedArchetypeForDetails ? archetypes[selectedArchetypeForDetails] : null;

    return (
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-flix-grayscale-100 mb-6 tracking-tight">
            Appreciation Preferences
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2 uppercase tracking-wider">Primary Style</p>
              <ArchetypeCard
                archetype={primaryArchetype}
                size="medium"
                onClick={() => setSelectedArchetypeForDetails(result.primaryArchetype)}
              />
            </div>

            {result.secondaryPreferences.length > 0 && (
              <div>
                <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2 uppercase tracking-wider">Secondary</p>
                <div className="space-y-2">
                  {result.secondaryPreferences.map((id) => (
                    <ArchetypeCard
                      key={id}
                      archetype={archetypes[id]}
                      size="small"
                      onClick={() => setSelectedArchetypeForDetails(id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {detailArchetype && (
            <div className="mt-6 bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-flix-grayscale-100">
                  {detailArchetype.name}
                </h4>
                <button
                  onClick={() => setSelectedArchetypeForDetails(null)}
                  className="text-sm text-flix-grayscale-70 hover:text-flix-grayscale-100"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <p className="text-flix-grayscale-90 mb-6">
                {detailArchetype.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-flix-grayscale-90 mb-2">
                    Preferred Recognition:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {detailArchetype.preferredRecognition.map((rec, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-flix-primary/10 text-flix-grayscale-100 border border-flix-primary/20"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-flix-grayscale-90 mb-2">
                    Best Practices:
                  </h5>
                  <ul className="space-y-1">
                    {detailArchetype.do.map((item, idx) => (
                      <li key={idx} className="text-sm text-flix-grayscale-90 flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-flix-feedback-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-flix-grayscale-90 mb-2">
                    What to Avoid:
                  </h5>
                  <ul className="space-y-1">
                    {detailArchetype.dont.map((item, idx) => (
                      <li key={idx} className="text-sm text-flix-grayscale-90 flex items-start gap-2">
                        <Icon name="X" size={16} className="text-flix-feedback-danger flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-flix-grayscale-90 mb-2">
                    Suggested Channels:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {detailArchetype.suggestedChannels.map((channel, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-flix-grayscale-10 text-flix-grayscale-70"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {saveError && (
            <div className="mt-4 p-3 bg-flix-feedback-danger/10 border border-flix-feedback-danger/20 rounded-card">
              <p className="text-sm text-flix-feedback-danger">{saveError}</p>
            </div>
          )}
          
          <button
            onClick={handleConfirm}
            disabled={saving}
            className="w-full mt-6 py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px] active:scale-[0.98]"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    );
  }

  // Show quiz questions
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-flix-grayscale-100 tracking-tight">Preference Quiz</h3>
          <span className="text-[13px] text-flix-grayscale-50 font-medium">
            {currentQuestion + 1}/{randomizedQuestions.length}
          </span>
        </div>
        <div className="h-1 bg-flix-grayscale-20 rounded-pill overflow-hidden">
          <div
            className="h-full bg-flix-primary rounded-pill transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div key={currentQuestion} className="animate-fade-in">
        <h4 className="text-[16px] font-medium text-flix-grayscale-100 mb-4 leading-snug">
          {question.question}
        </h4>

        {!showOpenEndedInput ? (
          <>
            <p className="text-[13px] text-flix-grayscale-70 mb-3">
              Select all that apply
            </p>
            <div className="space-y-2 mb-4">
              {question.options.map((option) => {
                const isSelected = currentSelections.includes(option.archetype);
                return (
                  <div
                    key={option.archetype}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleAnswer(option.archetype)}
                    onKeyDown={(e) => e.key === 'Enter' && toggleAnswer(option.archetype)}
                    className="cursor-pointer active:scale-[0.995] transition-transform"
                  >
                    <div
                      className={`p-4 rounded-card border transition-all duration-200 flex items-center gap-3 ${
                        isSelected
                          ? 'border-flix-primary bg-flix-primary/10'
                          : 'border-flix-grayscale-20 bg-flix-grayscale-10 hover:border-flix-grayscale-30'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-flix-primary bg-flix-primary'
                            : 'border-flix-grayscale-50'
                        }`}
                      >
                        {isSelected && (
                          <Icon name="Check" size={14} className="text-white" />
                        )}
                      </div>
                      <span className="text-flix-grayscale-100 font-medium">
                        {option.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowOpenEndedInput(true)}
                  className="w-full p-4 rounded-card border border-dashed border-flix-grayscale-20 bg-flix-grayscale-10 hover:border-flix-grayscale-30 transition-colors text-flix-grayscale-100 font-medium text-[14px] active:scale-[0.98]"
                >
                  + Add your own answer
                </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 py-3 px-4 rounded-button border border-flix-grayscale-20 bg-flix-grayscale-10 hover:bg-flix-grayscale-20 text-flix-grayscale-70 font-medium transition-colors text-[14px] active:scale-[0.98]"
                >
                  Skip
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!hasAnswer}
                  className="flex-1 py-3 px-4 rounded-button bg-flix-primary text-white font-medium hover:bg-flix-ui-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px] active:scale-[0.98]"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <textarea
              value={openEndedText}
              onChange={(e) => setOpenEndedText(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-card border border-flix-grayscale-20 bg-flix-grayscale-10 text-flix-grayscale-100 placeholder-flix-grayscale-50 focus:border-flix-primary focus:outline-none focus:ring-1 focus:ring-flix-primary/30 resize-none text-[14px]"
              rows={4}
              autoFocus
            />
            <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowOpenEndedInput(false);
                    setOpenEndedText('');
                  }}
                  className="flex-1 py-3 px-4 rounded-button border border-flix-grayscale-20 bg-flix-grayscale-10 hover:bg-flix-grayscale-20 text-flix-grayscale-70 font-medium transition-colors text-[14px] active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleOpenEndedSubmit}
                  disabled={!openEndedText.trim()}
                  className="flex-1 py-3 px-4 rounded-button bg-flix-primary text-white font-medium hover:bg-flix-ui-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  Submit
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

