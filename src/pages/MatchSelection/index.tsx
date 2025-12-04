import React from 'react';
import { SearchInput } from '@/components/ui';
import { COMPETITIONS } from '@/data/mock';
import { AIInsightBanner } from './AIInsightBanner';
import { CompetitionCard } from './CompetitionCard';

const MatchSelection: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">赛事探索</h2>
          <p className="text-slate-500 mt-1">基于您的"计算机科学"专业画像推荐</p>
        </div>
        <SearchInput placeholder="搜索竞赛..." className="w-64" />
      </div>

      {/* AI Insight Banner */}
      <AIInsightBanner />

      {/* Competition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPETITIONS.map((comp) => (
          <CompetitionCard key={comp.id} competition={comp} />
        ))}
      </div>
    </div>
  );
};

export default MatchSelection;
