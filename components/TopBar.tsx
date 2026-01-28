'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-flix-background border-b border-flix-grayscale-30">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-flix-ui-primary">Overthank</span>
        </Link>
        
        <Link href="/profile">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-flix-primary flex items-center justify-center text-white font-semibold cursor-pointer"
          >
            👤
          </motion.div>
        </Link>
      </div>
    </header>
  );
}

