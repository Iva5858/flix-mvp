'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import PreferenceQuiz from '@/components/PreferenceQuiz';
import ArchetypeCard from '@/components/ArchetypeCard';
import { UserPreferences, archetypes, ArchetypeId } from '@/lib/archetypes';
import { Icon } from '@/lib/icons';

// Mock user data - in production, this would come from a database/auth
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
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-flix-grayscale-100 mb-6 flex items-center gap-2">
            <Icon name="User" size={32} className="text-flix-primary" />
            Profile & Preferences
          </h1>

          {showQuiz ? (
            <PreferenceQuiz
              onComplete={handleQuizComplete}
              initialPreferences={preferences || undefined}
            />
          ) : showPreferences && preferences && primaryArchetype ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30">
                <h2 className="text-xl font-bold text-flix-grayscale-100 mb-4">Your Information</h2>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-flix-grayscale-70">Name:</span>
                    <span className="ml-2 font-semibold text-flix-grayscale-100">{mockUser.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-flix-grayscale-70">Role:</span>
                    <span className="ml-2 font-semibold text-flix-grayscale-100">{mockUser.role}</span>
                  </div>
                  <div>
                    <span className="text-sm text-flix-grayscale-70">Department:</span>
                    <span className="ml-2 font-semibold text-flix-grayscale-100">{mockUser.department}</span>
                  </div>
                </div>
              </div>

              <div className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-flix-grayscale-100">Appreciation Preferences</h2>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="text-sm px-3 py-1 bg-flix-grayscale-10 rounded-button hover:bg-flix-grayscale-30 text-flix-grayscale-70"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-flix-grayscale-70 mb-2">Primary Style</p>
                    <ArchetypeCard archetype={primaryArchetype} size="medium" />
                  </div>

                  {preferences.secondaryPreferences.length > 0 && (
                    <div>
                      <p className="text-sm text-flix-grayscale-70 mb-2">Secondary Preferences</p>
                      <div className="space-y-2">
                        {preferences.secondaryPreferences.map((id) => (
                          <ArchetypeCard
                            key={id}
                            archetype={archetypes[id]}
                            size="small"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-flix-grayscale-70 mb-2">Visibility</p>
                    <div className="flex gap-2">
                      {(['public', 'team', 'private'] as const).map((vis) => (
                        <button
                          key={vis}
                          className={`px-3 py-2 rounded-button text-sm font-medium capitalize ${
                            preferences.visibility === vis
                              ? 'bg-flix-primary text-white'
                              : 'bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-30'
                          }`}
                        >
                          {vis}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30">
                <h2 className="text-xl font-bold text-flix-grayscale-100 mb-4">Progress</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-flix-grayscale-70">Lessons Completed</span>
                      <span className="text-sm font-semibold text-flix-grayscale-100">0/4</span>
                    </div>
                    <div className="h-2 bg-flix-grayscale-30 rounded-full overflow-hidden">
                      <div className="h-full bg-flix-primary rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-flix-grayscale-70">Appreciations Given</span>
                      <span className="text-sm font-semibold text-flix-grayscale-100">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30"
            >
              <h2 className="text-xl font-bold text-flix-grayscale-100 mb-4">
                Set Your Preferences
              </h2>
              <p className="text-flix-grayscale-70 mb-6">
                Help others appreciate you better by setting your preferences. This will help colleagues
                give you recognition in the way you prefer.
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-3 bg-flix-primary text-white rounded-button font-semibold hover:bg-flix-ui-primary transition-colors"
              >
                Start Preference Quiz →
              </button>
            </motion.div>
          )}
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

