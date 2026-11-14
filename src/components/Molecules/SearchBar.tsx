interface Props {
  value: string;
  onChange: (value: string) => void;
}

const styleBase = 'border-border bg-bg/80 w-full rounded-xl border px-4 py-2';

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="flex w-full flex-col text-center">
      <label htmlFor="task-search" className="sr-only">
        Buscar tareas
      </label>

      <input
        id="task-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar tarea"
        autoComplete="off"
        className={styleBase}
      />
    </div>
  );
};
