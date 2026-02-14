'use client';

import { archetypes, User } from '@/lib/archetypes';
import type { AppreciationGuidance } from '@/lib/ai';
import { useState, useEffect, useCallback } from 'react';

interface AppreciationTipsProps {
  recipient: User;
  relationship: 'peer' | 'manager' | 'cross-team';
  occasion: 'achievement' | 'support' | 'milestone' | 'general';
}

export default function AppreciationTips({ recipient, relationship, occasion }: AppreciationTipsProps) {
  const [guidance, setGuidance] = useState<AppreciationGuidance | null>(null);
  const [loading, setLoading] = useState(false);

  const archetype = recipient.preferences
    ? archetypes[recipient.preferences.primaryArchetype]
    : null;

  const loadGuidance = useCallback(async () => {
    if (!archetype) return;
    setLoading(true);
    try {
      const response = await fetch('/api/appreciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archetypeId: archetype.id, relationship, occasion }),
      });
      if (!response.ok) throw new Error('Failed to fetch guidance');
      const result = await response.json();
      setGuidance(result);
    } catch (error) {
      console.error('Error loading guidance:', error);
      setGuidance({
        approach: `This person prefers ${archetype.name.toLowerCase()}. ${archetype.description}`,
        shortMessage: archetype.suggestedPhrases[0] || 'Thank you for your contribution!',
        longMessage: archetype.suggestedPhrases[archetype.suggestedPhrases.length - 1] || 'I wanted to express my appreciation for your work.',
        tone: 'Warm and genuine',
        avoid: archetype.dont[0] || 'Avoid generic recognition',
      });
    } finally {
      setLoading(false);
    }
  }, [archetype, relationship, occasion]);

  useEffect(() => {
    if (archetype) loadGuidance();
  }, [archetype, loadGuidance]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!archetype) {
    return (
      <div className="p-4 rounded-card bg-flix-feedback-warning/5 border border-flix-feedback-warning/10">
        <p className="text-[14px] text-flix-grayscale-90">
          This colleague hasn&apos;t set their appreciation preferences yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-card bg-flix-primary/5 border border-flix-primary/10 animate-fade-in">
        <h3 className="font-semibold text-flix-grayscale-100 text-[15px] mb-1">
          {recipient.name} prefers {archetype.name}
        </h3>
        <p className="text-[14px] text-flix-grayscale-70 leading-relaxed">{archetype.description}</p>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[14px] text-flix-grayscale-70">Generating personalized guidance...</p>
        </div>
      ) : guidance ? (
        <div className="space-y-4">
          {[
            { title: 'Best Approach', content: guidance.approach },
            { title: 'Short Message', content: guidance.shortMessage, copy: true },
            { title: 'Long Message', content: guidance.longMessage, copy: true },
          ].map((block) => (
            <div
              key={block.title}
              className="p-4 rounded-card bg-flix-background shadow-card border border-flix-grayscale-20 animate-fade-in"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-flix-grayscale-100">{block.title}</h4>
                {block.copy && (
                  <button
                    onClick={() => copyToClipboard(block.content)}
                    className="text-[12px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors"
                  >
                    Copy
                  </button>
                )}
              </div>
              <p className="text-[14px] text-flix-grayscale-90 leading-relaxed">{block.content}</p>
            </div>
          ))}

          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 rounded-card bg-flix-feedback-success/5 border border-flix-feedback-success/10">
              <h4 className="text-[12px] font-semibold text-flix-grayscale-90 mb-1 uppercase tracking-wider">Recommended Tone</h4>
              <p className="text-[14px] text-flix-grayscale-90">{guidance.tone}</p>
            </div>
            <div className="p-4 rounded-card bg-flix-feedback-warning/5 border border-flix-feedback-warning/10">
              <h4 className="text-[12px] font-semibold text-flix-grayscale-90 mb-1 uppercase tracking-wider">What to Avoid</h4>
              <p className="text-[14px] text-flix-grayscale-90">{guidance.avoid}</p>
            </div>
          </div>

          <div className="p-4 rounded-card bg-flix-background shadow-card border border-flix-grayscale-20">
            <h4 className="text-sm font-semibold text-flix-grayscale-100 mb-2">Suggested Channels</h4>
            <div className="flex flex-wrap gap-1.5">
              {archetype.suggestedChannels.map((channel: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[12px] px-2.5 py-1 rounded-button bg-flix-primary/10 text-flix-grayscale-90"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
