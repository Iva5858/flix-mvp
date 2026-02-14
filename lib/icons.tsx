'use client';

import {
  Sparkles,
  Wrench,
  Bot,
  User,
  Lightbulb,
  Target,
  PartyPopper,
  Check,
  X,
  BarChart3,
  Waves,
  Drama,
  Palette,
  Star,
  FileText,
  Clock,
  Heart,
  Smartphone,
  Search,
  Hand,
  ChevronRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

export const icons: Record<string, LucideIcon> = {
  Sparkles,
  Wrench,
  Bot,
  User,
  Lightbulb,
  Target,
  PartyPopper,
  Check,
  X,
  BarChart3,
  Waves,
  Drama,
  Palette,
  Star,
  FileText,
  Clock,
  Heart,
  Smartphone,
  Search,
  Hand,
  ChevronRight,
  ArrowUpRight,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, className, size = 24, strokeWidth }: IconProps) {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} size={size} strokeWidth={strokeWidth} />;
}
