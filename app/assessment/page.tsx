'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { AssessmentFeedback } from '@/lib/ai';

const assessmentQuestions = [
  {
    id: 1,
    question: 'How often do you show appreciation to colleagues?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
  },
  {
    id: 2,
    question: 'What\'s your preferred way to show appreciation?',
    options: ['Public recognition', 'Private messages', 'Written notes', 'Small gestures'],
  },
  {
    id: 3,
    question: 'When do you typically show appreciation?',
    options: ['Immediately after achievement', 'During team meetings', 'In 1:1 conversations', 'When reminded'],
  },
  {
    id: 4,
    question: 'How do you feel about public recognition?',
    options: ['Love it', 'It\'s okay', 'Prefer private', 'Uncomfortable'],
  },
  {
    id: 5,
    question: 'What motivates you to show appreciation?',
    options: ['Genuine gratitude', 'Team culture', 'Company policy', 'Personal values'],
  },
];

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<AssessmentFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    const newResponses = { ...responses, [currentQuestion]: answer };
    setResponses(newResponses);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newResponses);
    }
  };

  const submitAssessment = async (finalResponses: Record<number, string>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userResponses: finalResponses,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const result = await response.json();
      setFeedback(result);
    } catch (error) {
      console.error('Error generating feedback:', error);
      // Fallback feedback
      setFeedback({
        strengths: ['You show genuine appreciation', 'You recognize others regularly'],
        improvements: ['Consider personalizing your approach', 'Match your style to recipient preferences'],
        suggestions: ['Try different recognition styles', 'Ask colleagues about their preferences'],
        alignment: 'Your style works well with various preferences',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setResponses({});
    setFeedback(null);
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-20">
        <TopBar />
        <main className="max-w-md mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-flix-primary mb-4"></div>
            <p className="text-flix-grayscale-70">Analyzing your appreciation style...</p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-20">
        <TopBar />
        <main className="max-w-md mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-flix-grayscale-100 mb-2">
              🤖 Your Assessment Results
            </h1>
            <p className="text-flix-grayscale-70 mb-6">
              Personalized insights about your appreciation style
            </p>

            <div className="space-y-4">
              {/* Strengths */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-flix-feedback-success/10 rounded-card border border-flix-feedback-success/20"
              >
                <h3 className="font-bold text-flix-grayscale-100 mb-3 flex items-center gap-2">
                  <span>✨</span> Your Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-flix-grayscale-90 flex items-start gap-2">
                      <span className="text-flix-feedback-success">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Areas for Improvement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-flix-feedback-warning/10 rounded-card border border-flix-feedback-warning/20"
              >
                <h3 className="font-bold text-flix-grayscale-100 mb-3 flex items-center gap-2">
                  <span>🚀</span> Areas for Growth
                </h3>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-sm text-flix-grayscale-90 flex items-start gap-2">
                      <span className="text-flix-feedback-warning">•</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-flix-background rounded-card border border-flix-grayscale-30"
              >
                <h3 className="font-bold text-flix-grayscale-100 mb-3 flex items-center gap-2">
                  <span>💡</span> Suggestions
                </h3>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-flix-grayscale-90 flex items-start gap-2">
                      <span className="text-flix-primary">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Alignment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-flix-ui-primary/10 rounded-card border border-flix-ui-primary/20"
              >
                <h3 className="font-bold text-flix-grayscale-100 mb-2 flex items-center gap-2">
                  <span>🎯</span> Style Alignment
                </h3>
                <p className="text-sm text-flix-grayscale-90">{feedback.alignment}</p>
              </motion.div>

              <button
                onClick={resetAssessment}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-semibold hover:bg-flix-ui-primary transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </motion.div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-flix-grayscale-100">
                🤖 Self Assessment (Giving Appreciation)
              </h1>
              <span className="text-sm text-flix-grayscale-70">
                {currentQuestion + 1}/{assessmentQuestions.length}
              </span>
            </div>
            <div className="h-2 bg-flix-grayscale-30 rounded-full overflow-hidden mb-4">
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
            className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30 shadow-sm mb-6"
          >
            <h2 className="text-xl font-bold text-flix-grayscale-100 mb-6">
              {question.question}
            </h2>
            
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-4 py-3 rounded-button border-2 border-flix-grayscale-30 bg-flix-background hover:border-flix-primary hover:bg-flix-primary/5 transition-colors"
                >
                  <span className="text-flix-grayscale-100 font-medium">{option}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="text-center text-sm text-flix-grayscale-50">
            Answer honestly for the best insights
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

