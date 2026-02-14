'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import ArchetypeCard from '@/components/ArchetypeCard';
import { UserPreferences, archetypes, ArchetypeId } from '@/lib/archetypes';
import { Icon } from '@/lib/icons';

const PreferenceQuiz = dynamic(() => import('@/components/PreferenceQuiz'), {
  loading: () => (
    <div className="rounded-card border border-flix-grayscale-20 bg-flix-grayscale-10 p-8 text-center">
      <div className="h-6 w-6 border-2 border-flix-grayscale-30 border-t-flix-primary rounded-full animate-spin mx-auto mb-3" />
      <p className="text-[14px] text-flix-grayscale-70">Loading quiz...</p>
    </div>
  ),
});

const mockUser = {
  id: 'current-user',
  name: 'You',
  role: 'Employee',
  department: 'All Teams',
  preferences: {
    primaryArchetype: 'growth-chaser' as ArchetypeId,
    secondaryPreferences: ['word-collector'] as ArchetypeId[],
    visibility: 'team' as const,
  },
};

export default function ProfilePage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(mockUser.preferences);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleQuizComplete = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    setShowQuiz(false);
    setShowPreferences(true);
  };

  const primaryArchetype = preferences ? archetypes[preferences.primaryArchetype] : null;

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">Profile</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-8 tracking-tight">
            Preferences
          </h1>

          {showQuiz ? (
            <PreferenceQuiz
              onComplete={handleQuizComplete}
              initialPreferences={preferences || undefined}
            />
          ) : showPreferences && preferences && primaryArchetype ? (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
                <h2 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">Your Information</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Name', value: mockUser.name },
                    { label: 'Role', value: mockUser.role },
                    { label: 'Department', value: mockUser.department },
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
                  <h2 className="text-sm font-semibold text-flix-grayscale-90 uppercase tracking-wider">Appreciation Preferences</h2>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="text-[13px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">Primary Style</p>
                    <ArchetypeCard archetype={primaryArchetype} size="medium" />
                  </div>

                  {preferences.secondaryPreferences.length > 0 && (
                    <div>
                      <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">Secondary</p>
                      <div className="space-y-2">
                        {preferences.secondaryPreferences.map((id) => (
                          <ArchetypeCard key={id} archetype={archetypes[id]} size="small" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-[12px] font-medium text-flix-grayscale-70 mb-2">Visibility</p>
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
                          {vis}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
                <h2 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">Progress</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-flix-grayscale-70">Lessons Completed</span>
                      <span className="text-[13px] font-medium text-flix-grayscale-100">0/4</span>
                    </div>
                    <div className="h-1.5 bg-flix-grayscale-20 rounded-pill overflow-hidden">
                      <div className="h-full bg-flix-primary rounded-pill" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[13px] text-flix-grayscale-70">Appreciations Given</span>
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
                Set Your Preferences
              </h2>
              <p className="text-[14px] text-flix-grayscale-70 leading-relaxed mb-6 max-w-[280px] mx-auto">
                Help others appreciate you better by setting your preferences
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px]"
              >
                Start Preference Quiz
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
