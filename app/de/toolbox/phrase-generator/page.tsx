'use client';

import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { getTranslations } from '@/lib/i18n';

export default function DePhraseGeneratorPage() {
  const t = getTranslations('de');

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar locale="de" />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/de/toolbox" className="text-[14px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors mb-2 inline-block">
            {t.toolbox.backToToolbox}
          </Link>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight flex items-center gap-2">
            <Icon name="Sparkles" size={28} className="text-flix-primary" />
            {t.toolbox.phraseGenerator}
          </h1>
          <p className="text-flix-grayscale-70">
            {t.toolbox.phraseGeneratorComingSoon}
          </p>
        </div>

        <div className="bg-flix-background rounded-card p-6 border border-flix-grayscale-20 animate-fade-in">
          <p className="text-flix-grayscale-70">
            {t.toolbox.phraseGeneratorFeature}
          </p>
        </div>
      </main>

      <BottomNav locale="de" />
    </div>
  );
}
