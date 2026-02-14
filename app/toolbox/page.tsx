'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';

const toolboxTools = [
  {
    id: 'appreciate-colleague',
    title: 'Appreciate a Colleague',
    description: 'Get personalized tips for appreciating someone',
    icon: 'Heart',
    color: 'bg-flix-primary',
    href: '/toolbox/appreciate-colleague',
  },
  {
    id: 'phrase-generator',
    title: 'Phrase Generator',
    description: 'Generate appreciation messages',
    icon: 'Sparkles',
    color: 'bg-flix-secondary',
    href: '/toolbox/phrase-generator',
  },
  {
    id: 'channel-guide',
    title: 'Channel Guide',
    description: 'Choose the best way to show appreciation',
    icon: 'Smartphone',
    color: 'bg-flix-feedback-info',
    href: '/toolbox/channel-guide',
  },
  {
    id: 'timing-tips',
    title: 'Timing Tips',
    description: 'Learn when to show appreciation',
    icon: 'Clock',
    color: 'bg-flix-feedback-success',
    href: '/toolbox/timing-tips',
  },
];

export default function ToolboxPage() {
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
            <Icon name="Wrench" size={32} className="text-flix-primary" />
            Quick Reference Toolbox
          </h1>
          <p className="text-flix-grayscale-70 mb-6">
            Instant tools to help you show appreciation effectively
          </p>

          <div className="grid grid-cols-1 gap-4">
            {toolboxTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={tool.href}>
                  <div className="bg-flix-background rounded-card p-5 border border-flix-grayscale-30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`${tool.color} w-16 h-16 rounded-card flex items-center justify-center flex-shrink-0`}>
                        <Icon name={tool.icon} size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-flix-grayscale-100 mb-1">{tool.title}</h3>
                        <p className="text-sm text-flix-grayscale-70">{tool.description}</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-flix-grayscale-50" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-flix-ui-primary/10 rounded-card border border-flix-ui-primary/20"
          >
            <p className="text-sm text-flix-grayscale-90">
              <span className="font-semibold inline-flex items-center gap-1"><Icon name="Lightbulb" size={16} /> Pro Tip:</span> Use &quot;Appreciate a Colleague&quot; to get personalized guidance based on their preferences!
            </p>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

