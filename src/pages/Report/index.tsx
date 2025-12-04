import React from 'react';
import { Users, FileText, CheckCircle2 } from 'lucide-react';
import { StatCard } from './StatCard';
import { RadarChart } from './RadarChart';
import { ConversionPath } from './ConversionPath';

const Report: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">赛后复盘与成果沉淀</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          value="92.5"
          label="团队协作评分"
          variant="gradient"
        />
        <StatCard
          icon={FileText}
          value="12"
          label="文档版本迭代"
          iconColor="text-orange-500"
        />
        <StatCard
          icon={CheckCircle2}
          value="4"
          label="核心技能提升"
          iconColor="text-green-500"
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6">
        <RadarChart />
        <ConversionPath />
      </div>
    </div>
  );
};

export default Report;
