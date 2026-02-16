'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/lib/icons';

const navItems = [
  { href: '/training', icon: 'Sparkles', label: 'Learn' },
  { href: '/toolbox', icon: 'Wrench', label: 'Toolbox' },
  { href: '/assessment', icon: 'Bot', label: 'Appreciator Test' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-flix-background/95 backdrop-blur-sm border-t border-flix-grayscale-20 safe-area-inset-bottom">
      <div className="flex items-center justify-center gap-1 px-4 py-3 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 max-w-[120px] flex flex-col items-center justify-center py-2.5 px-3 rounded-button transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-flix-primary text-white'
                  : 'text-flix-grayscale-50 hover:text-flix-grayscale-90 hover:bg-flix-grayscale-10'
              }`}
            >
              <span className="mb-1 flex justify-center">
                <Icon name={item.icon} size={22} strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span className="text-[11px] font-medium tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
