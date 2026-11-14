import { type Control, type FieldError, Controller } from 'react-hook-form';
import { type TaskFormValue } from '@models';

interface Props {
  name: keyof TaskFormValue;
  control: Control<TaskFormValue>;
  label: string;
  type?: string;
  error?: FieldError;
  placeholder?: string;
}

const styleBase = 'border-border bg-bg/80 w-full rounded-xl border px-4 py-2';

export const Input = ({
  name,
  control,
  label,
  type,
  error,
  placeholder,
}: Props) => {
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
            placeholder={placeholder}
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
