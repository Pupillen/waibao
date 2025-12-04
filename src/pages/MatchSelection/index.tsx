import React, { useState, useCallback, useMemo } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List, Sparkles } from 'lucide-react';
import { COMPETITIONS } from '@/data/mock';
import {
  getRecommendedCompetitions,
  getFilteredAndRankedCompetitions,
  getHotCompetitions,
} from '@/services/recommendation';
import type {
  RankedCompetition,
  CompetitionFilter,
  PartialUserProfile,
} from '@/types';
import { AIInsightBanner } from './AIInsightBanner';
import { CompetitionCard, CompetitionCardCompact } from './CompetitionCard';
import { CompetitionFilters } from './CompetitionFilters';
import { AIGuidanceChat, AIGuidanceTrigger } from './AIGuidanceChat';

type ViewMode = 'grid' | 'list';

const MatchSelection: React.FC = () => {
  // 用户画像状态
  const [userProfile, setUserProfile] = useState<PartialUserProfile>({});

  // 筛选条件
  const [filter, setFilter] = useState<CompetitionFilter>({});
  const [searchKeyword, setSearchKeyword] = useState('');

  // 视图模式
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // AI 对话状态
  const [showGuidance, setShowGuidance] = useState(false);

  // 推荐状态
  const [recommendations, setRecommendations] = useState<RankedCompetition[]>([]);
  const [recommendationSummary, setRecommendationSummary] = useState<string>('');
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // 是否显示筛选面板（移动端）
  const [showFilters, setShowFilters] = useState(false);

  // 合并搜索关键词到筛选条件
  const activeFilter = useMemo(() => ({
    ...filter,
    keyword: searchKeyword,
  }), [filter, searchKeyword]);

  // 计算显示的赛事列表
  const displayCompetitions = useMemo(() => {
    // 如果有用户画像且无筛选条件，显示个性化推荐
    if (Object.keys(userProfile).length > 0 && !searchKeyword &&
        !filter.disciplines?.length && !filter.difficulties?.length &&
        !filter.cycles?.length && !filter.values?.length) {
      return getRecommendedCompetitions(COMPETITIONS, userProfile, 20);
    }

    // 否则显示筛选+排序结果
    return getFilteredAndRankedCompetitions(
      COMPETITIONS,
      activeFilter,
      Object.keys(userProfile).length > 0 ? userProfile : undefined
    );
  }, [userProfile, activeFilter, filter, searchKeyword]);

  // 热门赛事（用于无用户画像时）
  const hotCompetitions = useMemo(() => {
    if (Object.keys(userProfile).length === 0) {
      return getHotCompetitions(COMPETITIONS, 6);
    }
    return [];
  }, [userProfile]);

  // 处理用户画像更新
  const handleProfileUpdate = useCallback((profile: PartialUserProfile) => {
    setUserProfile(profile);
  }, []);

  // 处理 AI 推荐请求
  const handleRecommendationRequest = useCallback(async () => {
    setShowGuidance(false);
    setIsLoadingRecommendations(true);

    try {
      // 使用本地推荐引擎（快速）
      const localRecommendations = getRecommendedCompetitions(COMPETITIONS, userProfile, 10);
      setRecommendations(localRecommendations);
      setRecommendationSummary('根据您的画像为您精选了以下赛事');

      // 可选：调用 AI 增强推荐理由（较慢，可后台执行）
      // const aiResult = await getCompetitionRecommendation(userProfile, COMPETITIONS.slice(0, 30), 10);
      // if (aiResult.competitions.length > 0) {
      //   setRecommendations(aiResult.competitions);
      //   setRecommendationSummary(aiResult.summary);
      // }
    } catch (error) {
      console.error('Recommendation error:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, [userProfile]);

  // 刷新推荐
  const handleRefreshRecommendations = useCallback(() => {
    const newRecommendations = getRecommendedCompetitions(COMPETITIONS, userProfile, 10);
    setRecommendations(newRecommendations);
  }, [userProfile]);

  // 清除筛选
  const handleClearFilter = useCallback(() => {
    setFilter({});
    setSearchKeyword('');
  }, []);

  // 生成页面标题
  const pageTitle = useMemo(() => {
    if (userProfile.major) {
      return `基于「${userProfile.major}」专业的推荐`;
    }
    return '赛事探索';
  }, [userProfile]);

  // 统计信息
  const statsText = useMemo(() => {
    const total = COMPETITIONS.length;
    const shown = displayCompetitions.length;
    if (shown === total) {
      return `共 ${total} 项赛事`;
    }
    return `${shown} / ${total} 项赛事`;
  }, [displayCompetitions.length]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">赛事探索</h2>
          <p className="text-slate-500 mt-1">{pageTitle}</p>
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索竞赛..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`md:hidden p-2.5 rounded-lg border transition-colors ${
              showFilters ? 'border-violet-200 bg-violet-50 text-violet-600' : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>

          {/* View Toggle */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <AIInsightBanner
        userProfile={userProfile}
        recommendations={recommendations.length > 0 ? recommendations : undefined}
        summary={recommendationSummary}
        isLoading={isLoadingRecommendations}
        onRefresh={handleRefreshRecommendations}
        onOpenGuidance={() => setShowGuidance(true)}
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <CompetitionFilters
            filter={filter}
            onChange={setFilter}
            onClear={handleClearFilter}
          />
        </div>

        {/* Filters (Mobile) */}
        {showFilters && (
          <div className="lg:hidden">
            <CompetitionFilters
              filter={filter}
              onChange={setFilter}
              onClear={handleClearFilter}
            />
          </div>
        )}

        {/* Competition List */}
        <div className="flex-1">
          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500">{statsText}</span>
            {Object.keys(userProfile).length > 0 && (
              <span className="text-xs text-violet-600 flex items-center gap-1">
                <Sparkles size={12} />
                已开启个性化推荐
              </span>
            )}
          </div>

          {/* Hot Recommendations (无用户画像时) */}
          {hotCompetitions.length > 0 && Object.keys(userProfile).length === 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">热门推荐</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotCompetitions.slice(0, 3).map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </div>
          )}

          {/* Competition Grid/List */}
          {displayCompetitions.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {displayCompetitions.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {displayCompetitions.map((comp) => (
                  <CompetitionCardCompact key={comp.id} competition={comp} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-2">
                <Search size={48} className="mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-slate-600">未找到匹配的赛事</h3>
              <p className="text-slate-500 text-sm mt-1">
                试试调整筛选条件或搜索关键词
              </p>
              <button
                onClick={handleClearFilter}
                className="mt-4 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors text-sm"
              >
                清除所有筛选
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Guidance Chat */}
      <AIGuidanceChat
        isOpen={showGuidance}
        onClose={() => setShowGuidance(false)}
        currentProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
        onRecommendationRequest={handleRecommendationRequest}
      />

      {/* AI Guidance Trigger Button */}
      {!showGuidance && (
        <AIGuidanceTrigger onClick={() => setShowGuidance(true)} />
      )}
    </div>
  );
};

export default MatchSelection;
