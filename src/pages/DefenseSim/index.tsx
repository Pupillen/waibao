import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { DefenseStatus, FeedbackItem } from '@/types';
import { VideoArea } from './VideoArea';
import { RecordingControls } from './RecordingControls';
import { AICoachPanel } from './AICoachPanel';

const DefenseSim: React.FC = () => {
  const [status, setStatus] = useState<DefenseStatus>('idle');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  // 媒体录制相关状态
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  // 请求摄像头权限并获取流
  const initCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });
      streamRef.current = stream;
      return stream;
    } catch (err) {
      const error = err as Error;
      if (error.name === 'NotAllowedError') {
        setError('摄像头权限被拒绝，请在浏览器设置中允许访问');
      } else if (error.name === 'NotFoundError') {
        setError('未检测到摄像头设备');
      } else if (error.name === 'NotReadableError') {
        setError('摄像头可能被其他应用占用');
      } else {
        setError('摄像头初始化失败: ' + error.message);
      }
      return null;
    }
  }, []);

  // 开始录制
  const startRecording = useCallback(async () => {
    setError(null);

    // 清理之前的录制数据
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
    chunksRef.current = [];

    // 初始化摄像头
    const stream = await initCamera();
    if (!stream) return;

    // 创建 MediaRecorder
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';

    const recorder = new MediaRecorder(stream, { mimeType });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      // 合并所有数据块
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    };

    recorderRef.current = recorder;
    recorder.start(1000); // 每秒收集一次数据

    setStatus('recording');
    setFeedback([]);
    setRecordingTime(0);

    // 启动计时器
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // 模拟实时反馈（保留原有逻辑）
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
  }, [initCamera, videoUrl]);

  // 停止录制
  const stopRecording = useCallback(() => {
    // 停止计时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 停止录制器
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }

    // 停止所有媒体轨道
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setStatus('reviewing');
  }, []);

  // 重新录制
  const retryRecording = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
    setError(null);
    setStatus('idle');
  }, [videoUrl]);

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  return (
    <div className="h-[calc(100vh-100px)] flex gap-6">
      {/* Left: Camera / Video Area */}
      <div className="flex-1 bg-black rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group">
        <VideoArea
          status={status}
          stream={streamRef.current}
          videoUrl={videoUrl}
          recordingTime={recordingTime}
          error={error}
        />
        <RecordingControls
          status={status}
          onStart={startRecording}
          onStop={stopRecording}
          onRetry={retryRecording}
        />
      </div>

      {/* Right: AI Analysis Panel */}
      <AICoachPanel status={status} feedback={feedback} />
    </div>
  );
};

export default DefenseSim;
