import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  className?: string;
}

const styleBase =
  'text-sm border-border rounded-xl bg-bg/80 w-full border px-4 py-2';

export const Input = ({ id, label, className = '', ...rest }: Props) => {
  return (
    <div className="flex w-full flex-col text-center">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <input id={id} className={`${styleBase} ${className}`} {...rest} />
    </div>
  );
};
