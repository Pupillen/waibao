import React from 'react';
import { TASKS } from '@/data/mock';
import { TeamAvatars } from './TeamAvatars';
import { KanbanColumn } from './KanbanColumn';

const Workspace: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">项目：智慧养老监护系统</h2>
          <p className="text-slate-500 text-sm mt-1">距离省赛截止还有 15 天</p>
        </div>
        <TeamAvatars />
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        {Object.entries(TASKS).map(([status, items]) => (
          <KanbanColumn key={status} status={status} tasks={items} />
        ))}
      </div>
    </div>
  );
};

export default Workspace;
