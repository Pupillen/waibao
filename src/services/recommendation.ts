/**
 * 个性化推荐引擎
 * 基于用户画像计算赛事匹配度
 */

import type {
  Competition,
  RankedCompetition,
  CompetitionFilter,
  Discipline,
  DifficultyLevel,
  PartialUserProfile,
} from '@/types';
import { MAJOR_TO_DISCIPLINE, INTEREST_TO_DISCIPLINE } from '@/types';

/**
 * 计算单个赛事的匹配度分数
 * @returns 0-100 的匹配度分数
 */
export function calculateMatchScore(
  competition: Competition,
  userProfile: PartialUserProfile
): number {
  let score = 50; // 基础分
  const weights = {
    discipline: 30,    // 学科匹配权重
    difficulty: 20,    // 难度适配权重
    interest: 25,      // 兴趣匹配权重
    experience: 15,    // 经历适配权重
    preference: 10,    // 偏好匹配权重
  };

  // 1. 学科匹配
  if (userProfile.major) {
    const majorDisciplines = MAJOR_TO_DISCIPLINE[userProfile.major] || [];
    if (majorDisciplines.includes(competition.tags.discipline)) {
      score += weights.discipline;
    } else if (competition.tags.discipline === '综合类' || competition.tags.discipline === '创新创业') {
      score += weights.discipline * 0.5; // 综合类和创新创业对所有专业有一定匹配
    }
  }

  // 2. 兴趣匹配
  if (userProfile.interests && userProfile.interests.length > 0) {
    let interestMatchCount = 0;
    for (const interest of userProfile.interests) {
      const interestDisciplines = INTEREST_TO_DISCIPLINE[interest] || [];
      if (interestDisciplines.includes(competition.tags.discipline)) {
        interestMatchCount++;
      }
      // 关键词匹配
      const interestKeywords = interest.toLowerCase();
      if (competition.keywords.some(kw => kw.toLowerCase().includes(interestKeywords))) {
        interestMatchCount++;
      }
    }
    const interestScore = Math.min(interestMatchCount / userProfile.interests.length, 1);
    score += weights.interest * interestScore;
  }

  // 3. 难度适配
  const difficultyOrder: DifficultyLevel[] = ['入门', '进阶', '挑战', '顶尖'];
  const competitionDiffIndex = difficultyOrder.indexOf(competition.tags.difficulty);

  if (userProfile.experience) {
    if (userProfile.experience.hasCompetitionExp) {
      // 有经验：推荐进阶及以上
      if (competitionDiffIndex >= 1) {
        score += weights.difficulty;
      } else {
        score += weights.difficulty * 0.5;
      }
    } else {
      // 无经验：推荐入门和进阶
      if (competitionDiffIndex <= 1) {
        score += weights.difficulty;
      } else if (competitionDiffIndex === 2) {
        score += weights.difficulty * 0.3;
      }
    }
  } else if (userProfile.grade) {
    // 根据年级推测
    if (userProfile.grade === 1) {
      // 大一：入门优先
      score += weights.difficulty * (competitionDiffIndex === 0 ? 1 : competitionDiffIndex === 1 ? 0.7 : 0.3);
    } else if (userProfile.grade === 2) {
      // 大二：入门和进阶
      score += weights.difficulty * (competitionDiffIndex <= 1 ? 1 : 0.5);
    } else {
      // 大三四：进阶及以上
      score += weights.difficulty * (competitionDiffIndex >= 1 ? 1 : 0.6);
    }
  }

  // 4. 经历加成
  if (userProfile.experience?.hasCompetitionExp) {
    // 有经验者对高含金量赛事加分
    if (['S+', 'S', 'A'].includes(competition.tags.value)) {
      score += weights.experience;
    }
  } else {
    // 无经验者对B、C级赛事加分（降低门槛）
    if (['B', 'C'].includes(competition.tags.value)) {
      score += weights.experience * 0.5;
    }
  }

  // 5. 时间投入偏好
  if (userProfile.preferences?.timeCommitment) {
    const cycleEffort: Record<string, 'low' | 'medium' | 'high'> = {
      '月赛': 'low',
      '季赛': 'medium',
      '半年赛': 'medium',
      '年赛': 'high',
    };
    if (cycleEffort[competition.tags.cycle] === userProfile.preferences.timeCommitment) {
      score += weights.preference;
    } else {
      score += weights.preference * 0.4;
    }
  }

  // 确保分数在 0-100 范围内
  return Math.min(Math.max(Math.round(score), 0), 100);
}

/**
 * 生成匹配理由
 */
