import { useState, type SubmitEvent } from 'react';
import { taskSchema } from '@/models';
import { Input } from '@components/Atoms';

interface Props {
  onAdd: (task: string) => void;
}

export const AddTask = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = taskSchema.safeParse({ title });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Tarea Invalida');
      return;
    }

    onAdd(result.data.title);
    setTitle('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Input
        id="task-add"
        label="Agregar tarea"
        type="text"
        placeholder="Agregar tarea"
        autoComplete="off"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'task-add-error' : undefined}
      />

      {error && (
        <p id="task-add-error" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
};
