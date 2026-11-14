const styleBase =
  'border-border bg-bg/80 w-full rounded-xl border mb-6 px-4 py-2';

export const AddTask = () => {
  return (
    <div className="flex w-full flex-col text-center">
      <label htmlFor="task-search" className="sr-only">
        Buscar tareas
      </label>

      <input
        id="task-search"
        type="text"
        placeholder="Agregar Tarea"
        autoComplete="off"
        className={styleBase}
      />
    </div>
  );
};
