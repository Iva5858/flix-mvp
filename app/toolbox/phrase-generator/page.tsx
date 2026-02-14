'use client';

import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';

export default function PhraseGeneratorPage() {
  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/toolbox" className="text-[14px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors mb-2 inline-block">
            Back to Toolbox
          </Link>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight flex items-center gap-2">
            <Icon name="Sparkles" size={28} className="text-flix-primary" />
            Phrase Generator
          </h1>
          <p className="text-flix-grayscale-70">
            Generate appreciation messages (Coming soon)
          </p>
        </div>

        <div className="bg-flix-background rounded-card p-6 border border-flix-grayscale-20 animate-fade-in">
          <p className="text-flix-grayscale-70">
            This feature will help you generate personalized appreciation phrases based on context and recipient preferences.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

