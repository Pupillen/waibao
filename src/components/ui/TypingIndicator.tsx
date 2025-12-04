import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2">
      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" style={{ animationDelay: '0.1s' }} />
      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" style={{ animationDelay: '0.2s' }} />
    </div>
  </div>
);
