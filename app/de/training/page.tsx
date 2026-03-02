'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { trainingModulesDe } from '@/lib/training-de';
import { getTranslations } from '@/lib/i18n';

export default function DeTrainingPage() {
  const t = getTranslations('de');
  const [moduleProgress, setModuleProgress] = useState<Record<number, { completed: boolean; progress: number }>>({});

  useEffect(() => {
    const progress: Record<number, { completed: boolean; progress: number }> = {};
    trainingModulesDe.forEach((module) => {
      const saved = localStorage.getItem(`training-de-${module.id}`);
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
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar locale="de" />
      
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="animate-fade-in">
          <p className="text-sm font-medium text-flix-primary mb-1">{t.training.sectionLabel}</p>
          <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">
            {t.training.title}
          </h1>
          <p className="text-flix-grayscale-70 text-[15px] leading-relaxed mb-8">
            {t.training.subtitle}
          </p>

          <div className="space-y-3">
            {trainingModulesDe.map((module) => (
              <Link key={module.id} href={`/de/training/${module.id}`}>
                <div className="group bg-flix-background rounded-card p-4 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer border border-flix-grayscale-20 hover:border-flix-grayscale-30">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-flix-primary/10 flex items-center justify-center group-hover:bg-flix-primary/15 transition-colors">
                      <Icon name={module.icon} size={22} className="text-flix-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className="font-semibold text-flix-grayscale-100 text-[15px] truncate">{module.title}</h3>
                        <span className="text-[11px] text-flix-grayscale-50 font-medium flex-shrink-0">
                          {module.duration}
                        </span>
                      </div>
                      <p className="text-[13px] text-flix-grayscale-70 line-clamp-1 mb-2">{module.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-flix-grayscale-20 rounded-pill overflow-hidden">
                          <div
                            className="h-full bg-flix-primary rounded-pill transition-[width] duration-300 ease-out"
                            style={{ width: `${moduleProgress[module.id]?.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-flix-grayscale-50 w-6 text-right">
                          {moduleProgress[module.id]?.completed ? (
                            <Icon name="Check" size={12} className="text-flix-feedback-success inline" />
                          ) : (
                            `${moduleProgress[module.id]?.progress || 0}%`
                          )}
                        </span>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={18} className="text-flix-grayscale-30 flex-shrink-0 group-hover:text-flix-grayscale-50 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-card bg-flix-primary/5 border border-flix-primary/10">
            <p className="text-[13px] text-flix-grayscale-90 leading-relaxed">
              <span className="font-medium text-flix-grayscale-100 inline-flex items-center gap-1.5">
                <Icon name="Lightbulb" size={14} className="text-flix-primary" />
                {t.training.tip}
              </span>
              {' — '}{t.training.tipText}
            </p>
          </div>
        </div>
      </main>

      <BottomNav locale="de" />
    </div>
  );
}
