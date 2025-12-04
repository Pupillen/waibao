import React, { useRef, useEffect } from 'react';
import { Video, AlertCircle } from 'lucide-react';
import type { DefenseStatus } from '@/types';
import { AudioWaveform } from './AudioWaveform';

interface VideoAreaProps {
  status: DefenseStatus;
  stream: MediaStream | null;
  videoUrl: string | null;
  recordingTime: number;
  error: string | null;
}

// 格式化时间
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const VideoArea: React.FC<VideoAreaProps> = ({
  status,
  stream,
  videoUrl,
  recordingTime,
  error
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 处理实时预览
  useEffect(() => {
    if (status === 'recording' && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true; // 防止回声
      videoRef.current.play().catch(console.error);
    }
  }, [status, stream]);

  // 处理回放
  useEffect(() => {
    if ((status === 'reviewing' || status === 'done') && videoRef.current && videoUrl) {
      videoRef.current.srcObject = null;
      videoRef.current.src = videoUrl;
      videoRef.current.muted = false;
      videoRef.current.load();
    }
  }, [status, videoUrl]);

  // 错误状态
  if (error) {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        <p className="text-red-400 mb-2">摄像头访问失败</p>
        <p className="text-slate-500 text-sm">{error}</p>
      </div>
    );
  }

  // 空闲状态
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

  // 录制中状态
  if (status === 'recording') {
    return (
      <>
        {/* 实时预览视频 */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />

        {/* 录制指示器 */}
        <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur text-red-500 px-3 py-1 rounded-full flex items-center gap-2 text-sm animate-pulse z-10">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          REC {formatTime(recordingTime)}
        </div>

        {/* 音频波形叠加 */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
          <AudioWaveform />
        </div>
      </>
    );
  }

  // 回放状态 (reviewing / done / analyzing)
  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        controls
        playsInline
      />

      {/* 回放标识 */}
      <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full text-slate-300 text-sm z-10">
        录制回放
      </div>
    </>
  );
};
