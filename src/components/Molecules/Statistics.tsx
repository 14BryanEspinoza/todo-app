import { FaTasks } from 'react-icons/fa';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdOutlineIndeterminateCheckBox } from 'react-icons/md';
import { Badged } from '@components/Atoms';

export const Statistics = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Badged
        key={'totales'}
        icon={<FaTasks className="size-4" />}
        label="Totales"
        value={5}
      />

      <Badged
        key={'realizadas'}
        icon={<IoCheckmarkDone className="size-4" />}
        label="Realizadas"
        value={3}
      />

      <Badged
        key={'pendientes'}
        icon={<MdOutlineIndeterminateCheckBox className="size-4" />}
        label="Pendientes"
        value={2}
      />
    </div>
  );
};
