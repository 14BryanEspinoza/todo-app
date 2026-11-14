import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  value: number;
}

export const Badged = ({ icon, label, value }: Props) => {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-text-muted">{label}</p>
      </div>

      <span className="text-primary bg-bg/40 rounded-md px-4 py-2 font-bold">
        {value}
      </span>
    </div>
  );
};
