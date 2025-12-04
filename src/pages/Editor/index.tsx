import React, { useState, useRef } from 'react';
import type { Comment } from '@/types';
import { EditorToolbar } from './EditorToolbar';
import { EditorCanvas } from './EditorCanvas';
import { AIFloatingMenu } from './AIFloatingMenu';
import { CollaboratorsSidebar } from './CollaboratorsSidebar';
import { CommentList } from './CommentList';

const INITIAL_CONTENT = `<h2>1. 项目背景与意义</h2><p>随着人口老龄化趋势的加剧，空巢老人的健康监护问题日益凸显。传统的养老模式主要依赖人工看护，存在成本高、响应慢、覆盖面窄等问题。</p><p>本项目旨在开发一套基于物联网与边缘计算的智能监护系统。</p>`;

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    user: '王导师',
    text: '这部分数据支撑不足，建议引用《2024中国老龄化发展报告》。',
    highlight: '人口老龄化趋势',
  },
];

const Editor: React.FC = () => {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [showAI, setShowAI] = useState(false);
  const [, setSelectedText] = useState('');
  const [comments] = useState<Comment[]>(INITIAL_COMMENTS);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      setShowAI(true);
    } else {
      setShowAI(false);
    }
  };

  const applyAIPolish = () => {
    const polished = content.replace(
      '传统的养老模式主要依赖人工看护，存在成本高、响应慢、覆盖面窄等问题。',
      '<span class="bg-violet-100 text-violet-900 px-1 rounded">传统养老模式受限于人力资源短缺，普遍面临边际成本递增、应急响应滞后及服务半径受限等结构性痛点。</span>'
    );
    setContent(polished);
    setShowAI(false);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6">
      {/* Main Editor Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
        <EditorToolbar />
        <EditorCanvas ref={editorRef} content={content} onMouseUp={handleSelection} />
        {showAI && <AIFloatingMenu onPolish={applyAIPolish} />}
      </div>

      {/* Sidebar: Comments & Collaboration */}
      <div className="w-80 flex flex-col gap-4">
        <CollaboratorsSidebar />
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default Editor;
