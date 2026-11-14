import { dateShort } from '@/utils/timeContent';
import {
  Filters,
  SearchBar,
  Statistics,
  Time,
  Title,
  ToggleTheme,
} from '@components';

export const Aside = () => {
  return (
    <aside className="bg-surface border-border m-4 flex h-[calc(100dvh-2rem)] w-70 flex-col gap-4 rounded-xl border p-4 shadow-lg shadow-black">
      <Title />

      <SearchBar />

      <div className="my-4">
        <h2 className="text-text/80 text-base font-bold">Filtros</h2>

        <Filters />
      </div>

      <div>
        <h2 className="text-text/80 text-base font-bold">Estadísticas</h2>

        <Statistics />
      </div>

      <div className="border-border my-2 mt-auto flex items-center justify-between border-t-2 px-4 pt-6">
        <ToggleTheme />

        <Time date={dateShort({ date: new Date() })} className="text-sm" />
      </div>
    </aside>
  );
};
