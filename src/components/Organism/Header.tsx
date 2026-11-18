import { dateLong } from '@utils';
import { Time } from '@components/Atoms';

export const Header = () => {
  return (
    <div className="my-4 flex w-fit flex-col gap-2">
      <Time
        date={dateLong({ date: new Date() })}
        className="text-lg font-bold"
      />

      <p className="text-text-muted">Lista de tareas</p>
    </div>
  );
};
