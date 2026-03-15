'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import ColleagueSelector from '@/components/ColleagueSelector';
import { User, archetypes } from '@/lib/archetypes';
import type { AppreciationGuidance } from '@/lib/ai';

type Relationship = 'peer' | 'manager' | 'cross-team';
type Occasion = 'achievement' | 'support' | 'milestone' | 'general';
type Platform = 'slack' | 'linkedin' | 'email' | 'copy';
type Step = 'select' | 'configure' | 'tips' | 'compose' | 'send-choice' | 'platform' | 'sent';

const occasionMessageTemplates: Record<Occasion, string> = {
  achievement: `I just wanted to take a moment to recognise the incredible work you've been doing. Your achievement speaks for itself — it's the result of real dedication and effort, and the whole team has noticed.`,
  support: `Thank you so much for the support you've shown. It genuinely made a difference to me, and I want you to know how much I appreciate you taking the time.`,
  milestone: `Reaching this milestone is a big deal, and I wanted to make sure you heard it directly — I'm really proud of what you've accomplished. All the hard work has led to this moment.`,
  general: `I wanted to take a moment to say thank you. The energy and care you bring every day doesn't go unnoticed — you make this team a better place to be.`,
};

const platformConfig: { id: Platform; label: string; description: string; icon: string; action: string }[] = [
  { id: 'slack', label: 'Microsoft Teams', description: 'Teams or similar workspace tool', icon: 'MessageSquare', action: 'Open Teams' },
  { id: 'linkedin', label: 'Professional Network', description: 'LinkedIn or similar', icon: 'ExternalLink', action: 'Open LinkedIn' },
  { id: 'email', label: 'Email', description: 'Send via email client', icon: 'Mail', action: 'Open Email' },
  { id: 'copy', label: 'Copy to Clipboard', description: 'Paste anywhere you like', icon: 'Copy', action: 'Copy Message' },
];

