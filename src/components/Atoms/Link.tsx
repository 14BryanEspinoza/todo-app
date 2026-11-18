import type { ReactNode } from 'react';

interface Props {
  url: string;
  children?: ReactNode;
  className?: string;
  target?: boolean;
}

const styleBase = 'transition-all duration-300 hover:scale-105 active:scale-95';

export const Link = ({ url, children, className, target }: Props) => {
  return (
    <a
      href={url}
      className={`${styleBase} ${className}`}
      target={target ? '_blank' : '_self'}
      rel={target ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
