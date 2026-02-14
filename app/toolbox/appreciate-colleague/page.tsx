'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import ColleagueSelector from '@/components/ColleagueSelector';
import AppreciationTips from '@/components/AppreciationTips';
import { User } from '@/lib/archetypes';

type Relationship = 'peer' | 'manager' | 'cross-team';
type Occasion = 'achievement' | 'support' | 'milestone' | 'general';

export default function AppreciateColleaguePage() {
  const [selectedColleague, setSelectedColleague] = useState<User | null>(null);
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
      <TopBar />
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="mb-8">
          <Link href="/toolbox" className="text-[14px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors mb-2 inline-block">
            Back to Toolbox
          </Link>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight flex items-center gap-2">
            <Icon name="Heart" size={28} className="text-flix-primary" />
            Appreciate a Colleague
          </h1>
          <p className="text-[15px] text-flix-grayscale-70">
            Get personalized tips for showing appreciation
          </p>
        </div>

        {step === 'select' && (
          <div className="animate-fade-in">
            <ColleagueSelector onSelect={handleSelectColleague} selectedUserId={selectedColleague?.id} />
          </div>
        )}

        {step === 'configure' && selectedColleague && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
              <h3 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">
                Selected: {selectedColleague.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-flix-grayscale-70 mb-2 uppercase tracking-wider">Your Relationship</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['peer', 'manager', 'cross-team'] as Relationship[]).map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setRelationship(rel)}
                        className={`px-3 py-2 rounded-button text-[13px] font-medium transition-colors ${
                          relationship === rel ? 'bg-flix-primary text-white' : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-20'
                        }`}
                      >
                        {rel === 'peer' ? 'Peer' : rel === 'manager' ? 'Manager' : 'Cross-team'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-flix-grayscale-70 mb-2 uppercase tracking-wider">Occasion</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['achievement', 'support', 'milestone', 'general'] as Occasion[]).map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setOccasion(occ)}
                        className={`px-3 py-2 rounded-button text-[13px] font-medium transition-colors capitalize ${
                          occasion === occ ? 'bg-flix-primary text-white' : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-20'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="mt-6 w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                Get Personalized Tips
              </button>
            </div>
          </div>
        )}

        {step === 'tips' && selectedColleague && (
          <div className="animate-fade-in">
            <AppreciationTips recipient={selectedColleague} relationship={relationship} occasion={occasion} />
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