export default function AppreciateColleaguePage() {
  const router = useRouter();
  const [selectedColleague, setSelectedColleague] = useState<User | null>(null);
  const [relationship, setRelationship] = useState<Relationship>('peer');
  const [occasion, setOccasion] = useState<Occasion>('general');
  const [step, setStep] = useState<Step>('select');
  const [message, setMessage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [guidance, setGuidance] = useState<AppreciationGuidance | null>(null);
  const [guidanceLoading, setGuidanceLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) {
      router.replace('/');
    }
  }, [router]);

  const loadGuidance = useCallback(async () => {
    if (!selectedColleague?.preferences) return;
    const archetype = archetypes[selectedColleague.preferences.primaryArchetype];
    if (!archetype) return;

    setGuidanceLoading(true);
    try {
      const response = await fetch('/api/appreciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archetypeId: archetype.id, relationship, occasion }),
      });
      if (!response.ok) throw new Error('Failed');
      setGuidance(await response.json());
    } catch {
      setGuidance({
        approach: archetype.do[0] || `Recognise ${selectedColleague.name} in a way that feels natural to them.`,
        shortMessage: archetype.suggestedPhrases[0] || '',
        longMessage: archetype.suggestedPhrases[archetype.suggestedPhrases.length - 1] || '',
        tone: 'Warm and genuine',
        avoid: archetype.dont[0] || 'Avoid generic or impersonal recognition.',
      });
    } finally {
      setGuidanceLoading(false);
    }
  }, [selectedColleague, relationship, occasion]);

  const handleSelectColleague = (user: User) => {
    setSelectedColleague(user);
    setStep('configure');
  };

  const handleContinueToTips = () => {
    if (selectedColleague) {
      setGuidance(null);
      setStep('tips');
      loadGuidance();
    }
  };

  const handleComposeMessage = () => {
    const name = selectedColleague?.name.split(' ')[0] ?? '';
    const template = occasionMessageTemplates[occasion];
    setMessage(name ? `${name}, ${template.charAt(0).toLowerCase()}${template.slice(1)}` : template);
    setStep('compose');
  };

  const handlePlatformAction = (platform: Platform) => {
    setSelectedPlatform(platform);
    if (platform === 'copy') {
      navigator.clipboard.writeText(message).catch(() => {});
      setStep('sent');
    } else if (platform === 'email') {
      const subject = encodeURIComponent(`A note of appreciation`);
      const body = encodeURIComponent(message);
      window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
      setStep('sent');
    } else if (platform === 'linkedin') {
      window.open('https://www.linkedin.com/messaging/', '_blank');
      setStep('sent');
    } else if (platform === 'slack') {
      window.open('https://teams.microsoft.com', '_blank');
      setStep('sent');
    }
  };

  const reset = () => {
    setSelectedColleague(null);
    setRelationship('peer');
    setOccasion('general');
    setStep('select');
    setMessage('');
    setSelectedPlatform(null);
    setGuidance(null);
  };

  const archetype = selectedColleague?.preferences
    ? archetypes[selectedColleague.preferences.primaryArchetype]
    : null;

  const backButton = (target: Step) => (
    <button
      onClick={() => setStep(target)}
      className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors"
    >
      <Icon name="ChevronLeft" size={16} />
      Back
    </button>
  );

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />
      <main className="max-w-lg mx-auto px-5 py-8">

        {/* ── Select colleague ── */}
        {step === 'select' && (
          <div className="animate-fade-in">
            <Link href="/toolbox" className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
              <Icon name="ChevronLeft" size={16} />
              Toolbox
            </Link>
            <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Appreciate a Teammate</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Select a colleague to get started</p>
            <ColleagueSelector onSelect={handleSelectColleague} selectedUserId={selectedColleague?.id} />
          </div>
        )}

        {/* ── Configure ── */}
        {step === 'configure' && selectedColleague && (
          <div className="animate-fade-in">
            {backButton('select')}
            <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Appreciate a Teammate</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Tell us a bit more about the situation</p>

            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-flix-grayscale-10">
                <div className="w-10 h-10 rounded-full bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={20} className="text-flix-primary" />
                </div>
                <div>
                  <p className="font-semibold text-flix-grayscale-100 text-[15px]">{selectedColleague.name}</p>
                  <p className="text-[13px] text-flix-grayscale-50">{selectedColleague.role ?? 'Colleague'}</p>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-flix-grayscale-70 mb-2">Your relationship</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['peer', 'manager', 'cross-team'] as Relationship[]).map((rel) => (
                    <button
                      key={rel}
                      onClick={() => setRelationship(rel)}
                      className={`py-2.5 rounded-button text-[13px] font-medium transition-all border ${
                        relationship === rel
                          ? 'bg-flix-primary/10 border-flix-primary text-flix-primary'
                          : 'bg-flix-grayscale-10 border-transparent text-flix-grayscale-90 hover:border-flix-grayscale-30'
                      }`}
                    >
                      {rel === 'peer' ? 'Peer' : rel === 'manager' ? 'Manager' : 'Cross-team'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-flix-grayscale-70 mb-2">Occasion</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['achievement', 'support', 'milestone', 'general'] as Occasion[]).map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      className={`py-2.5 rounded-button text-[13px] font-medium transition-all border capitalize ${
                        occasion === occ
                          ? 'bg-flix-primary/10 border-flix-primary text-flix-primary'
                          : 'bg-flix-grayscale-10 border-transparent text-flix-grayscale-90 hover:border-flix-grayscale-30'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleContinueToTips}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                Get Personalised Tips
              </button>
            </div>
          </div>
        )}

        {/* ── Tips ── */}
        {step === 'tips' && selectedColleague && (
          <div className="animate-fade-in">
            {backButton('configure')}

            {/* Recipient hero */}
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={24} className="text-flix-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-flix-grayscale-100 text-[16px]">{selectedColleague.name}</p>
                  <p className="text-[13px] text-flix-grayscale-50 capitalize">{occasion} · {relationship.replace('-', ' ')}</p>
                </div>
                {archetype && (
                  <span className="text-[12px] font-semibold px-2.5 py-1 rounded-button bg-flix-primary/10 text-flix-primary flex-shrink-0">
                    {archetype.name}
                  </span>
                )}
              </div>
              {archetype && (
                <p className="mt-3 text-[13px] text-flix-grayscale-70 leading-relaxed border-t border-flix-grayscale-10 pt-3">
                  {archetype.description}
                </p>
              )}
            </div>

            {/* Compose CTA — visible immediately */}
            <button
              onClick={handleComposeMessage}
              className="w-full py-3 bg-flix-primary text-white rounded-button font-semibold hover:bg-flix-ui-primary transition-colors text-[14px] flex items-center justify-center gap-2 mb-5"
            >
              <Icon name="Send" size={16} />
              Compose & Send Message
            </button>

            {/* Guidance insights */}
            {guidanceLoading ? (
              <div className="py-10 text-center">
                <div className="w-8 h-8 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin mx-auto mb-3" />
                <p className="text-[13px] text-flix-grayscale-50">Personalising tips…</p>
              </div>
            ) : guidance ? (
              <div className="space-y-3 animate-fade-in">
                <p className="text-[12px] font-semibold text-flix-grayscale-50 uppercase tracking-wider mb-3">How to appreciate them</p>

                <div className="bg-flix-background rounded-card border border-flix-grayscale-20 shadow-card overflow-hidden">
                  {[
                    { icon: 'Lightbulb', label: 'Best approach', content: guidance.approach, iconClass: 'text-flix-primary', bg: 'bg-flix-primary/5' },
                    { icon: 'Sparkles', label: 'Tone to use', content: guidance.tone, iconClass: 'text-flix-feedback-success', bg: 'bg-flix-feedback-success/5' },
                    { icon: 'X', label: 'What to avoid', content: guidance.avoid, iconClass: 'text-flix-feedback-warning', bg: 'bg-flix-feedback-warning/5' },
                  ].map((item, i, arr) => (
                    <div
                      key={item.label}
                      className={`flex gap-3 p-4 ${i < arr.length - 1 ? 'border-b border-flix-grayscale-10' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon name={item.icon} size={15} className={item.iconClass} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-flix-grayscale-50 uppercase tracking-wide mb-0.5">{item.label}</p>
                        <p className="text-[14px] text-flix-grayscale-90 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {archetype && (
                  <div className="bg-flix-background rounded-card border border-flix-grayscale-20 shadow-card p-4">
                    <p className="text-[11px] font-semibold text-flix-grayscale-50 uppercase tracking-wide mb-2">Best channels</p>
                    <div className="flex flex-wrap gap-1.5">
                      {archetype.suggestedChannels.map((ch, idx) => (
                        <span key={idx} className="text-[12px] px-2.5 py-1 rounded-button bg-flix-grayscale-10 text-flix-grayscale-90 border border-flix-grayscale-20">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !archetype ? (
              <div className="p-4 rounded-card bg-flix-feedback-warning/5 border border-flix-feedback-warning/10">
                <p className="text-[14px] text-flix-grayscale-90">
                  This teammate hasn&apos;t set their appreciation preferences yet — use your best judgement to personalise your message.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* ── Compose ── */}
        {step === 'compose' && selectedColleague && (
          <div className="animate-fade-in">
            {backButton('tips')}
            <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Your Message</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Review and edit before sending</p>

            <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card mb-5">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                className="w-full text-[15px] text-flix-grayscale-90 leading-relaxed bg-transparent resize-none focus:outline-none"
              />
            </div>

            <button
              onClick={() => setStep('send-choice')}
              disabled={!message.trim()}
              className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Send" size={16} />
              Send This Message
            </button>
          </div>
        )}

        {/* ── Send Choice ── */}
        {step === 'send-choice' && (
          <div className="animate-fade-in">
            {backButton('compose')}
            <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">How to Send?</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Choose how you&apos;d like to deliver your appreciation</p>

            <div className="space-y-3">
              <button
                onClick={() => setStep('platform')}
                className="w-full bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card hover:shadow-card-hover hover:border-flix-grayscale-30 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="ExternalLink" size={22} className="text-flix-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-flix-grayscale-100 text-[15px] mb-0.5">Use External Platform</p>
                    <p className="text-[13px] text-flix-grayscale-70">Teams, LinkedIn, Email, or copy to clipboard</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-flix-grayscale-30 group-hover:text-flix-grayscale-50 transition-colors flex-shrink-0" />
                </div>
              </button>

              <button
                onClick={() => { setSelectedPlatform(null); setStep('sent'); }}
                className="w-full bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card hover:shadow-card-hover hover:border-flix-grayscale-30 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-flix-feedback-success/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Send" size={22} className="text-flix-feedback-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-flix-grayscale-100 text-[15px] mb-0.5">Log as Sent</p>
                    <p className="text-[13px] text-flix-grayscale-70">Record that you sent it outside the app</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-flix-grayscale-30 group-hover:text-flix-grayscale-50 transition-colors flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ── Platform Choice ── */}
        {step === 'platform' && (
          <div className="animate-fade-in">
            {backButton('send-choice')}
            <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Choose Platform</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Where would you like to send your message?</p>

            <div className="bg-flix-background rounded-card border border-flix-grayscale-20 shadow-card mb-5 overflow-hidden">
              <p className="px-4 pt-4 pb-2 text-[12px] font-semibold text-flix-grayscale-50 uppercase tracking-wide">Your message</p>
              <p className="px-4 pb-4 text-[14px] text-flix-grayscale-90 leading-relaxed line-clamp-3">{message}</p>
            </div>

            <div className="space-y-3">
              {platformConfig.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformAction(platform.id)}
                  className="w-full bg-flix-background rounded-card p-4 border border-flix-grayscale-20 shadow-card hover:shadow-card-hover hover:border-flix-grayscale-30 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={platform.icon} size={22} className="text-flix-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-flix-grayscale-100 text-[15px] mb-0.5">{platform.label}</p>
                      <p className="text-[13px] text-flix-grayscale-70">{platform.description}</p>
                    </div>
                    <span className="text-[13px] font-medium text-flix-primary flex-shrink-0">{platform.action}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Sent ── */}
        {step === 'sent' && (
          <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 rounded-full bg-flix-feedback-success/10 flex items-center justify-center mb-6">
              <Icon name="Check" size={32} className="text-flix-feedback-success" />
            </div>
            <p className="text-sm font-medium text-flix-primary mb-1">
              {selectedPlatform === 'copy' ? 'Copied!' : 'Appreciation Sent'}
            </p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-3 tracking-tight">
              {selectedPlatform === 'copy' ? 'Ready to Paste' : 'Well Done!'}
            </h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-10 max-w-xs leading-relaxed">
              {selectedPlatform === 'copy'
                ? 'Your message is in the clipboard — paste it wherever you like.'
                : selectedPlatform
                ? `Your message is ready to send via ${platformConfig.find(p => p.id === selectedPlatform)?.label}.`
                : 'Logged! Keep the appreciation flowing — it adds up over time.'}
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={reset}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                Appreciate Someone Else
              </button>
              <Link href="/toolbox" className="block w-full py-3 bg-flix-grayscale-10 text-flix-grayscale-70 rounded-button font-medium hover:bg-flix-grayscale-20 transition-colors text-[14px] text-center">
                Back to Toolbox
              </Link>
            </div>
          </div>
        )}

      </main>
      <BottomNav />
    </div>
  );
}