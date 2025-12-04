import React from 'react';
import { Sparkles } from 'lucide-react';

export const AIInsightBanner: React.FC = () => (
  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 p-6 rounded-xl flex items-start gap-4">
    <div className="bg-white p-2 rounded-full shadow-sm text-violet-600">
      <Sparkles size={24} />
    </div>
    <div>
      <h3 className="font-semibold text-violet-900">AI 智能分析建议</h3>
      <p className="text-violet-700 text-sm mt-1">
        根据您过去一年的 GitHub 活跃度与课程成绩，建议您重点关注{' '}
        <strong>"互联网+"</strong> 大赛的 <strong>"产业命题赛道"</strong>
        。该赛道目前竞争烈度较"主赛道"低 15%，且与您的全栈开发能力高度匹配。
      </p>
    </div>
  </div>
);
