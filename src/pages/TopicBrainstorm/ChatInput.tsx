import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100 flex gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入关键词，例如：智慧农业..."
        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 focus:ring-2 focus:ring-violet-500 focus:outline-none"
      />
      <button
        onClick={onSend}
        className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-lg transition-colors"
      >
        <Send size={20} />
      </button>
    </div>
  );
};
