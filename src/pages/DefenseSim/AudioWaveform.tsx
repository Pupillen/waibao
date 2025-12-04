import React from 'react';

export const AudioWaveform: React.FC = () => (
  <div className="flex items-end gap-1 h-12">
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 bg-violet-500 rounded-full animate-bounce"
        style={{
          height: `${Math.random() * 40 + 10}px`,
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </div>
);
