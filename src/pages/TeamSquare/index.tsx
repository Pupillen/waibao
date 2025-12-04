import React from 'react';
import { AIButton } from '@/components/ui';
import { TEAM_MEMBERS } from '@/data/mock';
import { MemberCard } from './MemberCard';
import { EmptyState } from './EmptyState';

const TeamSquare: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">寻找队友</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            发布招募
          </button>
          <AIButton>AI 智能匹配</AIButton>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
        <EmptyState />
      </div>
    </div>
  );
};

export default TeamSquare;
