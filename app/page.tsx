'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/lib/icons';
import { archetypes, ArchetypeId } from '@/lib/archetypes';
import { getOrCreateUserId } from '@/lib/userId';

type Step =
  | 'loading'
  | 'welcome'
  | 'onboarding'
  | 'auth-choice'
  | 'signup'
  | 'verify'
  | 'login'
  | 'account-created'
  | 'tutorial'
  | 'tutorial-complete'
  | 'personality'
  | 'profile-view'
  | 'profile-saved';

const onboardingSlides = [
  {
    icon: 'Heart' as const,
    label: 'What is appreciation?',
    title: 'More than just "thank you"',
    body: 'Appreciation at work is about recognising people in ways that are genuinely meaningful to them — not just going through the motions.',
  },
  {
    icon: 'BarChart3' as const,
    label: 'Why it matters',
    title: 'It changes everything',
    body: "Teams with strong appreciation cultures see higher engagement, lower turnover, and better performance. It's one of the highest-ROI things you can do as a leader.",
  },
  {
    icon: 'Sparkles' as const,
    label: 'How the app works',
    title: 'Three tools, one goal',
    body: 'Train with bite-sized lessons, use AI-powered toolbox tools, and discover your unique appreciation style — all in one place.',
  },
];

const personalityQuestions = [
  {
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

const trainingPreview = [
  { title: 'The Power of Appreciation', duration: '5 min' },
  { title: 'Understanding Appreciation Styles', duration: '7 min' },
  { title: 'Giving Effective Feedback', duration: '6 min' },
  { title: 'Timing & Context', duration: '5 min' },
];

const toolboxPreview = [
  { title: 'Appreciate a Colleague', icon: 'Heart' as const },
  { title: 'Phrase Generator', icon: 'Sparkles' as const },
  { title: 'Channel Guide', icon: 'Smartphone' as const },
  { title: 'Timing Tips', icon: 'Clock' as const },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('loading');
  const [slideIndex, setSlideIndex] = useState(0);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, ArchetypeId[]>>({});
  const [primaryArchetype, setPrimaryArchetype] = useState<ArchetypeId | null>(null);
  const [secondaryArchetypes, setSecondaryArchetypes] = useState<ArchetypeId[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('flix_user');
    if (user) {
      router.replace('/training');
    } else {
      setStep('welcome');
    }
  }, [router]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('flix_user', JSON.stringify({ name: form.name, email: form.email }));
    setStep('verify');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('flix_user', JSON.stringify({ email: form.email }));
    setStep('account-created');
  };

  const toggleQuizAnswer = (archetype: ArchetypeId) => {
    const current = quizAnswers[quizIndex] || [];
    const updated = current.includes(archetype)
      ? current.filter((a) => a !== archetype)
      : [...current, archetype];
    setQuizAnswers({ ...quizAnswers, [quizIndex]: updated });
  };

  const advanceQuiz = async (finalAnswers: Record<number, ArchetypeId[]>) => {
    const counts: Record<ArchetypeId, number> = {
      'spotlight-seeker': 0,
      'quiet-achiever': 0,
      'word-collector': 0,
      'reward-enthusiast': 0,
      'growth-chaser': 0,
    };
    Object.values(finalAnswers).forEach((ids) => ids.forEach((id) => counts[id]++));
    const sorted = (Object.entries(counts) as [ArchetypeId, number][]).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];
    const secondary = sorted.slice(1).filter(([, n]) => n > 0).map(([id]) => id);
    setPrimaryArchetype(primary);
    setSecondaryArchetypes(secondary);

    try {
      const userId = getOrCreateUserId();
      const preferences = { primaryArchetype: primary, secondaryPreferences: secondary, visibility: 'team' as const };
      const questionResponses = personalityQuestions.map((q, i) => {
        const selected = finalAnswers[i] || [];
        if (selected.length === 0) {
          return { questionId: i + 1, questionText: q.question, answerType: 'skipped' as const };
        }
        return {
          questionId: i + 1,
          questionText: q.question,
          answerType: 'archetype' as const,
          archetypeAnswers: selected,
          answerTexts: selected.map((id) => q.options.find((o) => o.archetype === id)?.text ?? ''),
        };
      });
      const { saveQuizResults } = await import('@/lib/firestore');
      await saveQuizResults(preferences, questionResponses, userId);
    } catch (err) {
      console.error('Failed to save quiz to Firebase:', err);
    }

    setStep('profile-view');
  };

  const handleQuizNext = () => {
    if (quizIndex < personalityQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      advanceQuiz(quizAnswers);
    }
  };

  const handleQuizSkip = () => {
    const skipped = { ...quizAnswers, [quizIndex]: [] };
    if (quizIndex < personalityQuestions.length - 1) {
      setQuizAnswers(skipped);
      setQuizIndex(quizIndex + 1);
    } else {
      advanceQuiz(skipped);
    }
  };

  const handleEnterApp = () => {
    if (primaryArchetype) {
      localStorage.setItem(
        'flix_profile',
        JSON.stringify({ primaryArchetype, secondaryPreferences: secondaryArchetypes, visibility: 'team' })
      );
    }
    router.push('/training');
  };

  // ─── LOADING ─────────────────────────────────────────────────────────────
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin" />
      </div>
    );
  }

  // ─── WELCOME ─────────────────────────────────────────────────────────────
  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-14 pb-8 flex flex-col">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-flix-primary rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={18} className="text-white" />
            </div>
            <span className="font-semibold text-flix-grayscale-100 text-lg">Flix SE</span>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-flix-grayscale-100 leading-tight mb-3">
              Welcome to<br />
              <span className="text-flix-primary">Flix SE</span>
            </h1>
            <p className="text-[16px] text-flix-grayscale-70 leading-relaxed mb-10">
              Build a culture of appreciation, one interaction at a time.
            </p>

            <p className="text-[12px] font-semibold text-flix-grayscale-50 uppercase tracking-wider mb-4">What to expect</p>
            <div className="space-y-3 mb-10">
              {[
                { icon: 'Sparkles' as const, title: 'Bite-sized Training', desc: 'Learn the science of appreciation in minutes' },
                { icon: 'Wrench' as const, title: 'Practical Tools', desc: 'AI-powered tools to craft meaningful messages' },
                { icon: 'Bot' as const, title: 'Discover Your Style', desc: 'Find out how you and your team appreciate best' },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 bg-flix-background rounded-card p-4 shadow-card border border-flix-grayscale-20">
                  <div className="w-10 h-10 rounded-lg bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={20} className="text-flix-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-flix-grayscale-100 text-[14px]">{item.title}</p>
                    <p className="text-[13px] text-flix-grayscale-70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep('onboarding')}
            className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // ─── ONBOARDING SLIDES ────────────────────────────────────────────────────
  if (step === 'onboarding') {
    const slide = onboardingSlides[slideIndex];
    const isLast = slideIndex === onboardingSlides.length - 1;

    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-10 pb-8 flex flex-col">
          <div className="flex justify-center gap-2 mb-10">
            {onboardingSlides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-pill transition-all duration-300 ${
                  i === slideIndex ? 'w-8 bg-flix-primary' : 'w-2 bg-flix-grayscale-30'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-fade-in" key={slideIndex}>
            <div className="w-20 h-20 rounded-2xl bg-flix-primary/10 flex items-center justify-center mb-6">
              <Icon name={slide.icon} size={40} className="text-flix-primary" />
            </div>
            <p className="text-sm font-medium text-flix-primary mb-2">{slide.label}</p>
            <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-4 leading-tight">{slide.title}</h2>
            <p className="text-[15px] text-flix-grayscale-70 leading-relaxed max-w-[320px]">{slide.body}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                if (isLast) {
                  setStep('auth-choice');
                } else {
                  setSlideIndex(slideIndex + 1);
                }
              }}
              className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
            >
              {isLast ? 'Continue' : 'Next'}
            </button>
            {slideIndex > 0 ? (
              <button
                onClick={() => setSlideIndex(slideIndex - 1)}
                className="w-full py-3 text-flix-grayscale-70 font-medium text-[14px] hover:text-flix-grayscale-100 transition-colors"
              >
                Back
              </button>
            ) : (
              <button
                onClick={() => setStep('auth-choice')}
                className="w-full py-3 text-flix-grayscale-50 font-medium text-[14px] hover:text-flix-grayscale-70 transition-colors"
              >
                Skip intro
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTH CHOICE ──────────────────────────────────────────────────────────
  if (step === 'auth-choice') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-14 pb-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">
            Have an account?
          </h2>
          <p className="text-[15px] text-flix-grayscale-70 mb-10">
            Sign in or create a new Flix SE account to continue.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setStep('signup')}
              className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
            >
              Create Account
            </button>
            <button
              onClick={() => setStep('login')}
              className="w-full py-3.5 border border-flix-grayscale-30 bg-flix-background text-flix-grayscale-100 rounded-button font-semibold text-[15px] hover:bg-flix-grayscale-10 transition-colors active:scale-[0.98]"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── SIGN UP ──────────────────────────────────────────────────────────────
  if (step === 'signup') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="max-w-lg mx-auto w-full px-5 pt-10 pb-8">
          <button
            onClick={() => setStep('auth-choice')}
            className="flex items-center gap-1.5 text-flix-grayscale-70 text-[14px] font-medium mb-8 hover:text-flix-grayscale-100 transition-colors"
          >
            <Icon name="ChevronLeft" size={18} />
            Back
          </button>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-1 tracking-tight">Create Account</h2>
          <p className="text-[15px] text-flix-grayscale-70 mb-8">
            Join Flix SE and start building a culture of appreciation.
          </p>
          <form onSubmit={handleSignup} className="space-y-4">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
              { label: 'Work Email', key: 'email', type: 'email', placeholder: 'your@flix.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-[13px] font-medium text-flix-grayscale-90 mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 rounded-button border border-flix-grayscale-30 bg-flix-background text-flix-grayscale-100 placeholder-flix-grayscale-50 focus:border-flix-primary focus:outline-none focus:ring-1 focus:ring-flix-primary/30 text-[14px]"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={!form.name || !form.email || !form.password}
              className="w-full mt-2 py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── VERIFY EMAIL ─────────────────────────────────────────────────────────
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-14 pb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-flix-primary/10 flex items-center justify-center mb-6">
            <Icon name="Mail" size={32} className="text-flix-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-3 tracking-tight">Check your inbox</h2>
          <p className="text-[15px] text-flix-grayscale-70 leading-relaxed mb-1 max-w-[300px]">
            We sent a verification link to
          </p>
          <p className="text-[15px] font-semibold text-flix-grayscale-100 mb-10">{form.email}</p>
          <button
            onClick={() => setStep('account-created')}
            className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
          >
            I've verified my email
          </button>
          <button className="mt-3 text-[14px] text-flix-grayscale-50 hover:text-flix-grayscale-70 transition-colors">
            Resend email
          </button>
        </div>
      </div>
    );
  }

  // ─── LOG IN ───────────────────────────────────────────────────────────────
  if (step === 'login') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="max-w-lg mx-auto w-full px-5 pt-10 pb-8">
          <button
            onClick={() => setStep('auth-choice')}
            className="flex items-center gap-1.5 text-flix-grayscale-70 text-[14px] font-medium mb-8 hover:text-flix-grayscale-100 transition-colors"
          >
            <Icon name="ChevronLeft" size={18} />
            Back
          </button>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-1 tracking-tight">Log In</h2>
          <p className="text-[15px] text-flix-grayscale-70 mb-8">Welcome back to Flix SE.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            {[
              { label: 'Work Email', key: 'email', type: 'email', placeholder: 'your@flix.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-[13px] font-medium text-flix-grayscale-90 mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 rounded-button border border-flix-grayscale-30 bg-flix-background text-flix-grayscale-100 placeholder-flix-grayscale-50 focus:border-flix-primary focus:outline-none focus:ring-1 focus:ring-flix-primary/30 text-[14px]"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={!form.email || !form.password}
              className="w-full mt-2 py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── ACCOUNT CREATED ─────────────────────────────────────────────────────
  if (step === 'account-created') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-14 pb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-flix-feedback-success/10 flex items-center justify-center mb-6">
            <Icon name="Check" size={32} className="text-flix-feedback-success" />
          </div>
          <p className="text-sm font-medium text-flix-grayscale-50 mb-2">Account Created</p>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-3 tracking-tight">{"You're in!"}</h2>
          <p className="text-[15px] text-flix-grayscale-70 leading-relaxed mb-10 max-w-[280px]">
            {"Your account is ready. Let's take a quick tour of the platform."}
          </p>
          <button
            onClick={() => { setTutorialIndex(0); setStep('tutorial'); }}
            className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
          >
            Start Platform Tour
          </button>
        </div>
      </div>
    );
  }

  // ─── TUTORIAL ─────────────────────────────────────────────────────────────
  if (step === 'tutorial') {
    const isLastTutorial = tutorialIndex === 2;

    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-10 pb-8 flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-medium text-flix-primary mb-2">
              Step {tutorialIndex + 1} of 3 — Interactive Tutorial
            </p>
            <div className="h-1 bg-flix-grayscale-20 rounded-pill overflow-hidden">
              <div
                className="h-full bg-flix-primary rounded-pill transition-[width] duration-300"
                style={{ width: `${((tutorialIndex + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {tutorialIndex === 0 && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <h2 className="text-xl font-semibold text-flix-grayscale-100 mb-1 tracking-tight">
                {"Here's your Training section"}
              </h2>
              <p className="text-[14px] text-flix-grayscale-70 mb-5">
                Build appreciation skills with structured, bite-sized lessons.
              </p>
              <div className="space-y-2 flex-1">
                {trainingPreview.map((lesson, i) => (
                  <div key={i} className="bg-flix-background rounded-card p-4 border border-flix-grayscale-20 shadow-card flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Sparkles" size={18} className="text-flix-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-flix-grayscale-100 text-[14px] truncate">{lesson.title}</p>
                      <p className="text-[12px] text-flix-grayscale-50">{lesson.duration}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-flix-grayscale-30 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tutorialIndex === 1 && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <h2 className="text-xl font-semibold text-flix-grayscale-100 mb-1 tracking-tight">
                {"Here's your Toolbox"}
              </h2>
              <p className="text-[14px] text-flix-grayscale-70 mb-5">
                Practical AI-powered tools to help you appreciate colleagues effectively.
              </p>
              <div className="space-y-2 flex-1">
                {toolboxPreview.map((tool, i) => (
                  <div key={i} className="bg-flix-background rounded-card p-4 border border-flix-grayscale-20 shadow-card flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-flix-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={tool.icon} size={18} className="text-flix-secondary" />
                    </div>
                    <p className="font-semibold text-flix-grayscale-100 text-[14px] flex-1">{tool.title}</p>
                    <Icon name="ChevronRight" size={16} className="text-flix-grayscale-30 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tutorialIndex === 2 && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <h2 className="text-xl font-semibold text-flix-grayscale-100 mb-1 tracking-tight">
                {"Here's the Appreciator Test"}
              </h2>
              <p className="text-[14px] text-flix-grayscale-70 mb-5">
                Discover your appreciation style and get personalised insights.
              </p>
              <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card mb-3">
                <p className="text-[12px] font-medium text-flix-primary mb-3 uppercase tracking-wider">Sample Question</p>
                <p className="text-[15px] font-medium text-flix-grayscale-100 mb-4 leading-snug">
                  How often do you show appreciation to colleagues?
                </p>
                <div className="space-y-2">
                  {['Daily', 'Weekly', 'Monthly', 'Rarely'].map((opt, i) => (
                    <div
                      key={i}
                      className={`px-4 py-2.5 rounded-button text-[13px] font-medium border ${
                        i === 0
                          ? 'bg-flix-primary/10 border-flix-primary text-flix-grayscale-100'
                          : 'bg-flix-grayscale-10 border-transparent text-flix-grayscale-70'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-flix-primary/5 rounded-card p-4 border border-flix-primary/10">
                <p className="text-[13px] text-flix-grayscale-90 leading-relaxed">
                  <span className="font-medium">Get personalised insights</span> — Answer questions and discover exactly
                  how you appreciate and how others can appreciate you best.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3 mt-6">
            <button
              onClick={() => {
                if (isLastTutorial) {
                  setStep('tutorial-complete');
                } else {
                  setTutorialIndex(tutorialIndex + 1);
                }
              }}
              className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
            >
              {isLastTutorial ? 'Finish Tour' : 'Next'}
            </button>
            {tutorialIndex > 0 && (
              <button
                onClick={() => setTutorialIndex(tutorialIndex - 1)}
                className="w-full py-3 text-flix-grayscale-70 font-medium text-[14px] hover:text-flix-grayscale-100 transition-colors"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── TUTORIAL COMPLETE ──────────────────────────────���─────────────────────
  if (step === 'tutorial-complete') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-14 pb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-flix-primary/10 flex items-center justify-center mb-6">
            <Icon name="Sparkles" size={32} className="text-flix-primary" />
          </div>
          <p className="text-sm font-medium text-flix-grayscale-50 mb-2">Tutorial Complete</p>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-3 tracking-tight">Nice work!</h2>
          <p className="text-[15px] text-flix-grayscale-70 leading-relaxed mb-10 max-w-[300px]">
            Now let's discover your appreciation style so we can personalise your experience.
          </p>
          <button
            onClick={() => setStep('personality')}
            className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
          >
            Discover My Style
          </button>
        </div>
      </div>
    );
  }

  // ─── PERSONALITY TEST ─────────────────────────────────────────────────────
  if (step === 'personality') {
    const q = personalityQuestions[quizIndex];
    const progress = ((quizIndex + 1) / personalityQuestions.length) * 100;
    const currentSelections = quizAnswers[quizIndex] || [];
    const hasAnswer = currentSelections.length > 0;

    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-10 pb-8 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-flix-primary">Personality Test</p>
                <h2 className="text-[17px] font-semibold text-flix-grayscale-100 tracking-tight">
                  Discover your appreciation style
                </h2>
              </div>
              <span className="text-[13px] text-flix-grayscale-50 font-medium">
                {quizIndex + 1}/{personalityQuestions.length}
              </span>
            </div>
            <div className="h-1 bg-flix-grayscale-20 rounded-pill overflow-hidden">
              <div
                className="h-full bg-flix-primary rounded-pill transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div key={quizIndex} className="flex-1 flex flex-col animate-fade-in">
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-4">
              <p className="text-[12px] font-medium text-flix-primary mb-3 uppercase tracking-wider">
                Select all that apply
              </p>
              <h3 className="text-[16px] font-medium text-flix-grayscale-100 mb-5 leading-snug">
                {q.question}
              </h3>
              <div className="space-y-2">
                {q.options.map((option, idx) => {
                  const isSelected = currentSelections.includes(option.archetype);
                  return (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleQuizAnswer(option.archetype)}
                      onKeyDown={(e) => e.key === 'Enter' && toggleQuizAnswer(option.archetype)}
                      className={`flex items-center gap-3 p-4 rounded-card border transition-all duration-200 cursor-pointer active:scale-[0.995] ${
                        isSelected
                          ? 'border-flix-primary bg-flix-primary/10'
                          : 'border-flix-grayscale-20 bg-flix-grayscale-10 hover:border-flix-grayscale-30'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-flix-primary bg-flix-primary' : 'border-flix-grayscale-50'
                        }`}
                      >
                        {isSelected && <Icon name="Check" size={14} className="text-white" />}
                      </div>
                      <span className="text-[14px] font-medium text-flix-grayscale-100">{option.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleQuizSkip}
                className="flex-1 py-3 px-4 rounded-button border border-flix-grayscale-20 bg-flix-grayscale-10 hover:bg-flix-grayscale-20 text-flix-grayscale-70 font-medium transition-colors text-[14px] active:scale-[0.98]"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleQuizNext}
                disabled={!hasAnswer}
                className="flex-1 py-3 px-4 rounded-button bg-flix-primary text-white font-medium hover:bg-flix-ui-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px] active:scale-[0.98]"
              >
                {quizIndex < personalityQuestions.length - 1 ? 'Next' : 'See Results'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── PROFILE VIEW ─────────────────────────────────────────────────────────
  if (step === 'profile-view' && primaryArchetype) {
    const archetype = archetypes[primaryArchetype];

    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-10 pb-8 flex flex-col animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">Your Appreciation Profile</p>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-6 tracking-tight">
            Personalised Style Result
          </h2>

          <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-4">
            <p className="text-[11px] font-semibold text-flix-grayscale-50 uppercase tracking-wider mb-3">
              Your Primary Style
            </p>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={24} className="text-flix-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-flix-grayscale-100 mb-0.5">{archetype.name}</h3>
                <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">{archetype.description}</p>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">Preferred recognition</p>
              <div className="flex flex-wrap gap-2">
                {archetype.preferredRecognition.slice(0, 3).map((rec, i) => (
                  <span
                    key={i}
                    className="text-[12px] px-3 py-1 rounded-full bg-flix-primary/10 text-flix-grayscale-100 border border-flix-primary/20"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-flix-primary/5 rounded-card p-4 border border-flix-primary/10 mb-6">
            <p className="text-[13px] text-flix-grayscale-90 leading-relaxed">
              <span className="font-medium text-flix-grayscale-100">Your profile is ready.</span>{' '}
              {"We'll use this to personalise your experience and help colleagues appreciate you better."}
            </p>
          </div>

          <button
            onClick={() => setStep('profile-saved')}
            className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
          >
            Save Profile to Account
          </button>
        </div>
      </div>
    );
  }

  // ─── PROFILE SAVED ────────────────────────────────────────────────────────
  if (step === 'profile-saved') {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-14 pb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-flix-feedback-success/10 flex items-center justify-center mb-6">
            <Icon name="Check" size={32} className="text-flix-feedback-success" />
          </div>
          <p className="text-sm font-medium text-flix-grayscale-50 mb-2">Profile Saved to Account</p>
          <h2 className="text-2xl font-semibold text-flix-grayscale-100 mb-3 tracking-tight">{"You're all set!"}</h2>
          <p className="text-[15px] text-flix-grayscale-70 leading-relaxed mb-10 max-w-[280px]">
            Your appreciation profile has been saved. Time to start your journey.
          </p>
          <button
            onClick={handleEnterApp}
            className="w-full py-4 bg-flix-primary text-white rounded-button font-bold text-[16px] hover:bg-flix-ui-primary transition-colors shadow-card-hover active:scale-[0.98]"
          >
            Enter the App
          </button>
        </div>
      </div>
    );
  }

  return null;
}