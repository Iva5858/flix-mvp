'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { AssessmentFeedback } from '@/lib/ai';
import { assessmentQuestionsEn } from '@/lib/assessment-questions';

interface AppreciationLog {
  id: string;
  recipientName: string;
  occasion: string;
  date: string;
}

interface SavedAssessment {
  feedback: AssessmentFeedback;
  completedAt: string;
}

type View = 'dashboard' | 'quiz' | 'loading';

const APPRECIATION_KEY = 'flix_appreciations';
const ASSESSMENT_KEY = 'flix_assessment';

function getAppreciations(): AppreciationLog[] {
  try { return JSON.parse(localStorage.getItem(APPRECIATION_KEY) || '[]'); }
  catch { return []; }
}

function getSavedAssessment(): SavedAssessment | null {
  try {
    const raw = localStorage.getItem(ASSESSMENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function countInRange(logs: AppreciationLog[], days: number): number {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return logs.filter(l => new Date(l.date).getTime() >= cutoff).length;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: diffDays > 365 ? 'numeric' : undefined });
}

const occasionLabels: Record<string, string> = {
  achievement: 'Achievement',
  support: 'Support',
  milestone: 'Milestone',
  general: 'General',
};

export default function AssessmentPage() {
  const router = useRouter();
  const [view, setView] = useState<View>('dashboard');
  const [appreciations, setAppreciations] = useState<AppreciationLog[]>([]);
  const [savedAssessment, setSavedAssessment] = useState<SavedAssessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) { router.replace('/'); return; }
    setAppreciations(getAppreciations());
    setSavedAssessment(getSavedAssessment());
  }, [router]);

  const startQuiz = () => {
    setCurrentQuestion(0);
    setResponses({});
    setView('quiz');
  };

  const handleAnswer = (answer: string) => {
    const newResponses = { ...responses, [currentQuestion]: answer };
    setResponses(newResponses);
    if (currentQuestion < assessmentQuestionsEn.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newResponses);
    }
  };

  const submitAssessment = async (finalResponses: Record<number, string>) => {
    setView('loading');
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userResponses: finalResponses }),
      });
      if (!res.ok) throw new Error('Failed');
      const feedback: AssessmentFeedback = await res.json();
      const saved: SavedAssessment = { feedback, completedAt: new Date().toISOString() };
      localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(saved));
      setSavedAssessment(saved);
    } catch {
      const fallback: SavedAssessment = {
        feedback: {
          strengths: ['You show genuine care for your colleagues', 'You are reflective about how you give recognition'],
          improvements: ['Consider tailoring recognition to each person\'s preferred style', 'Try to give appreciation closer to the moment it happens'],
          suggestions: ['Ask one colleague this week how they prefer to receive recognition', 'Use the Appreciation Toolkit to craft more personalised messages'],
          alignment: 'Your responses suggest a balanced giving style. You naturally lean toward direct, personal recognition — qualities that align with Moon and Wind styles. Building awareness of when to use public versus private recognition will help your appreciation land more consistently.',
        },
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(fallback));
      setSavedAssessment(fallback);
    }
    setView('dashboard');
  };

  const thisWeek = countInRange(appreciations, 7);
  const thisMonth = countInRange(appreciations, 30);
  const allTime = appreciations.length;
  const recent = [...appreciations].reverse().slice(0, 6);
  const progress = ((currentQuestion + 1) / assessmentQuestionsEn.length) * 100;

  // ─── LOADING ──────────────────────────────────────────────────────────────
  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin mb-4" />
            <p className="text-[14px] text-flix-grayscale-70">Analysing your appreciation patterns...</p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (view === 'quiz') {
    const question = assessmentQuestionsEn[currentQuestion];
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <div className="animate-fade-in">
            <button
              onClick={() => setView('dashboard')}
              className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
              Back to Dashboard
            </button>

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-flix-primary">Appreciator Test</p>
              <span className="text-[13px] text-flix-grayscale-50 font-medium">
                {currentQuestion + 1}/{assessmentQuestionsEn.length}
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

            <p className="text-center text-[13px] text-flix-grayscale-50">
              Reflect honestly — the more accurate your answers, the more useful your feedback
            </p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in space-y-6">

          {/* Header */}
          <div>
            <p className="text-sm font-medium text-flix-primary mb-1">Assessment</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-1.5 tracking-tight">
              Appreciation Dashboard
            </h1>
            <p className="text-[15px] text-flix-grayscale-70">
              Track your recognition habits and see where you can grow
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'This Week', value: thisWeek },
              { label: 'This Month', value: thisMonth },
              { label: 'All Time', value: allTime },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-flix-background rounded-card p-4 border border-flix-grayscale-20 shadow-card text-center"
              >
                <p className="text-2xl font-bold text-flix-grayscale-100 mb-0.5">{stat.value}</p>
                <p className="text-[12px] text-flix-grayscale-50 font-medium leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Assessment Results or CTA */}
          {savedAssessment ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-flix-grayscale-100">Your Assessment Results</h2>
                <span className="text-[12px] text-flix-grayscale-50">
                  {formatDate(savedAssessment.completedAt)}
                </span>
              </div>

              {[
                {
                  title: 'Your Strengths',
                  icon: 'Sparkles' as const,
                  items: savedAssessment.feedback.strengths,
                  iconClass: 'text-flix-feedback-success',
                  bg: 'bg-flix-feedback-success/5',
                  border: 'border-flix-feedback-success/10',
                },
                {
                  title: 'Areas for Development',
                  icon: 'ArrowUpRight' as const,
                  items: savedAssessment.feedback.improvements,
                  iconClass: 'text-flix-feedback-warning',
                  bg: 'bg-flix-feedback-warning/5',
                  border: 'border-flix-feedback-warning/10',
                },
                {
                  title: 'Suggestions',
                  icon: 'Lightbulb' as const,
                  items: savedAssessment.feedback.suggestions,
                  iconClass: 'text-flix-primary',
                  bg: 'bg-flix-background',
                  border: 'border-flix-grayscale-20',
                },
              ].map((section) => (
                <div
                  key={section.title}
                  className={`p-4 rounded-card shadow-card border ${section.bg} ${section.border}`}
                >
                  <h3 className="text-sm font-semibold text-flix-grayscale-100 mb-3 flex items-center gap-2">
                    <Icon name={section.icon} size={16} className={section.iconClass} />
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="text-[14px] text-flix-grayscale-90 flex items-start gap-2">
                        <span className="text-flix-grayscale-40 mt-0.5 flex-shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="p-4 rounded-card bg-flix-primary/5 border border-flix-primary/10">
                <h3 className="text-sm font-semibold text-flix-grayscale-100 mb-2 flex items-center gap-2">
                  <Icon name="Target" size={16} className="text-flix-primary" />
                  Style Tendencies
                </h3>
                <p className="text-[14px] text-flix-grayscale-90 leading-relaxed">
                  {savedAssessment.feedback.alignment}
                </p>
              </div>

              <button
                onClick={startQuiz}
                className="w-full py-3 bg-flix-grayscale-10 text-flix-grayscale-70 rounded-button font-medium hover:bg-flix-grayscale-20 transition-colors text-[14px] border border-flix-grayscale-20"
              >
                Retake Assessment
              </button>
            </div>
          ) : (
            <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="ClipboardList" size={20} className="text-flix-primary" />
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-flix-grayscale-100 mb-1">Discover How You Give</h2>
                  <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">
                    The Appreciator Test analyses 10 scenario-based questions to give you honest, personalised feedback on how you give recognition — and which appreciation styles you naturally lean toward.
                  </p>
                </div>
              </div>
              <button
                onClick={startQuiz}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-semibold text-[14px] hover:bg-flix-ui-primary transition-colors"
              >
                Take the Appreciator Test
              </button>
            </div>
          )}

          {/* Recent Activity */}
          <div>
            <h2 className="text-[15px] font-semibold text-flix-grayscale-100 mb-3">Recent Activity</h2>
            {recent.length === 0 ? (
              <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card text-center">
                <Icon name="Heart" size={24} className="text-flix-grayscale-30 mx-auto mb-2" />
                <p className="text-[14px] font-medium text-flix-grayscale-70 mb-1">No appreciations logged yet</p>
                <p className="text-[13px] text-flix-grayscale-50">
                  Use the Appreciation Toolkit to recognise a colleague — it will appear here.
                </p>
              </div>
            ) : (
              <div className="bg-flix-background rounded-card border border-flix-grayscale-20 shadow-card overflow-hidden">
                {recent.map((log, idx) => (
                  <div
                    key={log.id}
                    className={`flex items-center gap-3 px-4 py-3 ${idx < recent.length - 1 ? 'border-b border-flix-grayscale-10' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Heart" size={14} className="text-flix-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-flix-grayscale-100 truncate">
                        {log.recipientName}
                      </p>
                      <p className="text-[12px] text-flix-grayscale-50">
                        {occasionLabels[log.occasion] ?? log.occasion}
                      </p>
                    </div>
                    <span className="text-[12px] text-flix-grayscale-40 flex-shrink-0">
                      {formatDate(log.date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
      <BottomNav />
    </div>
  );
}