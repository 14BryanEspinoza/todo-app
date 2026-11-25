import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(5, 'La tarea tiene que tener mas de 4 caracteres')
    .max(50, 'La tarea no puede superar los 50 caracteres'),
});

export type TaskFormValue = z.infer<typeof taskSchema>;
