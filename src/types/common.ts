export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface Comment {
  id: number;
  user: string;
  text: string;
  highlight: string;
}

export interface FeedbackItem {
  type: 'good' | 'warn';
  text: string;
}

export type DefenseStatus = 'idle' | 'recording' | 'analyzing' | 'done';
