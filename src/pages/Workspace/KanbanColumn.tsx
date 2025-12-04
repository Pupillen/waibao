import React from 'react';
import { Plus } from 'lucide-react';
import type { Task } from '@/types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  status: string;
  tasks: Task[];
}

const statusLabels: Record<string, string> = {
  todo: '待处理',
  doing: '进行中',
  done: '已完成',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks }) => (
  <div className="bg-slate-50 rounded-xl p-4 flex flex-col h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-slate-600 uppercase text-xs tracking-wider">
        {statusLabels[status] || status}
      </h3>
      <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">
        {tasks.length}
      </span>
    </div>
    <div className="space-y-3 overflow-y-auto flex-1">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <button className="w-full py-2 text-slate-400 text-sm hover:bg-slate-200 rounded-lg border border-dashed border-slate-300 flex items-center justify-center gap-1">
        <Plus size={14} /> 新建任务
      </button>
    </div>
  </div>
);
