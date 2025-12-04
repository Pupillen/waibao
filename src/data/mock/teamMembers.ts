import type { TeamMember } from '@/types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: '林一',
    role: '全栈开发',
    skills: { code: 90, design: 40, write: 60 },
    avatar: 'L'
  },
  {
    id: 2,
    name: '苏苏',
    role: 'UI设计师',
    skills: { code: 20, design: 95, write: 50 },
    avatar: 'S'
  },
  {
    id: 3,
    name: '陈同学',
    role: '产品经理',
    skills: { code: 30, design: 60, write: 90 },
    avatar: 'C'
  },
];
