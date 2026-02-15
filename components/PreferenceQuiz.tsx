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
    question: 'After completing a major project, what follow-up would feel most meaningful to you?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'A detailed written message outlining what I did and why it mattered.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Recognition shared in a team meeting or company-wide forum.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'A private 1:1 conversation acknowledging my contribution.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'A discussion about how this positions me for bigger opportunities.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A small celebratory experience or tangible reward to mark the win.' },
    ],
  },
  {
    id: 2,
    question: 'When your manager thanks you, what makes it feel sincere?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Specific examples documented in writing.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Being praised where peers and leaders can hear it.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'A personal and thoughtful message sent directly to me.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Clear linkage between the praise and my long-term growth.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Pairing the appreciation with something tangible or experiential.' },
    ],
  },
  {
    id: 3,
    question: 'When reflecting on your best moments at work, what stands out most?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Thoughtful messages that captured my impact clearly.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Public recognition in front of respected colleagues.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Meaningful 1:1 conversations about my efforts.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Opportunities that expanded my scope or influence.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Celebrations or rewards tied to accomplishments.' },
    ],
  },
  {
    id: 4,
    question: 'If your manager wants to recognise behind-the-scenes effort, what should they do?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Write a detailed note explaining the unseen impact.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Highlight it publicly so others understand its value.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Privately acknowledge the effort without spotlighting me.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Connect it to expanded ownership or leadership opportunities.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Pair the appreciation with a small but meaningful gesture.' },
    ],
  },
  {
    id: 5,
    question: 'When thinking about long-term motivation, what sustains you most?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Written affirmation of the quality and depth of my work.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Visible acknowledgment that builds my reputation.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Personal trust and appreciation expressed privately.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Continuous progression and skill development.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Tangible rewards that signal my contributions matter.' },
    ],
  },
  {
    id: 6,
    question: 'If your name appears in company communications, you would prefer:',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'A well-crafted written spotlight detailing your contributions.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'A feature announcement shared broadly.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'To be consulted first and possibly keep it private.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'It emphasises your leadership trajectory.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'It is paired with a formal award or certificate.' },
    ],
  },
  {
    id: 7,
    question: 'When feedback is delivered, you value most:',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Depth and specificity captured in writing.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Recognition that enhances my visibility.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Emotional authenticity in a private conversation.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Clear next steps for advancement.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A celebratory gesture alongside the feedback.' },
    ],
  },
  {
    id: 8,
    question: 'When someone appreciates your strengths, what resonates most?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'A detailed description of what makes my work unique.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'A public endorsement others can hear.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'A personal expression of trust and gratitude.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'A pathway to apply those strengths at a higher level.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Recognition that includes something I can physically keep or experience.' },
    ],
  },
  {
    id: 9,
    question: 'When mentoring others, what kind of recognition do you naturally give?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Detailed written praise.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Public shoutouts.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Quiet 1:1 encouragement.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Growth opportunities.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Small gifts or celebrations.' },
    ],
  },
  {
    id: 10,
    question: 'When you feel undervalued, what is usually missing?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Clear written acknowledgment of my impact.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Visibility among peers or leaders.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Personal appreciation in a safe space.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Career movement or challenge.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Tangible evidence that my effort was rewarded.' },
    ],
  },
  {
    id: 11,
    question: 'Which scenario would energise you most?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Receiving a thoughtful note I can reread.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Being applauded in a team forum.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Having a manager thank me privately and sincerely.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Being tapped for a stretch assignment.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Being surprised with a celebratory experience.' },
    ],
  },
  {
    id: 12,
    question: 'When thinking about recognition longevity, what matters most?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Being able to revisit written praise later.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'The lasting visibility of public acknowledgment.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'The strength of personal relationships built through private thanks.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Long-term advancement tied to my success.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'A tangible reminder of the accomplishment.' },
    ],
  },
  {
    id: 13,
    question: 'If leadership noticed your work, you would prefer they:',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Send a detailed email explaining its strategic value.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Mention it in a visible leadership setting.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Schedule a private check-in to discuss it.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Offer mentorship or sponsorship.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Provide a meaningful token of appreciation.' },
    ],
  },
  {
    id: 14,
    question: 'If a colleague praises you, what feels most affirming?',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'Specific written feedback I can reference later.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Praise shared in a group channel.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'A thoughtful direct message.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'An introduction to a new opportunity because of it.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'An invitation to celebrate together.' },
    ],
  },
  {
    id: 15,
    question: 'When imagining ideal recognition over the next year, you picture:',
    options: [
      { archetype: 'word-collector' as ArchetypeId, text: 'A collection of documented praise highlighting your impact.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Growing visibility and acknowledgment across the organization.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Stronger personal bonds built through private appreciation.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Clear advancement and new challenges.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'Memorable experiences or tangible rewards tied to achievements.' },
    ],
  },
  {
    id: 16,
    question: 'The ideal timing for recognition for you is:',
    options: [
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Soon after, in a calm moment.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Immediately and visibly.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'During job development discussions.' },
      { archetype: 'word-collector' as ArchetypeId, text: 'When the full impact can be appreciated.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'With something planned and thoughtful.' },
    ],
  },
  {
    id: 17,
    question: 'Who do you most want to hear appreciation from?',
    options: [
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'My direct manager or close colleagues.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Senior leadership or company-wide.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'The person delivering it is unimportant. I care more about the reward.' },
      { archetype: 'growth-chaser' as ArchetypeId, text: 'People who can influence my career path.' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Anyone who takes time to be specific and thoughtful.' },
    ],
  },
  {
    id: 18,
    question: 'How often would you like to receive appreciation?',
    options: [
      { archetype: 'growth-chaser' as ArchetypeId, text: 'Ongoing and as part of development conversations.' },
      { archetype: 'reward-enthusiast' as ArchetypeId, text: 'After milestones.' },
      { archetype: 'word-collector' as ArchetypeId, text: 'Regularly and based on a set schedule.' },
      { archetype: 'spotlight-seeker' as ArchetypeId, text: 'Frequently.' },
      { archetype: 'quiet-achiever' as ArchetypeId, text: 'Only for significant achievements.' },
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

