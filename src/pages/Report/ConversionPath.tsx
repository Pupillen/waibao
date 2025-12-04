import React from 'react';
import { Card } from '@/components/ui';

interface PathItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

const pathItems: PathItem[] = [
  {
    id: 1,
    title: '申报大创项目',
    description: '项目成熟度符合国家级大创申报标准，建议重点完善商业计划书。',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: '软著申请',
    description: '核心算法模块代码量已达标，建议立即整理源程序说明书。',
    color: 'bg-purple-100 text-purple-600'
  }
];

export const ConversionPath: React.FC = () => (
  <Card className="p-6">
    <h3 className="font-bold text-slate-800 mb-4">AI 建议转化路径</h3>
    <ul className="space-y-4">
      {pathItems.map((item) => (
        <li key={item.id} className="flex gap-3">
          <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
            {item.id}
          </div>
          <div>
            <h4 className="font-bold text-slate-700">{item.title}</h4>
            <p className="text-sm text-slate-500 mt-1">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </Card>
);
