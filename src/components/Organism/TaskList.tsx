import type { Task, TaskId } from '@models';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { TaskItem } from '@components/Molecules';

interface Props {
  tasks: Task[];
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export const TaskList = ({ tasks, onToggle, onRemove }: Props) => {
  if (tasks.length === 0) {
    return (
      <p className="flex min-h-[57dvh] flex-col items-center justify-center gap-2 py-10 text-xl text-text-muted">
        <IoMdCheckboxOutline className="size-10" />
        No hay tareas que mostrar
      </p>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </>
  );
};
