'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { archetypes, ArchetypeId } from '@/lib/archetypes';

type ArchetypeFilter = ArchetypeId | 'all';

const archetypeOrder: ArchetypeId[] = [
  'spotlight-seeker',
  'quiet-achiever',
  'word-collector',
  'reward-enthusiast',
  'growth-chaser',
];

const channelIcons: Record<string, string> = {
  'Team meetings and all-hands': 'User',
  'Company newsletters or internal blogs': 'FileText',
  'Public Slack/Teams channels': 'MessageSquare',
  'Awards ceremonies or recognition rituals': 'Star',
  '1:1 meetings': 'User',
  'Direct messages (chat tools)': 'MessageSquare',
  'Private email': 'Mail',
  'Handwritten or physical notes': 'Hand',
  'Email or long-form messages': 'Mail',
  'Performance notes or feedback documents': 'FileText',
  'Written shoutouts in documentation or team pages': 'FileText',
  'Thank-you cards or written notes': 'Hand',
  'In-person celebrations or handovers': 'PartyPopper',
  'Gift cards or digital vouchers': 'Star',
  'Company perk systems': 'Target',
  'Team events or shared experiences': 'PartyPopper',
  'Career-focused 1:1 conversations': 'User',
  'Development plans and growth check-ins': 'Target',
  'Mentorship or sponsorship programs': 'Sparkles',
  'Learning platforms and training budgets': 'Lightbulb',
};

const defaultChannelIcon = 'MessageSquare';

const archetypeAccent: Record<ArchetypeId, string> = {
  'spotlight-seeker': 'bg-flix-feedback-warning/10 border-flix-feedback-warning/20 text-flix-feedback-warning',
  'quiet-achiever': 'bg-flix-feedback-info/10 border-flix-feedback-info/20 text-flix-feedback-info',
  'word-collector': 'bg-flix-primary/10 border-flix-primary/20 text-flix-primary',
  'reward-enthusiast': 'bg-flix-secondary/10 border-flix-secondary/20 text-flix-secondary',
  'growth-chaser': 'bg-flix-feedback-success/10 border-flix-feedback-success/20 text-flix-feedback-success',
};

const archetypeBadge: Record<ArchetypeId, string> = {
  'spotlight-seeker': 'bg-flix-feedback-warning/10 text-flix-feedback-warning',
  'quiet-achiever': 'bg-flix-feedback-info/10 text-flix-feedback-info',
  'word-collector': 'bg-flix-primary/10 text-flix-primary',
  'reward-enthusiast': 'bg-flix-secondary/10 text-flix-secondary',
  'growth-chaser': 'bg-flix-feedback-success/10 text-flix-feedback-success',
};

export default function ChannelGuidePage() {
  const router = useRouter();
  const [filter, setFilter] = useState<ArchetypeFilter>('all');

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) {
      router.replace('/');
    }
  }, [router]);

  const visibleArchetypes = filter === 'all'
    ? archetypeOrder
    : archetypeOrder.filter((id) => id === filter);

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
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Channel Guide</h1>
          <p className="text-[15px] text-flix-grayscale-70 mb-6 leading-relaxed">
            Match the right channel to each appreciation style for maximum impact.
          </p>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-button text-[13px] font-medium transition-all border ${
                filter === 'all'
                  ? 'bg-flix-grayscale-100 text-white border-flix-grayscale-100'
                  : 'bg-flix-background border-flix-grayscale-20 text-flix-grayscale-70 hover:border-flix-grayscale-30'
              }`}
            >
              All styles
            </button>
            {archetypeOrder.map((id) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-3 py-1.5 rounded-button text-[13px] font-medium transition-all border ${
                  filter === id
                    ? `${archetypeBadge[id]} border-transparent`
                    : 'bg-flix-background border-flix-grayscale-20 text-flix-grayscale-70 hover:border-flix-grayscale-30'
                }`}
              >
                {archetypes[id].name}
              </button>
            ))}
          </div>

          {/* Archetype channel cards */}
          <div className="space-y-4">
            {visibleArchetypes.map((id) => {
              const archetype = archetypes[id];
              const accent = archetypeAccent[id];
              return (
                <div key={id} className={`rounded-card border p-5 ${accent}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Appreciation style</span>
                  </div>
                  <h3 className="text-[17px] font-semibold mb-0.5">{archetype.name}</h3>
                  <p className="text-[13px] opacity-70 leading-relaxed mb-4">{archetype.description}</p>

                  <div className="space-y-2">
                    {archetype.suggestedChannels.map((channel, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white/40 rounded-button px-3 py-2.5"
                      >
                        <Icon
                          name={channelIcons[channel] ?? defaultChannelIcon}
                          size={15}
                          className="flex-shrink-0 opacity-70"
                        />
                        <span className="text-[13px] font-medium">{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Default guidance */}
          <div className="mt-6 p-4 rounded-card bg-flix-background border border-flix-grayscale-20 shadow-card">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-flix-grayscale-10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Lightbulb" size={15} className="text-flix-primary" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-flix-grayscale-100 mb-1">Don&apos;t know their style yet?</p>
                <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">
                  Default to a private, written message. It works across almost all styles and gives the person something they can revisit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}