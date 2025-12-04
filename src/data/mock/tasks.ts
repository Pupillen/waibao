import type { TaskBoard } from '@/types';

export const TASKS: TaskBoard = {
  todo: [
    { id: 1, title: '完成竞品分析报告', tag: '文档' },
    { id: 2, title: '联系指导老师签字', tag: '外联' }
  ],
  doing: [
    { id: 3, title: '核心算法代码复现', tag: '开发' }
  ],
  done: [
    { id: 4, title: '组建核心团队', tag: '管理' }
  ]
};
