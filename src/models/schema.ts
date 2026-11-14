import { z } from 'zod';

export const taskSchema = z.object({
  task: z
    .string()
    .trim()
    .min(5, 'La tarea tiene que tener mas de 4 caracteres')
    .max(20, 'La tarea no puede superar los 20 caracteres'),
});

export type TaskFormValue = z.infer<typeof taskSchema>;
