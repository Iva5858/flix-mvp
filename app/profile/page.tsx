'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

interface StoredUser {
  name?: string;
  email?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [moduleCount, setModuleCount] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('flix_user');
    if (!storedUser) {
      router.replace('/');
      return;
    }
    setUser(JSON.parse(storedUser));

    const storedProfile = localStorage.getItem('flix_profile');
    if (storedProfile) {
      setPreferences(JSON.parse(storedProfile));
    }

    // Count completed training modules
    let completed = 0;
    for (let i = 1; i <= 10; i++) {
      const saved = localStorage.getItem(`training-${i}`);
      if (saved && JSON.parse(saved).completed) completed++;
    }
    setModuleCount(completed);
  }, [router]);

  const handleQuizComplete = (newPreferences: UserPreferences) => {
    localStorage.setItem('flix_profile', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowQuiz(false);
  };

  const primaryArchetype = preferences ? archetypes[preferences.primaryArchetype as ArchetypeId] : null;

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <button
            onClick={() => setShowQuiz(false)}
            className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
            Back to Profile
          </button>
          <p className="text-sm font-medium text-flix-primary mb-1">Profile</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Redefine Preferences</h1>
          <p className="text-[15px] text-flix-grayscale-70 mb-8">Retake the quiz to update your appreciation style</p>
          <PreferenceQuiz onComplete={handleQuizComplete} initialPreferences={preferences || undefined} />
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />

      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">Profile</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-8 tracking-tight">Your Profile</h1>

          <div className="space-y-4">
            {/* User info */}
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={28} className="text-flix-primary" />
                </div>
                <div>
                  <p className="font-semibold text-flix-grayscale-100 text-[17px]">{user?.name ?? 'You'}</p>
                  <p className="text-[13px] text-flix-grayscale-50">{user?.email ?? ''}</p>
                </div>
              </div>
            </div>

            {/* Appreciation style */}
            {primaryArchetype ? (
              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-flix-grayscale-90 uppercase tracking-wider">Appreciation Style</h2>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="text-[13px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors"
                  >
                    Redefine
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[12px] font-medium text-flix-grayscale-50 mb-2">Primary Style</p>
                    <ArchetypeCard archetype={primaryArchetype} size="medium" />
                  </div>

                  {preferences!.secondaryPreferences.length > 0 && (
                    <div>
                      <p className="text-[12px] font-medium text-flix-grayscale-50 mb-2">Secondary</p>
                      <div className="space-y-2">
                        {preferences!.secondaryPreferences.map((id) => (
                          <ArchetypeCard key={id} archetype={archetypes[id as ArchetypeId]} size="small" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 text-center">
                <p className="text-[14px] text-flix-grayscale-70 mb-4">No appreciation style set yet.</p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-5 py-2.5 bg-flix-primary text-white rounded-button font-medium text-[14px] hover:bg-flix-ui-primary transition-colors"
                >
                  Take the Quiz
                </button>
              </div>
            )}

            {/* Progress */}
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20">
              <h2 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[13px] text-flix-grayscale-70">Lessons Completed</span>
                    <span className="text-[13px] font-medium text-flix-grayscale-100">{moduleCount}/4</span>
                  </div>
                  <div className="h-1.5 bg-flix-grayscale-20 rounded-pill overflow-hidden">
                    <div
                      className="h-full bg-flix-primary rounded-pill transition-[width] duration-300"
                      style={{ width: `${(moduleCount / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={() => {
                localStorage.removeItem('flix_user');
                localStorage.removeItem('flix_profile');
                router.replace('/');
              }}
              className="w-full py-3 bg-flix-grayscale-10 text-flix-grayscale-70 rounded-button font-medium hover:bg-flix-grayscale-20 transition-colors text-[14px]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}