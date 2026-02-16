'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { AssessmentFeedback } from '@/lib/ai';

const assessmentQuestions = [
  { id: 1, question: 'How often do you show appreciation to colleagues?', options: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
  { id: 2, question: "What's your preferred way to show appreciation?", options: ['Public recognition', 'Private messages', 'Written notes', 'Small gestures'] },
  { id: 3, question: 'When do you typically show appreciation?', options: ['Immediately after achievement', 'During team meetings', 'In 1:1 conversations', 'When reminded'] },
  { id: 4, question: 'How do you feel about public recognition?', options: ['Love it', "It's okay", 'Prefer private', 'Uncomfortable'] },
  { id: 5, question: 'What motivates you to show appreciation?', options: ['Genuine gratitude', 'Team culture', 'Company policy', 'Personal values'] },
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
        body: JSON.stringify({ userResponses: finalResponses }),
      });
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const result = await response.json();
      setFeedback(result);
    } catch (error) {
      console.error('Error generating feedback:', error);
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
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin mb-4" />
            <p className="text-[14px] text-flix-grayscale-70">Analyzing your appreciation style...</p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <div className="animate-fade-in">
            <p className="text-sm font-medium text-flix-primary mb-1">Appreciator Test</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Your Results</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Personalized insights about your appreciation style</p>

            <div className="space-y-4">
              {[
                { title: 'Your Strengths', icon: 'Sparkles' as const, items: feedback.strengths, iconClass: 'text-flix-feedback-success', bg: 'bg-flix-feedback-success/5', border: 'border-flix-feedback-success/10' },
                { title: 'Areas for Growth', icon: 'ArrowUpRight' as const, items: feedback.improvements, iconClass: 'text-flix-feedback-warning', bg: 'bg-flix-feedback-warning/5', border: 'border-flix-feedback-warning/10' },
                { title: 'Suggestions', icon: 'Lightbulb' as const, items: feedback.suggestions, iconClass: 'text-flix-primary', bg: 'bg-flix-background', border: 'border-flix-grayscale-20' },
              ].map((section) => (
                <div
                  key={section.title}
                  className={`p-4 rounded-card shadow-card border animate-fade-in ${section.bg} ${section.border}`}
                >
                  <h3 className="text-sm font-semibold text-flix-grayscale-100 mb-3 flex items-center gap-2">
                    <Icon name={section.icon} size={16} className={section.iconClass} />
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="text-[14px] text-flix-grayscale-90 flex items-start gap-2">
                        <span className="text-flix-grayscale-50 mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="p-4 rounded-card bg-flix-primary/5 border border-flix-primary/10 animate-fade-in">
                <h3 className="text-sm font-semibold text-flix-grayscale-100 mb-2 flex items-center gap-2">
                  <Icon name="Target" size={16} className="text-flix-primary" />
                  Style Alignment
                </h3>
                <p className="text-[14px] text-flix-grayscale-90 leading-relaxed">{feedback.alignment}</p>
              </div>

              <button
                onClick={resetAssessment}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                Retake Appreciator Test
              </button>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-flix-primary mb-0.5">Assessment</p>
              <h1 className="text-xl font-semibold text-flix-grayscale-100 tracking-tight">Appreciator Test</h1>
            </div>
            <span className="text-[13px] text-flix-grayscale-50 font-medium">
              {currentQuestion + 1}/{assessmentQuestions.length}
            </span>
          </div>
          <div className="h-1 bg-flix-grayscale-20 rounded-pill overflow-hidden mb-8">
            <div
              className="h-full bg-flix-primary rounded-pill transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            key={currentQuestion}
            className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-6 animate-fade-in"
          >
            <h2 className="text-[16px] font-medium text-flix-grayscale-100 mb-5 leading-snug">
              {question.question}
            </h2>
            <div className="space-y-2">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-4 py-3 rounded-button bg-flix-grayscale-10 hover:bg-flix-grayscale-20 border border-transparent hover:border-flix-grayscale-30 transition-all text-[14px] font-medium text-flix-grayscale-100 active:scale-[0.99]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-[13px] text-flix-grayscale-50">Answer honestly for the best insights</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
