// 学科分类
export type Discipline =
  | '计算机'
  | '电子信息'
  | '机械工程'
  | '土木建筑'
  | '经济管理'
  | '文学艺术'
  | '数学建模'
  | '创新创业'
  | '外语'
  | '综合类';

// 难度等级
export type DifficultyLevel = '入门' | '进阶' | '挑战' | '顶尖';

// 赛事周期
export type CompetitionCycle = '月赛' | '季赛' | '半年赛' | '年赛';

// 含金量等级 (保持与原 CompetitionLevel 兼容)
export type ValueLevel = 'S+' | 'S' | 'A' | 'B' | 'C';

// 向后兼容的别名
export type CompetitionLevel = ValueLevel;

// 完整赛事标签
export interface CompetitionTags {
  discipline: Discipline;      // 学科
  difficulty: DifficultyLevel; // 难度
  cycle: CompetitionCycle;     // 周期
  value: ValueLevel;           // 含金量
}

// 扩展后的赛事接口
export interface Competition {
  id: number;
  title: string;
  organizer: string;           // 主办方
  description: string;         // 简介
  tags: CompetitionTags;       // 结构化标签
  keywords: string[];          // 搜索关键词
  deadline: string;            // 报名截止
  website?: string;            // 官网
  requirements?: string[];     // 参赛要求
  awards?: string[];           // 奖项设置
  match?: number;              // 匹配度 0-100 (动态计算)
}

// 带匹配度的赛事 (用于推荐结果)
export interface RankedCompetition extends Competition {
  match: number;               // 匹配度 0-100
  matchReason?: string;        // AI 生成的推荐理由
}

// 筛选条件
export interface CompetitionFilter {
  disciplines?: Discipline[];
  difficulties?: DifficultyLevel[];
  cycles?: CompetitionCycle[];
  values?: ValueLevel[];
  keyword?: string;
}
