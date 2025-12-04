import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  variant?: 'default' | 'gradient';
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  variant = 'default',
  iconColor = 'text-slate-500'
}) => {
  if (variant === 'gradient') {
    return (
      <Card className="p-6 bg-gradient-to-br from-violet-500 to-indigo-600 text-white border-none">
        <div className="mb-4 opacity-80">
          <Icon size={24} />
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm opacity-80">{label}</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white">
      <div className={`mb-4 ${iconColor}`}>
        <Icon size={24} />
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </Card>
  );
};
