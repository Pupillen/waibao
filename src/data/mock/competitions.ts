import type { Competition } from '@/types';

export const COMPETITIONS: Competition[] = [
  {
    id: 1,
    title: '第九届中国国际"互联网+"大学生创新创业大赛',
    level: 'S+',
    tags: ['教育部', '创新创业'],
    match: 98,
    deadline: '5天后'
  },
  {
    id: 2,
    title: '第十八届"挑战杯"全国大学生课外学术科技作品竞赛',
    level: 'S',
    tags: ['团中央', '学术科技'],
    match: 92,
    deadline: '12天后'
  },
  {
    id: 3,
    title: '全国大学生数学建模竞赛',
    level: 'A',
    tags: ['数学', '建模'],
    match: 85,
    deadline: '1个月后'
  },
];
