'use client';

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
    large: 'p-5',
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className={`
        ${sizeClasses[size]}
        rounded-card transition-all duration-200
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        ${
          isSelected
            ? 'bg-flix-primary/10 border border-flix-primary/20 shadow-soft'
            : 'bg-flix-grayscale-10 border border-flix-grayscale-20 hover:border-flix-grayscale-30'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-flix-grayscale-100 text-[15px] mb-0.5">{archetype.name}</h3>
          <p className="text-[13px] text-flix-grayscale-70 leading-relaxed">{archetype.description}</p>
          {size !== 'small' && (
            <div className="mt-3">
              <p className="text-[11px] font-medium text-flix-grayscale-70 uppercase tracking-wider mb-1.5">Preferred Recognition</p>
              <div className="flex flex-wrap gap-1.5">
                {archetype.preferredRecognition.slice(0, 3).map((rec, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-button bg-flix-grayscale-20 text-flix-grayscale-80"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
