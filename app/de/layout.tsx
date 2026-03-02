import { LocaleProvider } from '@/lib/LocaleContext';

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider locale="de">{children}</LocaleProvider>;
}
