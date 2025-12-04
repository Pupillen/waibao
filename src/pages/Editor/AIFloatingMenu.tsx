import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

interface AIFloatingMenuProps {
  onPolish: () => void;
}

export const AIFloatingMenu: React.FC<AIFloatingMenuProps> = ({ onPolish }) => (
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-violet-100 rounded-lg p-2 flex gap-2 animate-in zoom-in duration-200 z-10">
    <button
      onClick={onPolish}
      className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 text-white text-sm rounded hover:bg-violet-700 transition-colors"
    >
      <Sparkles size={14} /> AI 学术润色
    </button>
    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded hover:bg-slate-50">
      <MessageSquare size={14} /> 添加批注
    </button>
  </div>
);
