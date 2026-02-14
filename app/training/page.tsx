'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { trainingModules } from '@/lib/training';

export default function TrainingPage() {
  const [moduleProgress, setModuleProgress] = useState<Record<number, { completed: boolean; progress: number }>>({});

  useEffect(() => {
    // Load progress from localStorage
    const progress: Record<number, { completed: boolean; progress: number }> = {};
    trainingModules.forEach((module) => {
      const saved = localStorage.getItem(`training-${module.id}`);
      if (saved) {
        const data = JSON.parse(saved);
        progress[module.id] = {
          completed: data.completed || false,
          progress: data.completed ? 100 : (data.progress || 0),
        };
      } else {
        progress[module.id] = { completed: false, progress: 0 };
      }
    });
    setModuleProgress(progress);
  }, []);
  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-flix-grayscale-100 mb-2 flex items-center gap-2">
            <Icon name="Sparkles" size={32} className="text-flix-primary" />
            Level Up Your Appreciation
          </h1>
          <p className="text-flix-grayscale-70 mb-6">
            Master the art of appreciation with fun, bite-sized lessons
          </p>

          <div className="space-y-4">
            {trainingModules.map((module, index) => (
              <Link key={module.id} href={`/training/${module.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-flix-background rounded-card p-4 border border-flix-grayscale-30 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon name={module.icon} size={40} className="text-flix-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-flix-grayscale-100">{module.title}</h3>
                        <span className="text-xs text-flix-grayscale-50 bg-flix-grayscale-10 px-2 py-1 rounded-full">
                          {module.duration}
                        </span>
                      </div>
                      <p className="text-sm text-flix-grayscale-70 mb-2">{module.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-flix-grayscale-30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-flix-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${moduleProgress[module.id]?.progress || 0}%`,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <span className="text-xs text-flix-grayscale-50">
                          {moduleProgress[module.id]?.completed ? (
                            <Icon name="Check" size={14} className="text-flix-feedback-success" />
                          ) : (
                            `${moduleProgress[module.id]?.progress || 0}%`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-flix-ui-primary/10 rounded-card border border-flix-ui-primary/20"
          >
            <p className="text-sm text-flix-grayscale-90">
              <span className="font-semibold inline-flex items-center gap-1"><Icon name="Lightbulb" size={16} /> Tip:</span> Complete all lessons to unlock advanced appreciation tools!
            </p>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

