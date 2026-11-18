import { IoMdCheckboxOutline } from 'react-icons/io';
import type { Task, TaskId } from '@models';
import { dateLong } from '@/utils';
import { AddTask, TaskItem } from '@components/Molecules';
import { Time } from '@components/Atoms';

interface Props {
  tasks: Task[];
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export const TaskList = ({ tasks, onToggle, onRemove }: Props) => {
  if (tasks.length === 0) {
    return (
      <p className="flex flex-col items-center justify-center gap-2 py-10 text-text-muted">
        <IoMdCheckboxOutline className="size-4" />
        No hay tareas que mostrar
      </p>
    );
  }

  return (
    <>
      <div className="my-6 flex w-fit flex-col gap-2">
        <Time
          date={dateLong({ date: new Date() })}
          className="text-lg font-bold"
        />

        <p className="text-text-muted">Lista de tareas</p>
      </div>

      <AddTask />

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
