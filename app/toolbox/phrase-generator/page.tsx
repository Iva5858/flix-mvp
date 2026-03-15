'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';

type Step = 'compose' | 'review' | 'send-choice' | 'platform' | 'sent';

type Tone = 'warm' | 'professional' | 'fun' | 'brief';
type Platform = 'slack' | 'linkedin' | 'email' | 'copy';

const toneLabels: Record<Tone, string> = {
  warm: 'Warm & Heartfelt',
  professional: 'Professional',
  fun: 'Fun & Upbeat',
  brief: 'Short & Sweet',
};

const occasionTemplates: Record<string, Record<Tone, string>> = {
  'Great work': {
    warm: `I just wanted to take a moment to say — the work you've been doing is truly remarkable. Your dedication and heart really show, and it makes such a difference to everyone around you.`,
    professional: `I'd like to formally recognize your excellent contributions. Your work has consistently exceeded expectations and reflects great professionalism.`,
    fun: `Ok, can we just talk about how AMAZING your work has been lately?! Seriously, you're crushing it and the whole team notices!`,
    brief: `Just wanted to say — great work. It really shows and it matters.`,
  },
  'Helped me out': {
    warm: `Thank you so much for helping me out. It genuinely made my day easier and I really appreciate that you took the time — it means more than you know.`,
    professional: `I wanted to express my sincere appreciation for your assistance. Your support was timely and made a tangible impact on my ability to deliver.`,
    fun: `You are an absolute lifesaver! Thank you for jumping in when I needed it — seriously, you're the best!`,
    brief: `Thanks so much for the help — really saved me. Appreciate it!`,
  },
  'Milestone achieved': {
    warm: `Reaching this milestone is such a big deal, and I want you to know how proud I am of you. All the hard work you've put in has led to this moment.`,
    professional: `Congratulations on achieving this important milestone. It reflects your sustained effort and commitment, and I wanted to make sure that was acknowledged.`,
    fun: `WE DID IT — well, YOU did it! This milestone is huge and you deserve every bit of recognition coming your way!`,
    brief: `Congrats on the milestone! Well earned.`,
  },
  'Going above and beyond': {
    warm: `I've noticed how much extra you've been putting in, and I want you to know it doesn't go unnoticed. You go above and beyond without being asked, and that's a rare and wonderful quality.`,
    professional: `I want to acknowledge the extra effort you've invested beyond your core responsibilities. It demonstrates exceptional commitment and initiative.`,
    fun: `You didn't have to do all that — but you did anyway, and wow, you totally blew it out of the water! You're on another level!`,
    brief: `You went above and beyond — noticed and very much appreciated.`,
  },
  'Team support': {
    warm: `The way you show up for the team is something I genuinely admire. You make our environment warmer and our work better just by being part of it.`,
    professional: `I'd like to recognize your ongoing support of the team. Your collaborative approach and reliable presence contribute significantly to our collective success.`,
    fun: `Teamwork makes the dream work and YOU are the glue holding this dream together! Thanks for always being there for us!`,
    brief: `Your support for the team is noticed — thank you.`,
  },
};

const occasions = Object.keys(occasionTemplates);
const tones: Tone[] = ['warm', 'professional', 'fun', 'brief'];

const platformConfig: { id: Platform; label: string; description: string; icon: string; action: string }[] = [
  { id: 'slack', label: 'Work Messaging', description: 'Slack, Teams, or similar', icon: 'MessageSquare', action: 'Open Slack' },
  { id: 'linkedin', label: 'Professional Network', description: 'LinkedIn or similar', icon: 'ExternalLink', action: 'Open LinkedIn' },
  { id: 'email', label: 'Email', description: 'Send via email client', icon: 'Mail', action: 'Open Email' },
  { id: 'copy', label: 'Copy to Clipboard', description: 'Paste anywhere you like', icon: 'Copy', action: 'Copy Message' },
];