function generateMatchReason(
  competition: Competition,
  userProfile: PartialUserProfile
): string {
  const reasons: string[] = [];

  if (userProfile.major) {
    const majorDisciplines = MAJOR_TO_DISCIPLINE[userProfile.major] || [];
    if (majorDisciplines.includes(competition.tags.discipline)) {
      reasons.push(`与${userProfile.major}专业高度相关`);
    }
  }

  if (userProfile.interests) {
    for (const interest of userProfile.interests) {
      const interestDisciplines = INTEREST_TO_DISCIPLINE[interest] || [];
      if (interestDisciplines.includes(competition.tags.discipline)) {
        reasons.push(`符合${interest}兴趣`);
        break;
      }
    }
  }

  if (userProfile.experience && !userProfile.experience.hasCompetitionExp) {
    if (competition.tags.difficulty === '入门') {
      reasons.push('适合初次参赛');
    }
  }

  if (['S+', 'S'].includes(competition.tags.value)) {
    reasons.push('高含金量赛事');
  }

  return reasons.slice(0, 2).join('，') || '热门推荐';
}

/**
 * 获取个性化推荐的赛事列表
 */
export function getRecommendedCompetitions(
  competitions: Competition[],
  userProfile: PartialUserProfile,
  limit: number = 10
): RankedCompetition[] {
  // 计算每个赛事的匹配度
  const rankedCompetitions: RankedCompetition[] = competitions.map(comp => ({
    ...comp,
    match: calculateMatchScore(comp, userProfile),
    matchReason: generateMatchReason(comp, userProfile),
  }));

  // 按匹配度排序
  rankedCompetitions.sort((a, b) => b.match - a.match);

  // 返回前 N 个
  return rankedCompetitions.slice(0, limit);
}

/**
 * 应用筛选条件
 */
export function filterCompetitions(
  competitions: Competition[],
  filter: CompetitionFilter
): Competition[] {
  return competitions.filter(comp => {
    // 学科筛选
    if (filter.disciplines && filter.disciplines.length > 0) {
      if (!filter.disciplines.includes(comp.tags.discipline)) {
        return false;
      }
    }

    // 难度筛选
    if (filter.difficulties && filter.difficulties.length > 0) {
      if (!filter.difficulties.includes(comp.tags.difficulty)) {
        return false;
      }
    }

    // 周期筛选
    if (filter.cycles && filter.cycles.length > 0) {
      if (!filter.cycles.includes(comp.tags.cycle)) {
        return false;
      }
    }

    // 含金量筛选
    if (filter.values && filter.values.length > 0) {
      if (!filter.values.includes(comp.tags.value)) {
        return false;
      }
    }

    // 关键词搜索
    if (filter.keyword && filter.keyword.trim()) {
      const keyword = filter.keyword.toLowerCase();
      const searchFields = [
        comp.title,
        comp.organizer,
        comp.description,
        ...comp.keywords,
      ].map(s => s.toLowerCase());

      if (!searchFields.some(field => field.includes(keyword))) {
        return false;
      }
    }

    return true;
  });
}

/**
 * 综合筛选和推荐
 * 先筛选，再按匹配度排序
 */
export function getFilteredAndRankedCompetitions(
  competitions: Competition[],
  filter: CompetitionFilter,
  userProfile?: PartialUserProfile,
  limit?: number
): RankedCompetition[] {
  // 先筛选
  let filtered = filterCompetitions(competitions, filter);

  // 如果有用户画像，计算匹配度并排序
  if (userProfile && Object.keys(userProfile).length > 0) {
    const ranked = filtered.map(comp => ({
      ...comp,
      match: calculateMatchScore(comp, userProfile),
      matchReason: generateMatchReason(comp, userProfile),
    }));
    ranked.sort((a, b) => b.match - a.match);
    return limit ? ranked.slice(0, limit) : ranked;
  }

  // 无用户画像时，按含金量排序
  const valueOrder = { 'S+': 5, 'S': 4, 'A': 3, 'B': 2, 'C': 1 };
  const sorted = filtered.sort((a, b) =>
    (valueOrder[b.tags.value] || 0) - (valueOrder[a.tags.value] || 0)
  );

  // 转换为 RankedCompetition（无匹配度）
  const result: RankedCompetition[] = sorted.map(comp => ({
    ...comp,
    match: 0, // 无用户画像时不显示匹配度
  }));

  return limit ? result.slice(0, limit) : result;
}

/**
 * 获取热门推荐（无需用户画像）
 */
export function getHotCompetitions(
  competitions: Competition[],
  limit: number = 6
): Competition[] {
  // 按含金量和难度综合排序
  const valueScore = { 'S+': 100, 'S': 80, 'A': 60, 'B': 40, 'C': 20 };
  const difficultyScore = { '入门': 10, '进阶': 25, '挑战': 35, '顶尖': 40 };

  return [...competitions]
    .sort((a, b) => {
      const scoreA = (valueScore[a.tags.value] || 0) + (difficultyScore[a.tags.difficulty] || 0);
      const scoreB = (valueScore[b.tags.value] || 0) + (difficultyScore[b.tags.difficulty] || 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * 按学科分组
 */
export function groupByDiscipline(
  competitions: Competition[]
): Record<Discipline, Competition[]> {
  const groups: Record<string, Competition[]> = {};

  for (const comp of competitions) {
    const discipline = comp.tags.discipline;
    if (!groups[discipline]) {
      groups[discipline] = [];
    }
    groups[discipline].push(comp);
  }

  return groups as Record<Discipline, Competition[]>;
}
