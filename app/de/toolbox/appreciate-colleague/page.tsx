'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import ColleagueSelector from '@/components/ColleagueSelector';
import AppreciationTips from '@/components/AppreciationTips';
import { User } from '@/lib/archetypes';
import { getTranslations } from '@/lib/i18n';

type Relationship = 'peer' | 'manager' | 'cross-team';
type Occasion = 'achievement' | 'support' | 'milestone' | 'general';

const relationshipLabels: Record<Relationship, string> = {
  peer: 'Kollege',
  manager: 'Vorgesetzter',
  'cross-team': 'Teamübergreifend',
};

const occasionLabels: Record<Occasion, string> = {
  achievement: 'Erfolg',
  support: 'Unterstützung',
  milestone: 'Meilenstein',
  general: 'Allgemein',
};

export default function DeAppreciateColleaguePage() {
  const t = getTranslations('de');
  const router = useRouter();
  const [selectedColleague, setSelectedColleague] = useState<User | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) router.replace('/');
  }, [router]);
  const [relationship, setRelationship] = useState<Relationship>('peer');
  const [occasion, setOccasion] = useState<Occasion>('general');
  const [step, setStep] = useState<'select' | 'configure' | 'tips'>('select');

  const handleSelectColleague = (user: User) => {
    setSelectedColleague(user);
    setStep('configure');
  };

  const handleContinue = () => {
    if (selectedColleague) setStep('tips');
  };

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar locale="de" />
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="mb-8">
          <Link href="/de/toolbox" className="text-[14px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors mb-2 inline-block">
            {t.toolbox.backToToolbox}
          </Link>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight flex items-center gap-2">
            <Icon name="Heart" size={28} className="text-flix-primary" />
            {t.toolbox.appreciateColleague}
          </h1>
          <p className="text-[15px] text-flix-grayscale-70">
            {t.toolbox.appreciateColleagueDesc}
          </p>
        </div>

        {step === 'select' && (
          <div className="animate-fade-in">
            <ColleagueSelector onSelect={handleSelectColleague} selectedUserId={selectedColleague?.id} locale="de" />
          </div>
        )}

        {step === 'configure' && selectedColleague && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
              <h3 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">
                {t.toolbox.selected}: {selectedColleague.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-flix-grayscale-70 mb-2 uppercase tracking-wider">{t.toolbox.yourRelationship}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['peer', 'manager', 'cross-team'] as Relationship[]).map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setRelationship(rel)}
                        className={`px-3 py-2 rounded-button text-[13px] font-medium transition-colors ${
                          relationship === rel ? 'bg-flix-primary text-white' : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-20'
                        }`}
                      >
                        {relationshipLabels[rel]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-flix-grayscale-70 mb-2 uppercase tracking-wider">{t.toolbox.occasion}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['achievement', 'support', 'milestone', 'general'] as Occasion[]).map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setOccasion(occ)}
                        className={`px-3 py-2 rounded-button text-[13px] font-medium transition-colors ${
                          occasion === occ ? 'bg-flix-primary text-white' : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-20'
                        }`}
                      >
                        {occasionLabels[occ]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="mt-6 w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                {t.toolbox.getPersonalizedTips}
              </button>
            </div>
          </div>
        )}

        {step === 'tips' && selectedColleague && (
          <div className="animate-fade-in">
            <AppreciationTips recipient={selectedColleague} relationship={relationship} occasion={occasion} locale="de" />
          </div>
        )}
      </main>
      <BottomNav locale="de" />
    </div>
  );
}
