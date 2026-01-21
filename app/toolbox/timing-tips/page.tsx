'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';

export default function TimingTipsPage() {
  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/toolbox" className="text-flix-primary hover:underline text-sm mb-2 inline-block">
            ← Back to Toolbox
          </Link>
          <h1 className="text-3xl font-bold text-flix-grayscale-100 mb-2">
            ⏰ Timing Tips
          </h1>
          <p className="text-flix-grayscale-70">
            Learn when to show appreciation (Coming soon)
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30"
        >
          <p className="text-flix-grayscale-70">
            This feature will provide guidance on the best times to show appreciation for maximum impact.
          </p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

