import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, MessageCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui';
import { guidanceChat, type ChatMessage } from '@/services/llm';
import type { PartialUserProfile, Major, Interest } from '@/types';

interface AIGuidanceChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: PartialUserProfile;
  onProfileUpdate: (profile: PartialUserProfile) => void;
  onRecommendationRequest: () => void;
}

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

// 从对话中提取用户信息的辅助函数
function extractProfileFromMessage(message: string, currentProfile: PartialUserProfile): PartialUserProfile {
  const updates: PartialUserProfile = { ...currentProfile };

  // 专业提取
  const majorPatterns: { pattern: RegExp; major: Major }[] = [
    { pattern: /计算机|cs|软件/i, major: '计算机科学与技术' },
    { pattern: /软件工程/i, major: '软件工程' },
    { pattern: /人工智能|ai/i, major: '人工智能' },
    { pattern: /数据科学|大数据/i, major: '数据科学' },
    { pattern: /电子信息|电子工程/i, major: '电子信息工程' },
    { pattern: /通信/i, major: '通信工程' },
    { pattern: /自动化/i, major: '自动化' },
    { pattern: /机械/i, major: '机械工程' },
    { pattern: /土木/i, major: '土木工程' },
    { pattern: /建筑/i, major: '建筑学' },
    { pattern: /经济/i, major: '经济学' },
    { pattern: /管理/i, major: '管理学' },
    { pattern: /金融/i, major: '金融学' },
    { pattern: /会计/i, major: '会计学' },
    { pattern: /英语/i, major: '英语' },
    { pattern: /日语/i, major: '日语' },
    { pattern: /设计/i, major: '设计学' },
  ];

  for (const { pattern, major } of majorPatterns) {
    if (pattern.test(message)) {
      updates.major = major;
      break;
    }
  }

  // 年级提取
  const gradeMatch = message.match(/大([一二三四1234])|([一二三四1234])年级/);
  if (gradeMatch) {
    const gradeMap: Record<string, 1 | 2 | 3 | 4> = {
      '一': 1, '1': 1,
      '二': 2, '2': 2,
      '三': 3, '3': 3,
      '四': 4, '4': 4,
    };
    const gradeStr = gradeMatch[1] || gradeMatch[2];
    if (gradeStr && gradeMap[gradeStr]) {
      updates.grade = gradeMap[gradeStr];
    }
  }

  // 兴趣提取
  const interestPatterns: { pattern: RegExp; interest: Interest }[] = [
    { pattern: /算法|acm|oi|蓝桥/i, interest: '算法竞赛' },
    { pattern: /项目|开发|软件/i, interest: '项目开发' },
    { pattern: /硬件|电路|嵌入式/i, interest: '硬件设计' },
    { pattern: /数学建模|数模/i, interest: '数学建模' },
    { pattern: /商业|商赛|市场/i, interest: '商业分析' },
    { pattern: /创业|创新创业/i, interest: '创新创业' },
    { pattern: /研究|学术/i, interest: '学术研究' },
    { pattern: /文案|写作/i, interest: '文案写作' },
    { pattern: /设计|ui|ux/i, interest: '设计创意' },
    { pattern: /ai|人工智能|机器学习/i, interest: 'AI应用' },
    { pattern: /数据分析|数据挖掘/i, interest: '数据分析' },
    { pattern: /嵌入式|单片机/i, interest: '嵌入式系统' },
  ];

  const foundInterests: Interest[] = [...(currentProfile.interests || [])];
  for (const { pattern, interest } of interestPatterns) {
    if (pattern.test(message) && !foundInterests.includes(interest)) {
      foundInterests.push(interest);
    }
  }
  if (foundInterests.length > 0) {
    updates.interests = foundInterests;
  }

  // 经历提取
  if (/没.*参加|没.*经历|没有.*经验|第一次|新手|小白/i.test(message)) {
    updates.experience = {
      hasCompetitionExp: false,
    };
  } else if (/参加过|参赛|获奖|拿过|得过/i.test(message)) {
    updates.experience = {
      ...currentProfile.experience,
      hasCompetitionExp: true,
    };
  }

  // 偏好提取
  if (/团队|组队|队友|一起/i.test(message)) {
    updates.preferences = {
      ...currentProfile.preferences,
      preferTeam: true,
      preferIndividual: false,
      timeCommitment: currentProfile.preferences?.timeCommitment || 'medium',
    };
  } else if (/个人|独自|一个人|单独/i.test(message)) {
    updates.preferences = {
      ...currentProfile.preferences,
      preferTeam: false,
      preferIndividual: true,
      timeCommitment: currentProfile.preferences?.timeCommitment || 'medium',
    };
  }

  return updates;
}

