import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';

const getPageTitle = (pathname: string): string => {
  const titles: Record<string, string> = {
    '/': '赛事探索',
    '/brainstorm': '智能选题',
    '/team': '组队广场',
    '/workspace': '协作空间',
    '/editor': '智能创作',
    '/defense': '答辩演练',
    '/report': '复盘沉淀',
  };
  return titles[pathname] || '当前模块';
};

export const Header: React.FC = () => {
  const [notification] = useState(true);
  const location = useLocation();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="text-slate-400 text-sm flex items-center gap-2">
        首页 <ChevronRight size={14} /> {getPageTitle(location.pathname)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          {notification && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
          升级 Pro 版
        </button>
      </div>
    </header>
  );
};
