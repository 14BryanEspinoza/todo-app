import { z } from 'zod';

export const taskSchema = z.object({
  task: z
    .string()
    .min(4, 'La tarea tiene que tener mas de 4 caracteres')
    .max(20, 'La tarea no puede superar los 20 caracteres'),
});

export type TaskFormType = z.infer<typeof taskSchema>;