export default function PhraseGeneratorPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('compose');
  const [recipientName, setRecipientName] = useState('');
  const [occasion, setOccasion] = useState(occasions[0]);
  const [tone, setTone] = useState<Tone>('warm');
  const [message, setMessage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) {
      router.replace('/');
    }
  }, [router]);

  const generateMessage = () => {
    const template = occasionTemplates[occasion]?.[tone] ?? '';
    const name = recipientName.trim() || 'you';
    return template.replace(/^I /, `${name.split(' ')[0]}, I `);
  };

  const handleCompose = () => {
    const generated = generateMessage();
    setMessage(generated);
    setStep('review');
  };

  const handlePlatformAction = (platform: Platform) => {
    setSelectedPlatform(platform);
    if (platform === 'copy') {
      navigator.clipboard.writeText(message).catch(() => {});
      setStep('sent');
    } else if (platform === 'email') {
      const name = recipientName.trim() || '';
      const subject = encodeURIComponent(`Recognition: ${occasion}`);
      const body = encodeURIComponent(message);
      window.open(`mailto:${name}?subject=${subject}&body=${body}`, '_blank');
      setStep('sent');
    } else if (platform === 'linkedin') {
      window.open('https://www.linkedin.com/messaging/', '_blank');
      setStep('sent');
    } else if (platform === 'slack') {
      window.open('https://slack.com', '_blank');
      setStep('sent');
    }
  };

  const reset = () => {
    setStep('compose');
    setRecipientName('');
    setOccasion(occasions[0]);
    setTone('warm');
    setMessage('');
    setSelectedPlatform(null);
  };

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />

      <main className="max-w-lg mx-auto px-5 py-8">
        {/* Compose */}
        {step === 'compose' && (
          <div className="animate-fade-in">
            <Link href="/toolbox" className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
              <Icon name="ChevronLeft" size={16} />
              Toolbox
            </Link>
            <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Phrase Generator</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Compose a personalised appreciation message</p>

            <div className="space-y-5">
              <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-flix-grayscale-70 mb-1.5">Recipient name <span className="text-flix-grayscale-40 font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Sarah"
                    className="w-full px-4 py-3 rounded-button bg-flix-grayscale-10 border border-flix-grayscale-20 text-[14px] text-flix-grayscale-100 placeholder-flix-grayscale-40 focus:outline-none focus:border-flix-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-flix-grayscale-70 mb-1.5">Occasion</label>
                  <div className="grid grid-cols-1 gap-2">
                    {occasions.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setOccasion(o)}
                        className={`w-full text-left px-4 py-2.5 rounded-button text-[14px] font-medium border transition-all ${
                          occasion === o
                            ? 'bg-flix-primary/10 border-flix-primary text-flix-primary'
                            : 'bg-flix-grayscale-10 border-transparent text-flix-grayscale-90 hover:border-flix-grayscale-30'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-flix-grayscale-70 mb-1.5">Tone</label>
                  <div className="grid grid-cols-2 gap-2">
                    {tones.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={`px-3 py-2.5 rounded-button text-[13px] font-medium border transition-all ${
                          tone === t
                            ? 'bg-flix-primary/10 border-flix-primary text-flix-primary'
                            : 'bg-flix-grayscale-10 border-transparent text-flix-grayscale-90 hover:border-flix-grayscale-30'
                        }`}
                      >
                        {toneLabels[t]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCompose}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px] flex items-center justify-center gap-2"
              >
                <Icon name="Sparkles" size={16} />
                Generate Message
              </button>
            </div>
          </div>
        )}

        {/* Review */}
        {step === 'review' && (
          <div className="animate-fade-in">
            <button onClick={() => setStep('compose')} className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
              <Icon name="ChevronLeft" size={16} />
              Back
            </button>
            <p className="text-sm font-medium text-flix-primary mb-1">Phrase Generator</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Your Message</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Review and edit before sending</p>

            <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card mb-5">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full text-[15px] text-flix-grayscale-90 leading-relaxed bg-transparent resize-none focus:outline-none"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setStep('send-choice')}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px] flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={16} />
                Send This Message
              </button>
              <button
                onClick={() => setStep('compose')}
                className="w-full py-3 bg-flix-grayscale-10 text-flix-grayscale-70 rounded-button font-medium hover:bg-flix-grayscale-20 transition-colors text-[14px]"
              >
                Regenerate
              </button>
            </div>
          </div>
        )}

        {/* Send Choice */}
        {step === 'send-choice' && (
          <div className="animate-fade-in">
            <button onClick={() => setStep('review')} className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
              <Icon name="ChevronLeft" size={16} />
              Back
            </button>
            <p className="text-sm font-medium text-flix-primary mb-1">Phrase Generator</p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">How to Send?</h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">Choose how you'd like to deliver your appreciation</p>

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
                    <p className="text-[13px] text-flix-grayscale-70">Slack, LinkedIn, Email, or copy to clipboard</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-flix-grayscale-30 group-hover:text-flix-grayscale-50 transition-colors flex-shrink-0" />
                </div>
              </button>

              <button
                onClick={() => setStep('sent')}
                className="w-full bg-flix-background rounded-card p-5 border border-flix-grayscale-20 shadow-card hover:shadow-card-hover hover:border-flix-grayscale-30 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-flix-feedback-success/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Send" size={22} className="text-flix-feedback-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-flix-grayscale-100 text-[15px] mb-0.5">Send Directly</p>
                    <p className="text-[13px] text-flix-grayscale-70">Mark as sent within the app</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-flix-grayscale-30 group-hover:text-flix-grayscale-50 transition-colors flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Platform Choice */}
        {step === 'platform' && (
          <div className="animate-fade-in">
            <button onClick={() => setStep('send-choice')} className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
              <Icon name="ChevronLeft" size={16} />
              Back
            </button>
            <p className="text-sm font-medium text-flix-primary mb-1">Phrase Generator</p>
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

        {/* Sent */}
        {step === 'sent' && (
          <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 rounded-full bg-flix-feedback-success/10 flex items-center justify-center mb-6">
              <Icon name="Check" size={32} className="text-flix-feedback-success" />
            </div>
            <p className="text-sm font-medium text-flix-primary mb-1">
              {selectedPlatform === 'copy' ? 'Copied!' : 'Message Sent'}
            </p>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-3 tracking-tight">
              {selectedPlatform === 'copy' ? 'Ready to Paste' : 'Appreciation Delivered'}
            </h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-10 max-w-xs leading-relaxed">
              {selectedPlatform === 'copy'
                ? 'Your message is in the clipboard — paste it wherever you like.'
                : selectedPlatform
                ? `Your message is ready to send via ${platformConfig.find(p => p.id === selectedPlatform)?.label}.`
                : 'Your appreciation has been recorded. Keep spreading positivity!'}
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={reset}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                Generate Another Message
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