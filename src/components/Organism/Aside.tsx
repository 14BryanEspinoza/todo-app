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
}

export const Aside = ({
  tasks,
  filter,
  search,
  onFilterChanged,
  onSearchChange,
}: Props) => {
  return (
    <aside className="bg-surface border-border m-4 flex h-[calc(100dvh-2rem)] w-70 flex-col gap-4 rounded-xl border p-4 shadow-lg shadow-black">
      <Title />

      <SearchBar value={search} onChange={onSearchChange} />

      <div className="my-4">
        <h2 className="text-text/80 text-base font-bold">Filtros</h2>

        <Filters active={filter} onFilterChanged={onFilterChanged} />
      </div>

      <div>
        <h2 className="text-text/80 text-base font-bold">Estadísticas</h2>

        <Statistics tasks={tasks} />
      </div>

      <div className="border-border my-2 mt-auto flex items-center justify-between border-t-2 px-4 pt-6">
        <ToggleTheme />

        <Time date={dateShort({ date: new Date() })} className="text-sm" />
      </div>
    </aside>
  );
};
