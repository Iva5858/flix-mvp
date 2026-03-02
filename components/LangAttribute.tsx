'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LangAttribute() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname?.startsWith('/de') ? 'de' : 'en';
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
