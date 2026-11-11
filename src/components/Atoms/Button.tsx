import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  ariaLabel: string;
  className?: string;
}

const styleBase =
  'flex cursor-pointer items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 active:scale-95';

export const Button = ({ children, type, ariaLabel, className }: Props) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`${styleBase} ${className}`}
    >
      {children}
    </button>
  );
};
