'use client';

import { motion } from 'framer-motion';
import { AppreciationArchetype, User } from '@/lib/archetypes';
import { AppreciationGuidance } from '@/lib/ai';
import { useState, useEffect } from 'react';

interface AppreciationTipsProps {
  recipient: User;
  relationship: 'peer' | 'manager' | 'cross-team';
  occasion: 'achievement' | 'support' | 'milestone' | 'general';
}

export default function AppreciationTips({ recipient, relationship, occasion }: AppreciationTipsProps) {
  const [guidance, setGuidance] = useState<AppreciationGuidance | null>(null);
  const [loading, setLoading] = useState(false);

  const archetype = recipient.preferences
    ? require('@/lib/archetypes').archetypes[recipient.preferences.primaryArchetype]
    : null;

  useEffect(() => {
    if (archetype) {
      loadGuidance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archetype, relationship, occasion]);

  async function loadGuidance() {
    if (!archetype) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/appreciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: archetype.id,
          relationship,
          occasion,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch guidance');
      }

      const result = await response.json();
      setGuidance(result);
    } catch (error) {
      console.error('Error loading guidance:', error);
      // Fallback to archetype defaults
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
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (!archetype) {
    return (
      <div className="p-4 bg-flix-feedback-warning/10 rounded-card border border-flix-feedback-warning/20">
        <p className="text-sm text-flix-grayscale-90">
          This colleague hasn&apos;t set their appreciation preferences yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Archetype Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-flix-ui-primary/10 rounded-card border border-flix-ui-primary/20"
      >
        <div className="flex items-start gap-3 mb-3">
          <div>
            <h3 className="font-bold text-flix-grayscale-100 mb-1">
              {recipient.name} prefers {archetype.name}
            </h3>
            <p className="text-sm text-flix-grayscale-70">{archetype.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Guidance */}
      {loading ? (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-flix-primary"></div>
          <p className="mt-2 text-sm text-flix-grayscale-70">Generating personalized guidance...</p>
        </div>
      ) : guidance ? (
        <div className="space-y-4">
          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-flix-background rounded-card border border-flix-grayscale-30"
          >
            <h4 className="font-bold text-flix-grayscale-100 mb-2">Best Approach</h4>
            <p className="text-sm text-flix-grayscale-90">{guidance.approach}</p>
          </motion.div>

          {/* Suggested Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <div className="p-4 bg-flix-background rounded-card border border-flix-grayscale-30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-flix-grayscale-100">Short Message</h4>
                <button
                  onClick={() => copyToClipboard(guidance.shortMessage)}
                  className="text-xs px-2 py-1 bg-flix-grayscale-10 rounded-button hover:bg-flix-grayscale-30 text-flix-grayscale-70"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-flix-grayscale-90">{guidance.shortMessage}</p>
            </div>

            <div className="p-4 bg-flix-background rounded-card border border-flix-grayscale-30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-flix-grayscale-100">Long Message</h4>
                <button
                  onClick={() => copyToClipboard(guidance.longMessage)}
                  className="text-xs px-2 py-1 bg-flix-grayscale-10 rounded-button hover:bg-flix-grayscale-30 text-flix-grayscale-70"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-flix-grayscale-90">{guidance.longMessage}</p>
            </div>
          </motion.div>

          {/* Tone & Avoid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-3"
          >
            <div className="p-4 bg-flix-feedback-success/10 rounded-card border border-flix-feedback-success/20">
              <h4 className="font-bold text-flix-grayscale-100 mb-1 text-sm">Recommended Tone</h4>
              <p className="text-sm text-flix-grayscale-90">{guidance.tone}</p>
            </div>

            <div className="p-4 bg-flix-feedback-warning/10 rounded-card border border-flix-feedback-warning/20">
              <h4 className="font-bold text-flix-grayscale-100 mb-1 text-sm">What to Avoid</h4>
              <p className="text-sm text-flix-grayscale-90">{guidance.avoid}</p>
            </div>
          </motion.div>

          {/* Suggested Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-flix-background rounded-card border border-flix-grayscale-30"
          >
            <h4 className="font-bold text-flix-grayscale-100 mb-2">Suggested Channels</h4>
            <div className="flex flex-wrap gap-2">
              {archetype.suggestedChannels.map((channel: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-flix-primary/10 text-flix-ui-primary border border-flix-primary/20"
                >
                  {channel}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}

