import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

export const AIButton: React.FC<AIButtonProps> = ({ onClick, children, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 shadow-lg shadow-violet-200"
  >
    {loading ? <span className="animate-spin">✨</span> : <Sparkles size={16} />}
    {children}
  </button>
);
