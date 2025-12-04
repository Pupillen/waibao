import React from 'react';
import { Card } from '@/components/ui';

export const RadarChart: React.FC = () => (
  <Card className="p-6">
    <h3 className="font-bold text-slate-800 mb-4">能力成长雷达</h3>
    <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 text-sm">
      {/* 简单 CSS 模拟雷达图背景 */}
      <div className="relative w-32 h-32 border border-slate-300 rounded-full flex items-center justify-center">
        <div className="w-20 h-20 border border-slate-300 rounded-full" />
        <div className="absolute w-full h-full bg-violet-500/20 rounded-full transform scale-75 skew-x-12" />
      </div>
    </div>
  </Card>
);
