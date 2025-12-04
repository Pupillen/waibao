export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskTag = '文档' | '开发' | '外联' | '管理';

export interface Task {
  id: number;
  title: string;
  tag: TaskTag;
}

export interface TaskBoard {
  todo: Task[];
  doing: Task[];
  done: Task[];
}
