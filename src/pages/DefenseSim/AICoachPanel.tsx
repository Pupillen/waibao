import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { DefenseStatus, FeedbackItem } from '@/types';

interface AICoachPanelProps {
  status: DefenseStatus;
  feedback: FeedbackItem[];
}

export const AICoachPanel: React.FC<AICoachPanelProps> = ({ status, feedback }) => (
  <div className="w-96 bg-slate-900 text-slate-100 rounded-2xl p-6 flex flex-col">
    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
      <Sparkles size={18} className="text-violet-400" /> 实时 AI 教练
    </h3>

    {status === 'idle' && (
      <div className="flex-1 flex items-center justify-center text-slate-600 text-sm">
        准备就绪，等待开始...
      </div>
    )}

    <div className="space-y-4 flex-1">
      {feedback.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-xl border-l-4 animate-in slide-in-from-right duration-500 ${
            item.type === 'good'
              ? 'bg-green-500/10 border-green-500'
              : 'bg-yellow-500/10 border-yellow-500'
          }`}
        >
          <div
            className={`font-bold text-sm mb-1 ${
              item.type === 'good' ? 'text-green-400' : 'text-yellow-400'
            }`}
          >
            {item.type === 'good' ? '表现优秀' : '改进建议'}
          </div>
          <div className="text-slate-300 text-sm">{item.text}</div>
        </div>
      ))}
    </div>

    {status === 'done' && (
      <button className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-xl mt-4 text-white font-medium flex justify-center items-center gap-2">
        生成完整评估报告 <ArrowRight size={16} />
      </button>
    )}
  </div>
);
