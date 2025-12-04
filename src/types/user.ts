// 用户专业
export type Major =
  | '计算机科学与技术'
  | '软件工程'
  | '人工智能'
  | '数据科学'
  | '电子信息工程'
  | '通信工程'
  | '自动化'
  | '机械工程'
  | '土木工程'
  | '建筑学'
  | '经济学'
  | '管理学'
  | '金融学'
  | '会计学'
  | '英语'
  | '日语'
  | '设计学'
  | '其他';

// 兴趣标签
export type Interest =
  | '算法竞赛'
  | '项目开发'
  | '硬件设计'
  | '数学建模'
  | '商业分析'
  | '创新创业'
  | '学术研究'
  | '文案写作'
  | '设计创意'
  | 'AI应用'
  | '数据分析'
  | '嵌入式系统';

// 时间投入意愿
export type TimeCommitment = 'low' | 'medium' | 'high';

// 参赛经历
export interface CompetitionExperience {
  hasCompetitionExp: boolean;      // 是否有参赛经历
  competitionTypes?: string[];     // 参加过的赛事类型
  achievements?: string[];         // 获奖情况
}

// 参赛偏好
export interface CompetitionPreferences {
  preferTeam: boolean;             // 偏好团队赛
  preferIndividual: boolean;       // 偏好个人赛
  timeCommitment: TimeCommitment;  // 时间投入意愿
}

// 用户画像
export interface UserProfile {
  major: Major;
  grade: 1 | 2 | 3 | 4;            // 年级
  interests: Interest[];           // 兴趣 (多选)
  experience: CompetitionExperience;
  preferences: CompetitionPreferences;
}

// 部分用户画像 (用于渐进式收集)
export type PartialUserProfile = Partial<UserProfile>;

// 专业到学科的映射关系
export const MAJOR_TO_DISCIPLINE: Record<Major, string[]> = {
  '计算机科学与技术': ['计算机', '创新创业'],
  '软件工程': ['计算机', '创新创业'],
  '人工智能': ['计算机', '数学建模'],
  '数据科学': ['计算机', '数学建模'],
  '电子信息工程': ['电子信息', '计算机'],
  '通信工程': ['电子信息'],
  '自动化': ['电子信息', '机械工程'],
  '机械工程': ['机械工程'],
  '土木工程': ['土木建筑'],
  '建筑学': ['土木建筑', '文学艺术'],
  '经济学': ['经济管理'],
  '管理学': ['经济管理', '创新创业'],
  '金融学': ['经济管理'],
  '会计学': ['经济管理'],
  '英语': ['外语', '综合类'],
  '日语': ['外语', '综合类'],
  '设计学': ['文学艺术', '创新创业'],
  '其他': ['综合类'],
};

// 兴趣到学科的映射关系
export const INTEREST_TO_DISCIPLINE: Record<Interest, string[]> = {
  '算法竞赛': ['计算机'],
  '项目开发': ['计算机', '创新创业'],
  '硬件设计': ['电子信息'],
  '数学建模': ['数学建模'],
  '商业分析': ['经济管理'],
  '创新创业': ['创新创业'],
  '学术研究': ['综合类'],
  '文案写作': ['文学艺术', '外语'],
  '设计创意': ['文学艺术'],
  'AI应用': ['计算机', '数学建模'],
  '数据分析': ['计算机', '数学建模', '经济管理'],
  '嵌入式系统': ['电子信息', '计算机'],
};
