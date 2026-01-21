'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/training', emoji: '🎓', label: 'Training' },
  { href: '/toolbox', emoji: '🧰', label: 'Toolbox' },
  { href: '/assessment', emoji: '🤖', label: 'Assessment' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-flix-background border-t border-flix-grayscale-30 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-button transition-colors ${
                  isActive
                    ? 'bg-flix-primary text-white'
                    : 'text-flix-grayscale-70 hover:bg-flix-grayscale-10'
                }`}
              >
                <span className="text-2xl mb-1">{item.emoji}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

