import React from 'react';

export const UserProfile: React.FC = () => (
  <div className="bg-slate-800 rounded-xl p-4 mt-auto">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-sm">
        L
      </div>
      <div>
        <div className="text-sm font-bold text-white">林同学</div>
        <div className="text-xs text-slate-400">计算机科学学院</div>
      </div>
    </div>
  </div>
);
