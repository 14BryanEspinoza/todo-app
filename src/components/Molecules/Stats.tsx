import { StatsItem } from '../Atoms/StatsItem';

const tasks = [
  {
    id: 1,
    label: 'totales',
    value: 5,
  },
  {
    id: 2,
    label: 'hechas',
    value: 2,
  },
  {
    id: 3,
    label: 'pudientes',
    value: 3,
  },
];

export const Stats = () => {
  return (
    <section className="flex justify-between gap-4">
      {tasks.map((task) => (
        <StatsItem {...task} />
      ))}
    </section>
  );
};
