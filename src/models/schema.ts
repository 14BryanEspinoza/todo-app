import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'La tarea tiene que tener mas de 4 caracteres')
    .max(50, 'La tarea no puede superar los 50 caracteres'),
});

export const storedTaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  completed: z.boolean(),
  createdAt: z.string(),
});

export const storedTasksSchema = z.array(storedTaskSchema);

export type TaskFormValue = z.infer<typeof taskSchema>;
