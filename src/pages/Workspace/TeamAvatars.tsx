import React from 'react';

const AVATARS = ['L', 'S', 'C'];

export const TeamAvatars: React.FC = () => (
  <div className="flex -space-x-2">
    {AVATARS.map((av, i) => (
      <div
        key={i}
        className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600"
      >
        {av}
      </div>
    ))}
    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-400 hover:bg-slate-200 cursor-pointer">
      +
    </div>
  </div>
);
