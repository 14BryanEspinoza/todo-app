import type { IconType } from 'react-icons/lib';
import { SiTask } from 'react-icons/si';
import { BiTask, BiTaskX, BiTrash } from 'react-icons/bi';

interface Props {
  icon: IconType;
  label: string;
  colorText: string;
}

export const filtersContent: Props[] = [
  {
    icon: SiTask,
    label: 'Todas',
    colorText: 'text-text-muted',
  },
  {
    icon: BiTaskX,
    label: 'Pendientes',
    colorText: 'text-text-muted',
  },
  {
    icon: BiTask,
    label: 'Completadas',
    colorText: 'text-text-muted',
  },
  {
    icon: BiTrash,
    label: 'Eliminar',
    colorText: 'text-danger',
  },
];
