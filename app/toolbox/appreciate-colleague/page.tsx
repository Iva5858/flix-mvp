'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
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
    if (selectedColleague) {
      setStep('tips');
    }
  };

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/toolbox" className="text-flix-primary hover:underline text-sm mb-2 inline-block">
            ← Back to Toolbox
          </Link>
          <h1 className="text-3xl font-bold text-flix-grayscale-100 mb-2">
            💝 Appreciate a Colleague
          </h1>
          <p className="text-flix-grayscale-70">
            Get personalized tips for showing appreciation
          </p>
        </div>

        {step === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ColleagueSelector
              onSelect={handleSelectColleague}
              selectedUserId={selectedColleague?.id}
            />
          </motion.div>
        )}

        {step === 'configure' && selectedColleague && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-4 bg-flix-background rounded-card border border-flix-grayscale-30">
              <h3 className="font-bold text-flix-grayscale-100 mb-4">
                Selected: {selectedColleague.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-flix-grayscale-90 mb-2">
                    Your Relationship
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['peer', 'manager', 'cross-team'] as Relationship[]).map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setRelationship(rel)}
                        className={`px-3 py-2 rounded-button text-sm font-medium transition-colors ${
                          relationship === rel
                            ? 'bg-flix-primary text-white'
                            : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-30'
                        }`}
                      >
                        {rel === 'peer' ? 'Peer' : rel === 'manager' ? 'Manager' : 'Cross-team'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-flix-grayscale-90 mb-2">
                    Occasion
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['achievement', 'support', 'milestone', 'general'] as Occasion[]).map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setOccasion(occ)}
                        className={`px-3 py-2 rounded-button text-sm font-medium transition-colors capitalize ${
                          occasion === occ
                            ? 'bg-flix-primary text-white'
                            : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-30'
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
                className="mt-6 w-full py-3 bg-flix-primary text-white rounded-button font-semibold hover:bg-flix-ui-primary transition-colors"
              >
                Get Personalized Tips →
              </button>
            </div>
          </motion.div>
        )}

        {step === 'tips' && selectedColleague && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AppreciationTips
              recipient={selectedColleague}
              relationship={relationship}
              occasion={occasion}
            />
          </motion.div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

