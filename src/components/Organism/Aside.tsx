import type { Task, TaskFilter } from '@models';
import { dateShort } from '@utils';
import {
  Filters,
  SearchBar,
  Statistics,
  Title,
  ToggleTheme,
} from '@components/Molecules';
import { Time } from '@components/Atoms';

interface Props {
  tasks: Task[];
  filter: TaskFilter;
  search: string;
  onFilterChanged: (filter: TaskFilter) => void;
  onSearchChange: (value: string) => void;
  className?: string;
}

export const Aside = ({
  tasks,
  filter,
  search,
  onFilterChanged,
  onSearchChange,
  className,
}: Props) => {
  return (
    <aside
      className={`m-4 flex h-[calc(100dvh-2rem)] w-[20dvw] flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-lg shadow-black ${className}`}
    >
      <Title />

      <SearchBar value={search} onChange={onSearchChange} />

      <div className="my-4">
        <h2 className="text-base font-bold text-text/80">Filtros</h2>

        <Filters active={filter} onFilterChanged={onFilterChanged} />
      </div>

      <div>
        <h2 className="text-base font-bold text-text/80">Estadísticas</h2>

        <Statistics tasks={tasks} />
      </div>

      <div className="my-2 mt-auto flex items-center justify-between border-t-2 border-border px-4 pt-6">
        <ToggleTheme />

        <Time date={dateShort({ date: new Date() })} className="text-sm" />
      </div>
    </aside>
  );
};
