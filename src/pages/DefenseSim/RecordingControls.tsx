import React from 'react';
import { Mic, StopCircle, RotateCcw } from 'lucide-react';
import type { DefenseStatus } from '@/types';

interface RecordingControlsProps {
  status: DefenseStatus;
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  status,
  onStart,
  onStop,
  onRetry,
}) => (
  <div className="absolute bottom-8 flex gap-4 z-20">
    {/* 空闲状态：开始录制按钮 */}
    {status === 'idle' && (
      <button
        onClick={onStart}
        className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg shadow-red-500/30"
        title="开始录制"
      >
        <Mic size={24} />
      </button>
    )}

    {/* 录制中状态：停止按钮 */}
    {status === 'recording' && (
      <button
        onClick={onStop}
        className="w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-all border-2 border-white"
        title="停止录制"
      >
        <StopCircle size={24} />
      </button>
    )}

    {/* 回放状态：重录 + 继续录制按钮 */}
    {(status === 'reviewing' || status === 'done') && (
      <>
        <button
          onClick={onRetry}
          className="w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-all"
          title="重新录制"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={onStart}
          className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg shadow-red-500/30"
          title="继续录制"
        >
          <Mic size={24} />
        </button>
      </>
    )}
  </div>
);
