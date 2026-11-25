import { dateLong } from '@utils';
import { Time } from '@components/Atoms';

export const Header = () => {
  return (
    <div className="my-4 flex w-fit flex-col gap-2">
      <Time
        date={dateLong({ date: new Date() })}
        className="text-base font-bold"
      />

      <p className="text-sm text-text-muted">Lista de tareas</p>
    </div>
  );
};
