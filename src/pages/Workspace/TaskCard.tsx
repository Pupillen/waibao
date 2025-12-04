import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui';
import type { Task } from '@/types';

interface TaskCardProps {
  task: Task;
}

const tagStyles: Record<string, string> = {
  '文档': 'bg-blue-50 text-blue-600 border-blue-100',
  '开发': 'bg-purple-50 text-purple-600 border-purple-100',
  '测试': 'bg-green-50 text-green-600 border-green-100',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <Card className="p-3 cursor-move hover:shadow-md">
    <div className="flex gap-2 mb-2">
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded border ${
          tagStyles[task.tag] || 'bg-green-50 text-green-600 border-green-100'
        }`}
      >
        {task.tag}
      </span>
    </div>
    <p className="text-slate-700 font-medium text-sm">{task.title}</p>
    <div className="mt-3 flex justify-between items-center">
      <div className="w-5 h-5 bg-slate-200 rounded-full text-[10px] flex items-center justify-center text-slate-500">
        L
      </div>
      <MoreHorizontal size={14} className="text-slate-400" />
    </div>
  </Card>
);
