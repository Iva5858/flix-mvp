'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/lib/icons';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-flix-background/95 backdrop-blur-sm border-b border-flix-grayscale-20">
      <div className="flex items-center justify-between px-5 py-4 max-w-lg mx-auto">
        <Link href="/" className="flex items-center gap-2 -ml-1">
          <Image
            src="/Flix-logo-small.png"
            alt="Flix"
            width={100}
            height={30}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        
        <Link href="/profile" className="w-9 h-9 rounded-full bg-flix-grayscale-20 flex items-center justify-center text-flix-grayscale-90 hover:bg-flix-primary hover:text-white active:scale-95 transition-all cursor-pointer">
          <Icon name="User" size={18} strokeWidth={2} />
        </Link>
      </div>
    </header>
  );
}
