import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarColor = 'slate' | 'blue' | 'yellow' | 'violet';

interface AvatarProps {
  children: React.ReactNode;
  size?: AvatarSize;
  color?: AvatarColor;
  online?: boolean;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-5 h-5 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-12 h-12 text-xl',
};

const colorStyles: Record<AvatarColor, string> = {
  slate: 'bg-slate-200 text-slate-600',
  blue: 'bg-blue-100 text-blue-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  violet: 'bg-violet-500 text-white',
};

export const Avatar: React.FC<AvatarProps> = ({
  children,
  size = 'md',
  color = 'slate',
  online,
  className = ''
}) => (
  <div className={`relative inline-flex items-center justify-center rounded-full font-bold ${sizeStyles[size]} ${colorStyles[color]} ${className}`}>
    {children}
    {online !== undefined && (
      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${online ? 'bg-green-500' : 'bg-slate-400'}`} />
    )}
  </div>
);
