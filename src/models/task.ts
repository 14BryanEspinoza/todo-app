export type TaskId = string;

export interface Task {
  readonly id: TaskId;
  title: string;
  completed: boolean;
  readonly createdAt: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';
