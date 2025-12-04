import React, { useState } from 'react';
import type { DefenseStatus, FeedbackItem } from '@/types';
import { VideoArea } from './VideoArea';
import { RecordingControls } from './RecordingControls';
import { AICoachPanel } from './AICoachPanel';

const DefenseSim: React.FC = () => {
  const [status, setStatus] = useState<DefenseStatus>('idle');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  const startRecording = () => {
    setStatus('recording');
    setFeedback([]);

    // Simulate real-time feedback
    setTimeout(
      () => setFeedback((prev) => [...prev, { type: 'warn', text: '语速稍快 (240字/分)' }]),
      2000
    );
    setTimeout(
      () => setFeedback((prev) => [...prev, { type: 'good', text: '逻辑连接词清晰' }]),
      5000
    );
    setTimeout(
      () => setFeedback((prev) => [...prev, { type: 'warn', text: '眼神接触不足' }]),
      8000
    );
  };

  const stopRecording = () => {
    setStatus('done');
  };

  return (
    <div className="h-[calc(100vh-100px)] flex gap-6">
      {/* Left: Camera / Video Area */}
      <div className="flex-1 bg-black rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group">
        <VideoArea status={status} />
        <RecordingControls status={status} onStart={startRecording} onStop={stopRecording} />
      </div>

      {/* Right: AI Analysis Panel */}
      <AICoachPanel status={status} feedback={feedback} />
    </div>
  );
};

export default DefenseSim;
