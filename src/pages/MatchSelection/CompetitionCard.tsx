import React from 'react';
import { Clock, ExternalLink, Trophy, Target, Calendar, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui';
import type { Competition, RankedCompetition } from '@/types';

interface CompetitionCardProps {
  competition: Competition | RankedCompetition;
  onClick?: () => void;
}

// 难度对应的颜色
const difficultyColors: Record<string, string> = {
  '入门': 'bg-emerald-100 text-emerald-700',
  '进阶': 'bg-blue-100 text-blue-700',
  '挑战': 'bg-orange-100 text-orange-700',
  '顶尖': 'bg-red-100 text-red-700',
};

// 含金量对应的颜色
const valueColors: Record<string, string> = {
  'S+': 'bg-yellow-100 text-yellow-700',
  'S': 'bg-amber-100 text-amber-700',
  'A': 'bg-violet-100 text-violet-700',
  'B': 'bg-slate-100 text-slate-700',
  'C': 'bg-gray-100 text-gray-600',
};

// 学科对应的图标颜色
const disciplineColors: Record<string, string> = {
  '计算机': 'bg-blue-500',
  '电子信息': 'bg-cyan-500',
  '机械工程': 'bg-slate-500',
  '土木建筑': 'bg-orange-500',
  '经济管理': 'bg-emerald-500',
  '文学艺术': 'bg-pink-500',
  '数学建模': 'bg-purple-500',
  '创新创业': 'bg-rose-500',
  '外语': 'bg-indigo-500',
  '综合类': 'bg-gray-500',
};

export const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, onClick }) => {
  const hasMatch = 'match' in competition && competition.match !== undefined;
  const matchScore = hasMatch ? (competition as RankedCompetition).match : undefined;
  const matchReason = hasMatch ? (competition as RankedCompetition).matchReason : undefined;

  return (
    <Card
      className="p-5 flex flex-col justify-between h-56 group cursor-pointer relative overflow-hidden hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {/* Match Badge - 只有带匹配度时显示 */}
      {matchScore !== undefined && (
        <div className={`absolute top-0 right-0 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl ${
          matchScore >= 90 ? 'bg-gradient-to-r from-violet-600 to-indigo-600' :
          matchScore >= 80 ? 'bg-violet-600' :
          matchScore >= 70 ? 'bg-blue-600' :
          'bg-slate-500'
        }`}>
          <div className="flex items-center gap-1">
            <Target size={12} />
            匹配 {matchScore}%
          </div>
        </div>
      )}

      <div>
        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* 学科标签 */}
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${disciplineColors[competition.tags.discipline] || 'bg-gray-500'}`}>
            <BookOpen size={10} />
            {competition.tags.discipline}
          </span>
          {/* 难度标签 */}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[competition.tags.difficulty]}`}>
            {competition.tags.difficulty}
          </span>
          {/* 含金量标签 */}
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${valueColors[competition.tags.value]}`}>
            <Trophy size={10} />
            {competition.tags.value}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-slate-800 group-hover:text-violet-600 transition-colors line-clamp-2 mb-1">
          {competition.title}
        </h3>

        {/* Organizer */}
        <p className="text-xs text-slate-500 line-clamp-1">
          {competition.organizer}
        </p>

        {/* Match Reason */}
        {matchReason && (
          <p className="text-xs text-violet-600 mt-2 line-clamp-1">
            {matchReason}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={12} />
          <span>{competition.deadline}</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar size={12} />
          <span>{competition.tags.cycle}</span>
        </span>
        {competition.website && (
          <a
            href={competition.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700"
          >
            <ExternalLink size={12} />
            官网
          </a>
        )}
      </div>
    </Card>
  );
};

// 紧凑版卡片用于列表展示
export const CompetitionCardCompact: React.FC<CompetitionCardProps> = ({ competition, onClick }) => {
  const hasMatch = 'match' in competition && competition.match !== undefined;
  const matchScore = hasMatch ? (competition as RankedCompetition).match : undefined;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-violet-200 cursor-pointer transition-all group"
    >
      {/* Match Score Circle */}
      {matchScore !== undefined && (
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          matchScore >= 90 ? 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white' :
          matchScore >= 80 ? 'bg-violet-100 text-violet-700' :
          matchScore >= 70 ? 'bg-blue-100 text-blue-700' :
          'bg-slate-100 text-slate-600'
        }`}>
          <span className="text-sm font-bold">{matchScore}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors truncate">
          {competition.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className={`px-2 py-0.5 rounded text-xs ${difficultyColors[competition.tags.difficulty]}`}>
            {competition.tags.difficulty}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs ${valueColors[competition.tags.value]}`}>
            {competition.tags.value}
          </span>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-500">{competition.deadline}</span>
        </div>
      </div>

      {/* Arrow */}
      <ExternalLink size={16} className="text-slate-300 group-hover:text-violet-500 transition-colors flex-shrink-0" />
    </div>
  );
};
