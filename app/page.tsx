'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Icon } from '@/lib/icons';
import { archetypes, ArchetypeId, UserPreferences } from '@/lib/archetypes';

const PreferenceQuiz = dynamic(() => import('@/components/PreferenceQuiz'), {
  loading: () => (
    <div className="min-h-screen bg-flix-grayscale-10 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin" />
    </div>
  ),
});

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
    label: 'The foundation',
    title: "Appreciation isn't one-size-fits-all",
    body: 'People experience recognition very differently. What energises one colleague can feel uncomfortable for another. Understanding those differences is the first step to appreciation that actually lands.',
  },
  {
    icon: 'BarChart3' as const,
    label: 'The business case',
    title: 'Recognition drives real results',
    body: 'Teams with strong appreciation cultures show measurably higher engagement, lower attrition, and stronger collaboration. Getting this right is a leadership skill worth building deliberately.',
  },
  {
    icon: 'Sparkles' as const,
    label: 'Your platform',
    title: 'Built around your team',
    body: 'Discover your appreciation style, learn the science behind recognition, and use tools that help you acknowledge colleagues in ways that genuinely resonate with each of them.',
  },
];


const trainingPreview = [
  { title: 'What is Appreciation?', duration: '3 min' },
  { title: 'The 5 Appreciation Styles', duration: '5 min' },
  { title: 'Giving Appreciation That Sticks', duration: '4 min' },
];

const toolboxPreview = [
  { title: 'Appreciate a Teammate', icon: 'Heart' as const },
  { title: 'Channel Guide', icon: 'Smartphone' as const },
  { title: 'Timing Tips', icon: 'Clock' as const },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('loading');
  const [slideIndex, setSlideIndex] = useState(0);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
    const localPart = form.email.split('@')[0];
    const name = localPart.split(/[._-]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    localStorage.setItem('flix_user', JSON.stringify({ name, email: form.email }));
    setStep('account-created');
  };

  const handleOnboardingQuizComplete = (preferences: UserPreferences) => {
    setPrimaryArchetype(preferences.primaryArchetype);
    setSecondaryArchetypes(preferences.secondaryPreferences);
    setStep('profile-view');
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
                { icon: 'Sparkles' as const, title: 'Structured Learning', desc: 'Four lessons on the science and practice of meaningful recognition' },
                { icon: 'Wrench' as const, title: 'Appreciation Toolkit', desc: 'AI-guided tools for crafting recognition tailored to each colleague' },
                { icon: 'Bot' as const, title: 'Your Appreciation Style', desc: 'A short quiz to discover which of the 5 styles best describes how you give and receive recognition' },
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
            {"In a live environment, a verification link would be sent to"}
          </p>
          <p className="text-[15px] font-semibold text-flix-grayscale-100 mb-2">{form.email}</p>
          <p className="text-[13px] text-flix-grayscale-40 italic mb-10 max-w-[280px]">
            This is a prototype — press the button below to continue.
          </p>
          <button
            onClick={() => setStep('account-created')}
            className="w-full py-3.5 bg-flix-primary text-white rounded-button font-semibold text-[15px] hover:bg-flix-ui-primary transition-colors active:scale-[0.98]"
          >
            Continue to Account
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
                Four focused lessons on when, why, and how recognition works — and how to make it count for each individual.
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
                AI-powered tools that adapt to each colleague&apos;s appreciation style — helping you craft the right message, through the right channel, at the right moment.
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
                A short scenario-based questionnaire that reveals how you currently give appreciation — and where you can strengthen your approach.
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
            Now let&apos;s discover your appreciation style so we can personalise your experience.
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
    return (
      <div className="min-h-screen bg-flix-grayscale-10 flex flex-col">
        <div className="flex-1 max-w-lg mx-auto w-full px-5 pt-10 pb-8 flex flex-col">
          <div className="mb-4">
            <p className="text-sm font-medium text-flix-primary mb-1">Personality Test</p>
            <h2 className="text-[17px] font-semibold text-flix-grayscale-100 tracking-tight mb-1">
              Discover your appreciation style
            </h2>
            <p className="text-[14px] text-flix-grayscale-70">Answer a few questions to find your recognition preferences.</p>
          </div>
          <PreferenceQuiz onComplete={handleOnboardingQuizComplete} />
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