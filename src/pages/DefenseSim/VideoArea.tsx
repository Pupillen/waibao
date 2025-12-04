import React from 'react';
import { Video } from 'lucide-react';
import type { DefenseStatus } from '@/types';
import { AudioWaveform } from './AudioWaveform';

interface VideoAreaProps {
  status: DefenseStatus;
}

export const VideoArea: React.FC<VideoAreaProps> = ({ status }) => {
  if (status === 'idle') {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-700 transition-colors cursor-pointer">
          <Video size={32} className="text-slate-400" />
        </div>
        <p className="text-slate-500">点击下方按钮开始模拟答辩</p>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur text-red-500 px-3 py-1 rounded-full flex items-center gap-2 text-sm animate-pulse">
        <div className="w-2 h-2 bg-red-500 rounded-full" /> REC 00:12
      </div>
      <AudioWaveform />
      <p className="mt-8 text-slate-400 font-light text-lg">
        "我们的项目主要解决了三个核心痛点..."
      </p>
    </>
  );
};
