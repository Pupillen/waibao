import React from 'react';
import {
  Compass,
  Lightbulb,
  Users,
  KanbanSquare,
  FileText,
  Video,
  BarChart3
} from 'lucide-react';
import { NavItem } from './NavItem';
import { UserProfile } from './UserProfile';

export const Sidebar: React.FC = () => (
  <aside className="w-64 bg-slate-900 text-white flex flex-col p-4 flex-shrink-0">
    {/* Logo */}
    <div className="flex items-center gap-2 px-2 mb-8 mt-2">
      <div className="w-8 h-8 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
        <Compass size={20} className="text-white" />
      </div>
      <span className="text-xl font-bold tracking-tight">UniCompete AI</span>
    </div>

    {/* Navigation */}
    <nav className="space-y-2 flex-1">
      <NavItem to="/" icon={Compass} label="赛事探索 (1)" />
      <NavItem to="/brainstorm" icon={Lightbulb} label="智能选题 (2)" />
      <NavItem to="/team" icon={Users} label="组队广场 (3)" />
      <NavItem to="/workspace" icon={KanbanSquare} label="协作空间 (4)" />
      <NavItem to="/editor" icon={FileText} label="智能创作 (5/6)" />
      <NavItem to="/defense" icon={Video} label="答辩演练 (9)" />
      <NavItem to="/report" icon={BarChart3} label="复盘沉淀 (10)" />
    </nav>

    {/* User Profile */}
    <UserProfile />
  </aside>
);
