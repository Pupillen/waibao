import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div
    className={`bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);
