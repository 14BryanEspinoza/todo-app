import { Input } from '@components/Atoms';

export const AddTask = () => {
  return (
    <Input
      id="task-add"
      label="Agregar tarea"
      type="text"
      placeholder="Agregar tarea"
      autoComplete="off"
      className="mb-6"
    />
  );
};
