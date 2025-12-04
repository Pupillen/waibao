import React from 'react';
import { UserPlus } from 'lucide-react';
import { Card, Avatar, Badge, SkillBar } from '@/components/ui';
import type { TeamMember } from '@/types';

interface MemberCardProps {
  member: TeamMember;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => (
  <Card className="p-6">
    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <Avatar size="lg">{member.avatar}</Avatar>
      <div>
        <h3 className="font-bold text-lg">{member.name}</h3>
        <Badge variant="violet">{member.role}</Badge>
      </div>
    </div>

    {/* Skills */}
    <div className="space-y-3 mb-6">
      <SkillBar label="代码" value={member.skills.code} color="blue" />
      <SkillBar label="设计" value={member.skills.design} color="pink" />
      <SkillBar label="文案" value={member.skills.write} color="orange" />
    </div>

    {/* Action Button */}
    <button className="w-full py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 font-medium flex items-center justify-center gap-2 transition-colors">
      <UserPlus size={16} /> 邀请组队
    </button>
  </Card>
);
