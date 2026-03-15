'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { getTranslations } from '@/lib/i18n';

const toolboxTools = (t: ReturnType<typeof getTranslations>['toolbox']) => [
  {
    id: 'appreciate-colleague',
    title: t.appreciateColleague,
    description: 'Personalisierte Tipps, Nachrichtengestaltung und Zustellung',
    icon: 'Heart' as const,
    accentColor: 'text-flix-primary',
    bgColor: 'bg-flix-primary/10',
    href: '/de/toolbox/appreciate-colleague',
  },
  {
    id: 'channel-guide',
    title: t.channelGuide,
    description: 'Den richtigen Kanal für jeden Wertschätzungsstil finden',
    icon: 'Smartphone' as const,
    accentColor: 'text-flix-feedback-info',
    bgColor: 'bg-flix-feedback-info/10',
    href: '/de/toolbox/channel-guide',
  },
  {
    id: 'timing-tips',
    title: t.timingTips,
    description: 'Wann du wertschätzt, für maximale Wirkung',
    icon: 'Clock' as const,
    accentColor: 'text-flix-feedback-success',
    bgColor: 'bg-flix-feedback-success/10',
    href: '/de/toolbox/timing-tips',
  },
];

export default function DeToolboxPage() {
  const t = getTranslations('de');
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar locale="de" />
      
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">{t.toolbox.sectionLabel}</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">
            {t.toolbox.title}
          </h1>
          <p className="text-flix-grayscale-70 text-[15px] leading-relaxed mb-8">
            {t.toolbox.subtitle}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {toolboxTools(t.toolbox).map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <div className="group bg-flix-background rounded-card p-4 shadow-card hover:shadow-card-hover transition-all duration-200 border border-flix-grayscale-20 hover:border-flix-grayscale-30">
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-11 h-11 rounded-lg ${tool.bgColor} flex items-center justify-center`}>
                        <Icon name={tool.icon} size={22} className={tool.accentColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-flix-grayscale-100 text-[15px] mb-0.5">{tool.title}</h3>
                        <p className="text-[13px] text-flix-grayscale-70">{tool.description}</p>
                      </div>
                      <Icon name="ChevronRight" size={18} className="text-flix-grayscale-30 flex-shrink-0 group-hover:text-flix-grayscale-50 transition-colors" />
                    </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-card bg-flix-primary/5 border border-flix-primary/10">
            <p className="text-[13px] text-flix-grayscale-90 leading-relaxed">
              <span className="font-medium text-flix-grayscale-100 inline-flex items-center gap-1.5">
                <Icon name="Lightbulb" size={14} className="text-flix-primary" />
                {t.toolbox.proTip}
              </span>
              {' — '}{t.toolbox.proTipText}
            </p>
          </div>
        </div>
      </main>

      <BottomNav locale="de" />
    </div>
  );
}
