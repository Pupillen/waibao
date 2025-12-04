import React from 'react';
import { Search } from 'lucide-react';

export const EmptyState: React.FC = () => (
  <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 p-6 hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer">
    <Search size={48} className="mb-4 opacity-50" />
    <p>查看更多候选人</p>
  </div>
);
