import { IoMdCheckboxOutline } from 'react-icons/io';
import { TaskItems } from '@components';

const task = [];

const styleNone =
  'text-text-muted border-border m-4 flex min-h-40 items-center justify-center border-r-4 text-center';
const styleTask = '  m-4 flex flex-col gap-2 items-center justify-center';

export const TaskList = () => {
  return (
    <ul className={task ? styleTask : styleNone}>
      {task.length > 0 ? (
        <>
          <TaskItems id="1" task="HolaMundo" />
        </>
      ) : (
        <p className="flex flex-col items-center gap-2">
          <IoMdCheckboxOutline size={40} />
          No hay tareas que mostrar
        </p>
      )}
    </ul>
  );
};
