import React from 'react';

type BadgeVariant = 'default' | 'violet' | 'blue' | 'green' | 'orange' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-600',
  violet: 'bg-violet-100 text-violet-700',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  green: 'bg-green-50 text-green-600 border-green-100',
  orange: 'bg-orange-50 text-orange-500',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => (
  <span className={`text-xs px-2 py-0.5 rounded ${variantStyles[variant]} ${className}`}>
    {children}
  </span>
);
