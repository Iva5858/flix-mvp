'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import ArchetypeCard from '@/components/ArchetypeCard';
import { UserPreferences, ArchetypeId } from '@/lib/archetypes';
import { archetypesDe } from '@/lib/archetypes-de';
import { Icon } from '@/lib/icons';
import { getTranslations } from '@/lib/i18n';

const PreferenceQuiz = dynamic(() => import('@/components/PreferenceQuiz'), {
  loading: () => (
    <div className="rounded-card border border-flix-grayscale-20 bg-flix-grayscale-10 p-8 text-center">
      <div className="h-6 w-6 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin mx-auto mb-3" />
      <p className="text-[14px] text-flix-grayscale-70">Quiz wird geladen...</p>
    </div>
  ),
});

const mockUser = {
  id: 'current-user',
  name: 'Du',
  role: 'Mitarbeiter',
  department: 'Alle Teams',
  preferences: {
    primaryArchetype: 'growth-chaser' as ArchetypeId,
    secondaryPreferences: ['word-collector'] as ArchetypeId[],
    visibility: 'team' as const,
  },
};

export default function DeProfilePage() {
  const t = getTranslations('de');
  const [showQuiz, setShowQuiz] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(mockUser.preferences);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleQuizComplete = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    setShowQuiz(false);
    setShowPreferences(true);
  };

  const primaryArchetype = preferences ? archetypesDe[preferences.primaryArchetype] : null;

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar locale="de" />
      
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">{t.profile.sectionLabel}</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-8 tracking-tight">
            {t.profile.title}
          </h1>

          {showQuiz ? (
            <PreferenceQuiz
              onComplete={handleQuizComplete}
              initialPreferences={preferences || undefined}
              locale="de"
            />
          ) : showPreferences && preferences && primaryArchetype ? (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
                <h2 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">{t.profile.yourInformation}</h2>
                <div className="space-y-3">
                  {[
                    { label: t.profile.name, value: mockUser.name },
                    { label: t.profile.role, value: mockUser.role },
                    { label: t.profile.department, value: mockUser.department },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1">
                      <span className="text-[13px] text-flix-grayscale-70">{label}</span>
                      <span className="text-[14px] font-medium text-flix-grayscale-100">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-flix-grayscale-90 uppercase tracking-wider">{t.profile.appreciationPreferences}</h2>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="text-[13px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors"
                  >
                    {t.profile.edit}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">{t.profile.primaryStyle}</p>
                    <ArchetypeCard archetype={primaryArchetype} size="medium" locale="de" />
                  </div>

                  {preferences.secondaryPreferences.length > 0 && (
                    <div>
                      <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">{t.profile.secondary}</p>
                      <div className="space-y-2">
                        {preferences.secondaryPreferences.map((id) => (
                          <ArchetypeCard key={id} archetype={archetypesDe[id]} size="small" locale="de" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">{t.profile.visibility}</p>
                    <div className="flex gap-2">
                      {(['public', 'team', 'private'] as const).map((vis) => (
                        <button
                          key={vis}
                          className={`px-3 py-1.5 rounded-button text-[13px] font-medium capitalize transition-colors ${
                            preferences.visibility === vis
                              ? 'bg-flix-primary text-white'
                              : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-20'
                          }`}
                        >
                          {t.profile[vis]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
                <h2 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">{t.profile.progress}</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-flix-grayscale-70">{t.profile.lessonsCompleted}</span>
                      <span className="text-[13px] font-medium text-flix-grayscale-100">0/4</span>
                    </div>
                    <div className="h-1.5 bg-flix-grayscale-20 rounded-pill overflow-hidden">
                      <div className="h-full bg-flix-primary rounded-pill" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[13px] text-flix-grayscale-70">{t.profile.appreciationsGiven}</span>
                    <span className="text-[13px] font-medium text-flix-grayscale-100">0</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-flix-background rounded-card p-6 shadow-card border border-flix-grayscale-20 text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-flix-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={24} className="text-flix-primary" />
              </div>
              <h2 className="text-lg font-semibold text-flix-grayscale-100 mb-2">
                {t.profile.setPreferences}
              </h2>
              <p className="text-[14px] text-flix-grayscale-70 leading-relaxed mb-6 max-w-[280px] mx-auto">
                {t.profile.setPreferencesDesc}
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                {t.profile.startPreferenceQuiz}
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav locale="de" />
    </div>
  );
}
