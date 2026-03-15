'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

interface StoredUser {
  name?: string;
  email?: string;
}

export default function DeProfilePage() {
  const t = getTranslations('de');
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

    let completed = 0;
    for (let i = 1; i <= 10; i++) {
      const saved = localStorage.getItem(`training-de-${i}`);
      if (saved && JSON.parse(saved).completed) completed++;
    }
    setModuleCount(completed);
  }, [router]);

  const handleQuizComplete = (newPreferences: UserPreferences) => {
    localStorage.setItem('flix_profile', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowQuiz(false);
  };

  const primaryArchetype = preferences ? archetypesDe[preferences.primaryArchetype as ArchetypeId] : null;

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar locale="de" />
        <main className="max-w-lg mx-auto px-5 py-8">
          <button
            onClick={() => setShowQuiz(false)}
            className="inline-flex items-center gap-1 text-[13px] text-flix-grayscale-50 hover:text-flix-grayscale-70 mb-6 transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
            Zurück zum Profil
          </button>
          <p className="text-sm font-medium text-flix-primary mb-1">{t.profile.sectionLabel}</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">Präferenzen neu definieren</h1>
          <p className="text-[15px] text-flix-grayscale-70 mb-8">Quiz erneut durchführen, um deinen Wertschätzungsstil zu aktualisieren</p>
          <PreferenceQuiz onComplete={handleQuizComplete} initialPreferences={preferences || undefined} locale="de" />
        </main>
        <BottomNav locale="de" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar locale="de" />

      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">{t.profile.sectionLabel}</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-8 tracking-tight">
            {t.profile.title}
          </h1>

          {/* User info card */}
          <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-flix-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={24} className="text-flix-primary" />
              </div>
              <div>
                <p className="font-semibold text-flix-grayscale-100 text-[16px]">{user?.name || 'Benutzer'}</p>
                <p className="text-[13px] text-flix-grayscale-50">{user?.email || ''}</p>
              </div>
            </div>
          </div>

          {/* Preferences card */}
          {preferences && primaryArchetype ? (
            <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-4">
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
                        <ArchetypeCard key={id} archetype={archetypesDe[id as ArchetypeId]} size="small" locale="de" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-flix-background rounded-card p-6 shadow-card border border-flix-grayscale-20 mb-4 text-center">
              <div className="w-12 h-12 rounded-full bg-flix-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={24} className="text-flix-primary" />
              </div>
              <h2 className="text-lg font-semibold text-flix-grayscale-100 mb-2">{t.profile.setPreferences}</h2>
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

          {/* Progress card */}
          <div className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-4">
            <h2 className="text-sm font-semibold text-flix-grayscale-90 mb-4 uppercase tracking-wider">{t.profile.progress}</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[13px] text-flix-grayscale-70">{t.profile.lessonsCompleted}</span>
                  <span className="text-[13px] font-medium text-flix-grayscale-100">{moduleCount}/4</span>
                </div>
                <div className="h-1.5 bg-flix-grayscale-20 rounded-pill overflow-hidden">
                  <div className="h-full bg-flix-primary rounded-pill transition-[width] duration-300" style={{ width: `${(moduleCount / 4) * 100}%` }} />
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
            className="w-full py-3 border border-flix-grayscale-20 rounded-button text-[14px] font-medium text-flix-grayscale-70 hover:text-flix-grayscale-100 hover:border-flix-grayscale-30 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </main>

      <BottomNav locale="de" />
    </div>
  );
}