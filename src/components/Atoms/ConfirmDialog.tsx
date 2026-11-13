import { Button } from './Button';

export const ConfirmDialog = () => {
  return (
    <dialog className="border-border bg-surface text-text shadow-bg w-11/12 rounded-xl border p-4 shadow backdrop-blur-2xl">
      <form method="dialog">
        <h2 className="mb-2 text-xl">¿Limpiar tareas completadas?</h2>

        <p className="text-text-muted text-base text-balance">
          Esta acción eliminará todas las tareas hechas. No se puede deshacer.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            ariaLabel="cancelar eliminación"
            className="border-border text-text border bg-transparent px-4 py-2"
          >
            Cancelar
          </Button>

          <Button
            type="button"
            ariaLabel="confirmar elimination"
            className="border-danger text-text bg-danger border px-4 py-2"
          >
            Limpiar
          </Button>
        </div>
      </form>
    </dialog>
  );
};
