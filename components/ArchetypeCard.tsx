'use client';

import { motion } from 'framer-motion';
import { AppreciationArchetype } from '@/lib/archetypes';

interface ArchetypeCardProps {
  archetype: AppreciationArchetype;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function ArchetypeCard({
  archetype,
  isSelected = false,
  onClick,
  size = 'medium',
}: ArchetypeCardProps) {
  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  return (
    <motion.div
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        rounded-card border-2 transition-all cursor-pointer
        ${
          isSelected
            ? 'border-flix-primary bg-flix-primary/10 shadow-lg'
            : 'border-flix-grayscale-30 bg-flix-background hover:border-flix-primary/50'
        }
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-flix-grayscale-100 mb-1">{archetype.name}</h3>
          <p className="text-sm text-flix-grayscale-70 mb-2">{archetype.description}</p>
          {size !== 'small' && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-flix-grayscale-90 mb-1">Preferred Recognition:</p>
              <div className="flex flex-wrap gap-1">
                {archetype.preferredRecognition.slice(0, 3).map((rec, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-flix-grayscale-10 text-flix-grayscale-70"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

