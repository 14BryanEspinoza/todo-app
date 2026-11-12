import { type Control, type FieldError, Controller } from 'react-hook-form';
import { type TaskFormType } from '@/models/schema';

interface Props {
  name: keyof TaskFormType;
  control: Control<TaskFormType>;
  label: string;
  type?: string;
  error?: FieldError;
}

const styleBase = 'border-border bg-bg/80 w-full rounded-xl border px-4 py-2';

export const Input = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="flex w-full flex-col text-center">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            placeholder="Agrega una nueva tarea"
            className={`${styleBase} ${error ? 'border-danger' : ''}`}
          />
        )}
      />
      {error && (
        <p className="text-danger mt-2 text-sm text-balance">{error.message}</p>
      )}
    </div>
  );
};
