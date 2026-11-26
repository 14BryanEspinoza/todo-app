import { storedTasksSchema, type Task } from '@models';

const STORAGE_KEY = 'todo-app/tasks:v1';

export const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    const result = storedTasksSchema.safeParse(parsed);

    return result.success ? result.data : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('No se pudieron guardar las tareas', e);
  }
};
