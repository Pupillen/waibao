import React from 'react';
import { PenTool } from 'lucide-react';

export const EditorToolbar: React.FC = () => (
  <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
    <div className="flex gap-1 border-r border-slate-200 pr-3 mr-1">
      <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 font-bold">B</button>
      <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 italic">I</button>
      <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 underline">U</button>
    </div>
    <div className="flex gap-1">
      <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 flex gap-1 items-center text-sm">
        <PenTool size={14} /> 标题 1
      </button>
    </div>
    <div className="ml-auto text-xs text-slate-400 flex items-center gap-2">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span> 自动保存于 10:42
    </div>
  </div>
);
