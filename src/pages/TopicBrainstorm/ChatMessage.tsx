import React from 'react';
import { Sparkles } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? 'bg-violet-600 text-white rounded-br-none'
            : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-violet-600 font-semibold">
            <Sparkles size={16} /> AI 助手
          </div>
        )}
        <div className="whitespace-pre-line leading-relaxed">{message.content}</div>
      </div>
    </div>
  );
};
