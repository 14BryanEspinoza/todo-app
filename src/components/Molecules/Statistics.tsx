import { FaTasks } from 'react-icons/fa';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdOutlineIndeterminateCheckBox } from 'react-icons/md';
import type { Task } from '@models';
import { Badged } from '@components/Atoms';

interface Props {
  tasks: Task[];
}

export const Statistics = ({ tasks }: Props) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <div className="flex flex-col gap-2 p-4">
      <Badged
        key={'total'}
        icon={<FaTasks className="size-4" />}
        label="Totales"
        value={total}
      />

      <Badged
        key={'completed'}
        icon={<IoCheckmarkDone className="size-4" />}
        label="Completadas"
        value={completed}
      />

      <Badged
        key={'pending'}
        icon={<MdOutlineIndeterminateCheckBox className="size-4" />}
        label="Pendientes"
        value={pending}
      />
    </div>
  );
};
