import React from 'react';
import { Sparkles, RefreshCw, ChevronRight, Loader2, Zap, Target } from 'lucide-react';
import type { RankedCompetition, PartialUserProfile } from '@/types';

interface AIInsightBannerProps {
  userProfile?: PartialUserProfile;
  recommendations?: RankedCompetition[];
  summary?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onViewAll?: () => void;
  onOpenGuidance?: () => void;
}

// 根据用户画像生成个性化提示
function generateProfileSummary(profile: PartialUserProfile): string {
  const parts: string[] = [];

  if (profile.major) {
    parts.push(profile.major);
  }
  if (profile.grade) {
    parts.push(`大${['一', '二', '三', '四'][profile.grade - 1]}`);
  }
  if (profile.interests && profile.interests.length > 0) {
    parts.push(`对${profile.interests.slice(0, 2).join('、')}感兴趣`);
  }

  return parts.length > 0 ? parts.join(' · ') : '';
}

// 静态横幅（无用户画像时）
const StaticBanner: React.FC<{ onOpenGuidance?: () => void }> = ({ onOpenGuidance }) => (
  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 p-6 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="bg-white p-3 rounded-full shadow-sm text-violet-600">
        <Sparkles size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-violet-900 text-lg">开启你的竞赛之旅</h3>
        <p className="text-violet-700 text-sm mt-2 leading-relaxed">
          让 AI 助手了解你的专业背景和兴趣方向，为你推荐最适合的竞赛。
          只需回答几个简单问题，即可获得个性化推荐！
        </p>
        {onOpenGuidance && (
          <button
            onClick={onOpenGuidance}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-sm"
          >
            <Zap size={16} />
            开始智能匹配
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  </div>
);

// 加载中状态
const LoadingBanner: React.FC = () => (
  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 p-6 rounded-xl">
    <div className="flex items-center gap-4">
      <div className="bg-white p-3 rounded-full shadow-sm text-violet-600">
        <Loader2 size={24} className="animate-spin" />
      </div>
      <div>
        <h3 className="font-semibold text-violet-900">AI 正在分析中...</h3>
        <p className="text-violet-600 text-sm mt-1">
          正在根据你的画像计算最佳匹配赛事
        </p>
      </div>
    </div>
  </div>
);

// 动态推荐横幅
const DynamicBanner: React.FC<AIInsightBannerProps> = ({
  userProfile,
  recommendations,
  summary,
  onRefresh,
  onViewAll,
}) => {
  const profileSummary = userProfile ? generateProfileSummary(userProfile) : '';
  const topRecommendations = recommendations?.slice(0, 3) || [];

  return (
    <div className="bg-gradient-to-r from-violet-50 via-indigo-50 to-purple-50 border border-violet-100 p-6 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-violet-900">AI 智能推荐</h3>
              {profileSummary && (
                <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-full">
                  {profileSummary}
                </span>
              )}
            </div>
            <p className="text-violet-700 text-sm mt-1">
              {summary || '根据您的画像为您精选了以下赛事'}
            </p>
          </div>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-violet-100 rounded-lg transition-colors text-violet-600"
            title="刷新推荐"
          >
            <RefreshCw size={18} />
          </button>
        )}
      </div>

      {/* Recommendation Preview */}
      {topRecommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {topRecommendations.map((comp) => (
            <div
              key={comp.id}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-violet-100 hover:border-violet-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-800 text-sm truncate">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {comp.tags.discipline} · {comp.tags.difficulty}
                  </p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  comp.match >= 90 ? 'bg-violet-100 text-violet-700' :
                  comp.match >= 80 ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  <Target size={10} />
                  {comp.match}%
                </div>
              </div>
              {comp.matchReason && (
                <p className="text-xs text-violet-600 mt-2 line-clamp-1">
                  {comp.matchReason}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {onViewAll && recommendations && recommendations.length > 3 && (
        <button
          onClick={onViewAll}
          className="w-full py-2 text-center text-sm text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          查看全部 {recommendations.length} 条推荐
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export const AIInsightBanner: React.FC<AIInsightBannerProps> = (props) => {
  const { userProfile, isLoading, onOpenGuidance } = props;

  // 无用户画像时显示静态横幅
  if (!userProfile || Object.keys(userProfile).length === 0) {
    return <StaticBanner onOpenGuidance={onOpenGuidance} />;
  }

  // 加载中
  if (isLoading) {
    return <LoadingBanner />;
  }

  // 有用户画像时显示动态推荐
  return <DynamicBanner {...props} />;
};