// 检查画像是否足够用于推荐
function isProfileSufficient(profile: PartialUserProfile): boolean {
  return !!(profile.major && profile.interests && profile.interests.length > 0);
}

export const AIGuidanceChat: React.FC<AIGuidanceChatProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onProfileUpdate,
  onRecommendationRequest,
}) => {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是你的竞赛推荐助手 。告诉我一下你的专业和年级，我来为你推荐最适合的比赛！',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 打开时聚焦输入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // 添加用户消息
    const userMsgId = `user-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: userMsgId,
      role: 'user',
      content: userMessage,
    }]);

    // 提取并更新用户画像
    const updatedProfile = extractProfileFromMessage(userMessage, currentProfile);
    onProfileUpdate(updatedProfile);

    // 创建 AI 响应占位
    const aiMsgId = `ai-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    }]);

    setIsLoading(true);

    try {
      // 构建对话历史
      const chatHistory: ChatMessage[] = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content,
        }));

      // 流式获取响应
      let fullContent = '';
      for await (const chunk of guidanceChat(updatedProfile, userMessage, chatHistory)) {
        fullContent += chunk;
        setMessages(prev => prev.map(m =>
          m.id === aiMsgId ? { ...m, content: fullContent } : m
        ));
      }

      // 完成流式响应
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId ? { ...m, isStreaming: false } : m
      ));

      // 检查是否可以推荐
      if (isProfileSufficient(updatedProfile)) {
        // 延迟显示推荐按钮提示
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `hint-${Date.now()}`,
            role: 'assistant',
            content: '我已经了解你的基本情况了！点击下方按钮，我来为你推荐最适合的竞赛吧！',
          }]);
        }, 500);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId
          ? { ...m, content: '抱歉，我遇到了一些问题。请再试一次吧！', isStreaming: false }
          : m
      ));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, currentProfile, onProfileUpdate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const canRecommend = isProfileSufficient(currentProfile);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg h-[600px] flex flex-col bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">AI 竞赛顾问</h3>
              <p className="text-xs text-slate-500">为你量身推荐最适合的比赛</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-violet-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                  {message.isStreaming && (
                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-current animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Profile Summary (if any) */}
        {(currentProfile.major || currentProfile.interests?.length) && (
          <div className="px-5 py-2 bg-slate-50 border-t border-slate-100">
            <div className="flex flex-wrap gap-2 text-xs">
              {currentProfile.major && (
                <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full">
                  {currentProfile.major}
                </span>
              )}
              {currentProfile.grade && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  大{['一', '二', '三', '四'][currentProfile.grade - 1]}
                </span>
              )}
              {currentProfile.interests?.slice(0, 3).map(interest => (
                <span key={interest} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="px-5 py-4 border-t border-slate-100">
          {canRecommend && (
            <button
              onClick={onRecommendationRequest}
              className="w-full mb-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              为我推荐竞赛
            </button>
          )}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的专业、兴趣或问题..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 触发按钮组件
export const AIGuidanceTrigger: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-40"
  >
    <MessageCircle className="w-6 h-6" />
  </button>
);
