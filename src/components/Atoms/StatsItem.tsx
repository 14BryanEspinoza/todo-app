interface Props {
  label: string;
  value: number;
}

const styleBase =
  'border-border bg-surface hover:bg-surface-hover min-w-32 rounded-xl border p-4 text-center transition-all duration-300 hover:scale-105';

export const StatsItem = ({ label, value }: Props) => {
  return (
    <div className={styleBase}>
      <span className="text-primary font-bold">{value}</span>

      <p className="text-text-muted text-sm">{label}</p>
    </div>
  );
};
