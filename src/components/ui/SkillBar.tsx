import React from 'react';

type SkillColor = 'blue' | 'pink' | 'orange';

interface SkillBarProps {
  label: string;
  value: number;  // 0-100
  color?: SkillColor;
}

const colorStyles: Record<SkillColor, string> = {
  blue: 'bg-blue-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
};

export const SkillBar: React.FC<SkillBarProps> = ({
  label,
  value,
  color = 'blue'
}) => (
  <div className="flex items-center gap-2 text-sm text-slate-600">
    <span className="w-12">{label}</span>
    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${colorStyles[color]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);
