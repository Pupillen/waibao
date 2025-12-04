import React from 'react';
import type { Comment } from '@/types';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <div className="bg-slate-50 rounded-xl p-4 flex-1 overflow-y-auto">
    <h4 className="text-sm font-bold text-slate-700 mb-3 flex justify-between">
      导师批注{' '}
      <span className="bg-slate-200 text-slate-600 px-1.5 rounded text-xs">
        {comments.length}
      </span>
    </h4>
    {comments.map((comment) => (
      <div
        key={comment.id}
        className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm mb-3 cursor-pointer hover:border-violet-300"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-xs text-slate-800">{comment.user}</span>
          <span className="text-[10px] text-slate-400">刚刚</span>
        </div>
        <div className="text-xs text-slate-500 mb-2 border-l-2 border-slate-200 pl-2 italic truncate">
          "{comment.highlight}"
        </div>
        <p className="text-sm text-slate-700">{comment.text}</p>
        <div className="mt-2 flex gap-2">
          <button className="text-xs text-violet-600 font-medium">采纳建议</button>
          <button className="text-xs text-slate-400">回复</button>
        </div>
      </div>
    ))}
  </div>
);
