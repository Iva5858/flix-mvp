'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/lib/icons';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface TopBarProps {
  locale?: Locale;
}

export default function TopBar({ locale }: TopBarProps) {
  const pathname = usePathname();
  const isDe = locale === 'de' || pathname?.startsWith('/de');
  const baseHref = isDe ? '/de' : '/';
  const profileHref = isDe ? '/de/profile' : '/profile';

  return (
    <header className="sticky top-0 z-50 bg-flix-background/95 backdrop-blur-sm border-b border-flix-grayscale-20">
      <div className="flex items-center justify-between px-5 py-4 max-w-lg mx-auto">
        <Link href={baseHref} className="flex items-center gap-2 -ml-1">
          <Image
            src="/Flix-logo-small.png"
            alt="Flix"
            width={100}
            height={30}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        
        <div className="flex items-center gap-2">
          <Link
            href={isDe ? '/' : '/de'}
            className="text-[12px] font-medium px-2 py-1 rounded-button bg-flix-grayscale-10 text-flix-grayscale-70 hover:bg-flix-grayscale-20 hover:text-flix-grayscale-90 transition-colors"
          >
            {isDe ? 'EN' : 'DE'}
          </Link>
          <Link href={profileHref} className="w-9 h-9 rounded-full bg-flix-grayscale-20 flex items-center justify-center text-flix-grayscale-90 hover:bg-flix-primary hover:text-white active:scale-95 transition-all cursor-pointer">
            <Icon name="User" size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </header>
  );
}
