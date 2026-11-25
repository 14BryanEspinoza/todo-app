import type { ReactNode } from 'react';

interface Props {
  date: ReactNode;
  className?: string;
}

export const Time = ({ date, className }: Props) => {
  return (
    <time
      className={`text-center text-base tracking-widest text-text-muted uppercase ${className}`}
    >
      {date}
    </time>
  );
};
