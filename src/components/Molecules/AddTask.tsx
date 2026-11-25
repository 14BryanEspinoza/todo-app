import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { taskSchema } from '@models';
import { Button, Input } from '@components/Atoms';

interface Props {
  onAdd: (title: string) => void;
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);

    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <div className="flex items-center">
        <Input
          id="task-add"
          label="Agregar tarea"
          type="text"
          placeholder="Agregar tarea"
          autoComplete="off"
          value={title}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'task-add-error' : undefined}
          className="rounded-xl"
        />

        <Button
          type="submit"
          className="absolute right-0 rounded-r-xl border border-border bg-primary px-4 py-2 text-sm font-bold text-text-inverse hover:scale-none"
        >
          Agregar
        </Button>
      </div>

      {error && (
        <p id="task-add-error" className="mt-2 ml-6 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
};
