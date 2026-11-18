import type { TaskFilter } from '@models';
import type { IconType } from 'react-icons/lib';
import { BiTask, BiTaskX } from 'react-icons/bi';
import { SiTask } from 'react-icons/si';

interface FilterItem {
  id: TaskFilter;
  label: string;
  icon: IconType;
}

export const filtersContent: FilterItem[] = [
  {
    id: 'all',
    label: 'Todas',
    icon: SiTask,
  },
  {
    id: 'active',
    label: 'Pendientes',
    icon: BiTaskX,
  },
  {
    id: 'completed',
    label: 'Completadas',
    icon: BiTask,
  },
];
