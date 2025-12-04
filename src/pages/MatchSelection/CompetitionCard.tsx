import React from 'react';
import { Clock } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { Competition } from '@/types';

interface CompetitionCardProps {
  competition: Competition;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => (
  <Card className="p-5 flex flex-col justify-between h-48 group cursor-pointer relative overflow-hidden">
    {/* Match Badge */}
    <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
      匹配度 {competition.match}%
    </div>

    <div>
      {/* Tags */}
      <div className="flex gap-2 mb-3">
        {competition.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg text-slate-800 group-hover:text-violet-600 transition-colors line-clamp-2">
        {competition.title}
      </h3>
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center mt-4 text-sm text-slate-500">
      <span className="flex items-center gap-1">
        <Clock size={14} /> {competition.deadline}
      </span>
      <span className="font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
        Level {competition.level}
      </span>
    </div>
  </Card>
);
