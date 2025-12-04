import React from 'react';
import { Mic, StopCircle } from 'lucide-react';
import type { DefenseStatus } from '@/types';

interface RecordingControlsProps {
  status: DefenseStatus;
  onStart: () => void;
  onStop: () => void;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  status,
  onStart,
  onStop,
}) => (
  <div className="absolute bottom-8 flex gap-4">
    {status === 'idle' || status === 'done' ? (
      <button
        onClick={onStart}
        className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg shadow-red-500/30"
      >
        <Mic size={24} />
      </button>
    ) : (
      <button
        onClick={onStop}
        className="w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-all border-2 border-white"
      >
        <StopCircle size={24} />
      </button>
    )}
  </div>
);
