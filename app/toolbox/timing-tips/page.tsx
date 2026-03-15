'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { archetypes, ArchetypeId } from '@/lib/archetypes';

const principles = [
  {
    icon: 'Clock',
    title: 'Appreciate within 24 hours',
    body: 'The emotional impact of appreciation fades fast. A message sent the same day a win happens lands three times harder than one sent a week later.',
    accent: 'bg-flix-primary/5 border-flix-primary/10',
    iconClass: 'text-flix-primary bg-flix-primary/10',
  },
  {
    icon: 'Target',
    title: 'Make it a habit, not an event',
    body: 'Appreciation that only appears at performance reviews signals obligation, not genuine recognition. Build a weekly rhythm — even a short note counts.',
    accent: 'bg-flix-feedback-success/5 border-flix-feedback-success/10',
    iconClass: 'text-flix-feedback-success bg-flix-feedback-success/10',
  },
  {
    icon: 'BarChart3',
    title: 'Match the size of the moment',
    body: 'A small consistent behaviour deserves a quick, warm acknowledgement. A major achievement deserves dedicated time and space. Don\'t over- or under-index.',
    accent: 'bg-flix-secondary/5 border-flix-secondary/10',
    iconClass: 'text-flix-secondary bg-flix-secondary/10',
  },
  {
    icon: 'Waves',
    title: 'Avoid high-stress moments',
    body: 'Appreciation delivered during a crisis or high-pressure sprint can feel performative or even tone-deaf. Wait for a calm moment — it will land better.',
    accent: 'bg-flix-feedback-warning/5 border-flix-feedback-warning/10',
    iconClass: 'text-flix-feedback-warning bg-flix-feedback-warning/10',
  },
  {
    icon: 'Heart',
    title: "Don't save it for the review cycle",
    body: "Annual or quarterly reviews are not the right moment for first-time appreciation. By then it feels like a formality. Say it when it happens.",
    accent: 'bg-flix-feedback-info/5 border-flix-feedback-info/10',
    iconClass: 'text-flix-feedback-info bg-flix-feedback-info/10',
  },
];

const scenarios = [
  { trigger: 'After a win or milestone', timing: 'Same day — ideally within hours', icon: 'PartyPopper' },
  { trigger: 'End of a project', timing: 'Within the first week of completion', icon: 'Check' },
  { trigger: 'Regular, ongoing effort', timing: 'Monthly — set a recurring reminder', icon: 'Clock' },
  { trigger: 'Behind-the-scenes work', timing: 'At the next 1:1 or quiet moment', icon: 'User' },
  { trigger: 'Peer supporting you', timing: 'The same day, or by end of week at the latest', icon: 'Heart' },
  { trigger: 'New team member settling in', timing: 'At the end of their first month', icon: 'Sparkles' },
];

const archetypeOrder: ArchetypeId[] = [
  'spotlight-seeker',
  'quiet-achiever',
  'word-collector',
  'reward-enthusiast',
  'growth-chaser',
];

const archetypeTiming: Record<ArchetypeId, string> = {
  'spotlight-seeker': 'At the next team meeting or all-hands — public moments amplify their recognition.',
  'quiet-achiever': 'In a private message or 1:1, away from the crowd — the same day if possible.',
  'word-collector': 'In a written message within 24–48 hours, so the words are thoughtful and they can keep them.',
  'reward-enthusiast': 'Plan a small celebration or tangible gesture soon after the achievement — tie it to the moment.',
  'growth-chaser': 'Connect appreciation to a forward-looking conversation at their next career check-in.',
};

const archetypeBadge: Record<ArchetypeId, string> = {
  'spotlight-seeker': 'bg-flix-feedback-warning/10 text-flix-feedback-warning',
  'quiet-achiever': 'bg-flix-feedback-info/10 text-flix-feedback-info',
  'word-collector': 'bg-flix-primary/10 text-flix-primary',
  'reward-enthusiast': 'bg-flix-secondary/10 text-flix-secondary',
  'growth-chaser': 'bg-flix-feedback-success/10 text-flix-feedback-success',
};

type Tab = 'principles' | 'scenarios' | 'by-style';

export default function TimingTipsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('principles');

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />

      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <Link href="/toolbox" className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
            <Icon name="ChevronLeft" size={16} />
            Toolbox
          </Link>

          <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Timing Tips</h1>
          <p className="text-[15px] text-flix-grayscale-70 mb-6 leading-relaxed">
            When you appreciate matters almost as much as how. Use this guide to get the timing right.
          </p>

          {/* Tabs */}
          <div className="flex gap-1 bg-flix-grayscale-20 p-1 rounded-button mb-6">
            {([
              { key: 'principles', label: 'Principles' },
              { key: 'scenarios', label: 'Scenarios' },
              { key: 'by-style', label: 'By Style' },
            ] as { key: Tab; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-2 rounded-button text-[13px] font-medium transition-all ${
                  activeTab === key
                    ? 'bg-flix-background text-flix-grayscale-100 shadow-soft'
                    : 'text-flix-grayscale-50 hover:text-flix-grayscale-70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Principles */}
          {activeTab === 'principles' && (
            <div className="space-y-3 animate-fade-in">
              {principles.map((p) => (
                <div key={p.title} className={`rounded-card border p-4 ${p.accent}`}>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${p.iconClass}`}>
                      <Icon name={p.icon} size={15} />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-flix-grayscale-100 mb-1">{p.title}</p>
                      <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scenarios */}
          {activeTab === 'scenarios' && (
            <div className="animate-fade-in">
              <div className="bg-flix-background rounded-card border border-flix-grayscale-20 shadow-card overflow-hidden">
                {scenarios.map((s, i) => (
                  <div
                    key={s.trigger}
                    className={`flex items-start gap-4 p-4 ${i < scenarios.length - 1 ? 'border-b border-flix-grayscale-10' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-flix-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={s.icon} size={15} className="text-flix-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-flix-grayscale-100 mb-0.5">{s.trigger}</p>
                      <p className="text-[13px] text-flix-grayscale-70">{s.timing}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-card bg-flix-primary/5 border border-flix-primary/10">
                <p className="text-[13px] text-flix-grayscale-90 leading-relaxed">
                  <span className="font-medium text-flix-grayscale-100">When in doubt:</span>{' '}
                  sooner is almost always better. The longer you wait, the more it starts to feel like an obligation.
                </p>
              </div>
            </div>
          )}

          {/* By style */}
          {activeTab === 'by-style' && (
            <div className="space-y-3 animate-fade-in">
              {archetypeOrder.map((id) => (
                <div key={id} className="bg-flix-background rounded-card border border-flix-grayscale-20 shadow-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-button ${archetypeBadge[id]}`}>
                      {archetypes[id].name}
                    </span>
                  </div>
                  <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">{archetypeTiming[id]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}