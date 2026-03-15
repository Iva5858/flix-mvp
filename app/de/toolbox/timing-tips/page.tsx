'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { archetypesDe } from '@/lib/archetypes-de';
import { ArchetypeId } from '@/lib/archetypes';

const principles = [
  {
    icon: 'Clock',
    title: 'Innerhalb von 24 Stunden wertschätzen',
    body: 'Die emotionale Wirkung von Wertschätzung lässt schnell nach. Eine Nachricht, die am selben Tag eines Erfolgs gesendet wird, ist dreimal wirkungsvoller als eine, die eine Woche später kommt.',
    accent: 'bg-flix-primary/5 border-flix-primary/10',
    iconClass: 'text-flix-primary bg-flix-primary/10',
  },
  {
    icon: 'Target',
    title: 'Zur Gewohnheit machen, nicht zum Ereignis',
    body: 'Wertschätzung, die nur bei Leistungsbeurteilungen erscheint, signalisiert Verpflichtung, keine echte Anerkennung. Einen wöchentlichen Rhythmus aufbauen — selbst eine kurze Notiz zählt.',
    accent: 'bg-flix-feedback-success/5 border-flix-feedback-success/10',
    iconClass: 'text-flix-feedback-success bg-flix-feedback-success/10',
  },
  {
    icon: 'BarChart3',
    title: 'Zur Größe des Moments passen',
    body: 'Ein kleines, konstantes Verhalten verdient eine kurze, herzliche Anerkennung. Eine große Leistung verdient dedizierte Zeit und Raum. Nicht über- oder untertreiben.',
    accent: 'bg-flix-secondary/5 border-flix-secondary/10',
    iconClass: 'text-flix-secondary bg-flix-secondary/10',
  },
  {
    icon: 'Waves',
    title: 'Stressige Momente vermeiden',
    body: 'Wertschätzung in einer Krise oder unter hohem Druck kann aufgesetzt oder unpassend wirken. Einen ruhigen Moment abwarten — die Botschaft landet dann besser.',
    accent: 'bg-flix-feedback-warning/5 border-flix-feedback-warning/10',
    iconClass: 'text-flix-feedback-warning bg-flix-feedback-warning/10',
  },
  {
    icon: 'Heart',
    title: 'Nicht für die Beurteilung aufsparen',
    body: 'Jahres- oder Quartalsbeurteilungen sind nicht der richtige Moment für erstmalige Wertschätzung. Bis dahin fühlt sie sich wie eine Formalität an. Im Moment sagen, wenn es passiert.',
    accent: 'bg-flix-feedback-info/5 border-flix-feedback-info/10',
    iconClass: 'text-flix-feedback-info bg-flix-feedback-info/10',
  },
];

const scenarios = [
  { trigger: 'Nach einem Erfolg oder Meilenstein', timing: 'Selber Tag — idealerweise innerhalb von Stunden', icon: 'PartyPopper' },
  { trigger: 'Ende eines Projekts', timing: 'Innerhalb der ersten Woche nach Abschluss', icon: 'Check' },
  { trigger: 'Regelmäßiger, anhaltender Einsatz', timing: 'Monatlich — eine wiederkehrende Erinnerung setzen', icon: 'Clock' },
  { trigger: 'Arbeit hinter den Kulissen', timing: 'Beim nächsten 1:1 oder ruhigen Moment', icon: 'User' },
  { trigger: 'Kollege unterstützt mich', timing: 'Am selben Tag oder spätestens bis Ende der Woche', icon: 'Heart' },
  { trigger: 'Neues Teammitglied gewöhnt sich ein', timing: 'Am Ende des ersten Monats', icon: 'Sparkles' },
];

const archetypeOrder: ArchetypeId[] = [
  'spotlight-seeker',
  'quiet-achiever',
  'word-collector',
  'reward-enthusiast',
  'growth-chaser',
];

const archetypeTiming: Record<ArchetypeId, string> = {
  'spotlight-seeker': 'Bei der nächsten Teambesprechung oder All-Hands — öffentliche Momente verstärken ihre Anerkennung.',
  'quiet-achiever': 'In einer privaten Nachricht oder 1:1, abseits der Masse — möglichst noch am selben Tag.',
  'word-collector': 'In einer schriftlichen Nachricht innerhalb von 24–48 Stunden, damit die Worte durchdacht sind und die Person sie behalten kann.',
  'reward-enthusiast': 'Eine kleine Feier oder greifbare Geste kurz nach dem Erfolg planen — den Moment damit verknüpfen.',
  'growth-chaser': 'Wertschätzung mit einem zukunftsorientierten Gespräch beim nächsten Karriere-Check-in verbinden.',
};

const archetypeBadge: Record<ArchetypeId, string> = {
  'spotlight-seeker': 'bg-flix-feedback-warning/10 text-flix-feedback-warning',
  'quiet-achiever': 'bg-flix-feedback-info/10 text-flix-feedback-info',
  'word-collector': 'bg-flix-primary/10 text-flix-primary',
  'reward-enthusiast': 'bg-flix-secondary/10 text-flix-secondary',
  'growth-chaser': 'bg-flix-feedback-success/10 text-flix-feedback-success',
};

type Tab = 'principles' | 'scenarios' | 'by-style';

export default function DeTimingTipsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('principles');

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar locale="de" />

      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <Link href="/de/toolbox" className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors">
            <Icon name="ChevronLeft" size={16} />
            Toolbox
          </Link>

          <p className="text-sm font-medium text-flix-primary mb-1">Toolbox</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Timing-Tipps</h1>
          <p className="text-[15px] text-flix-grayscale-70 mb-6 leading-relaxed">
            Wann du wertschätzt, ist fast so wichtig wie wie. Dieser Leitfaden hilft dir, den richtigen Moment zu treffen.
          </p>

          {/* Tabs */}
          <div className="flex gap-1 bg-flix-grayscale-20 p-1 rounded-button mb-6">
            {([
              { key: 'principles', label: 'Grundsätze' },
              { key: 'scenarios', label: 'Szenarien' },
              { key: 'by-style', label: 'Nach Stil' },
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
                  <div key={s.trigger} className={`flex items-start gap-4 p-4 ${i < scenarios.length - 1 ? 'border-b border-flix-grayscale-10' : ''}`}>
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
                  <span className="font-medium text-flix-grayscale-100">Im Zweifelsfall:</span>{' '}
                  früher ist fast immer besser. Je länger man wartet, desto mehr fühlt es sich wie eine Verpflichtung an.
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
                      {archetypesDe[id].name}
                    </span>
                  </div>
                  <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">{archetypeTiming[id]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav locale="de" />
    </div>
  );
}