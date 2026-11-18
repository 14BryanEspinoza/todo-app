import type { TaskFilter } from '@models';
import { filtersContent } from '@utils';
import { Button } from '@components/Atoms';

interface Props {
  active: TaskFilter;
  onFilterChanged: (filter: TaskFilter) => void;
}

const styleBase = 'items-center text-sm font-bold';

export const Filters = ({ active, onFilterChanged }: Props) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {filtersContent.map((item) => {
        const isActive = active === item.id;

        return (
          <Button
            key={item.id}
            aria-pressed={isActive}
            onClick={() => onFilterChanged(item.id)}
            className={`${styleBase} ${isActive ? 'rounded-xl bg-bg/40 px-4 py-2 text-text' : 'text-text-muted'}`}
          >
            <item.icon className="size-4" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
