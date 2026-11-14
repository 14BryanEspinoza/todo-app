import type { ComponentPropsWithRef } from 'react';

type Props = ComponentPropsWithRef<'button'>;

const styleBase =
  'flex cursor-pointer gap-2 transition-all duration-300 hover:scale-110 active:scale-90';

export const Button = ({ type = 'button', className = '', ...rest }: Props) => {
  return (
    <button type={type} className={`${styleBase} ${className}`} {...rest} />
  );
};
