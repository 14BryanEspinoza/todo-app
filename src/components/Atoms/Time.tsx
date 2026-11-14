import type { ReactNode } from 'react';

interface Props {
  date: ReactNode;
  className?: string;
}

export const Time = ({ date, className }: Props) => {
  return (
    <time
      className={`text-text-muted text-center text-base tracking-widest uppercase ${className}`}
    >
      {date}
    </time>
  );
};
