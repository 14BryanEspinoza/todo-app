import type { Task, TaskId } from '@models';
import { GrTrash } from 'react-icons/gr';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import { Button } from '@components/Atoms';

interface Props {
  task: Task;
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export const TaskItem = ({ task, onToggle, onRemove }: Props) => {
  return (
    <li className="flex w-full items-center border-b border-border p-4 text-sm">
      <label className="flex flex-1 cursor-pointer items-center gap-4 select-none">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="peer sr-only"
        />

        {task.completed ? (
          <MdOutlineCheckBox className="size-5 text-text-muted" />
        ) : (
          <MdOutlineCheckBoxOutlineBlank className="size-5 text-text" />
        )}

        <span className="text-text peer-checked:text-text-muted peer-checked:line-through">
          {task.title}
        </span>
      </label>

      <Button onClick={() => onRemove(task.id)}>
        <GrTrash className="size-5" />
      </Button>
    </li>
  );
};
