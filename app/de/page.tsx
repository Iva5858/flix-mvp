'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeHome() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('flix_user')) {
      router.replace('/');
    } else {
      router.replace('/de/training');
    }
  }, [router]);

  return null;
}