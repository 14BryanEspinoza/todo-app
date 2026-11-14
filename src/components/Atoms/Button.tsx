import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className?: string;
}

const styleBase =
  'flex cursor-pointer gap-2 transition-all duration-300 hover:scale-110 active:scale-90';

export const Button = ({ children, type, onClick, className = '' }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styleBase} ${className}`}
    >
      {children}
    </button>
  );
};
