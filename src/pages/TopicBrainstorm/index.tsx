import React, { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';

const INITIAL_MESSAGE: ChatMessageType = {
  role: 'ai',
  content:
    '你好！我是你的选题助手。请告诉我你感兴趣的领域（如：乡村振兴、智慧医疗、碳中和），我来为你生成几个有竞争力的选题方向。',
};

const TopicBrainstorm: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: `基于"${userMsg}"和当前热点，我为你构思了以下三个方向：

1. **基于多模态大模型的${userMsg}辅助诊断系统**
   创新点：结合CV与NLP技术，解决传统痛点。

2. **"${userMsg}"全产业链溯源与价值评估平台**
   创新点：区块链技术应用，数据透明化。

3. **面向老龄化社区的${userMsg}智能监护终端**
   创新点：边缘计算，低功耗，适老化设计。`,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
};

export default TopicBrainstorm;
