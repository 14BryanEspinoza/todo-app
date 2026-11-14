import { GrTrash } from 'react-icons/gr';
import { MdOutlineCheckBox } from 'react-icons/md';
import type { Task, TaskId } from '@models';
import { Button } from '@components/Atoms';

interface Props {
  task: Task;
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export const TaskItem = ({ task, onToggle, onRemove }: Props) => {
  return (
    <li className="bg-bg/50 border-border mr-2 flex w-full items-center gap-4 rounded-xl border p-4">
      <label className="flex flex-1 cursor-pointer items-center gap-4 select-none">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="peer sr-only"
        />

        <MdOutlineCheckBox
          size={30}
          className="text-text-muted peer-checked:text-primary shrink-0"
        />

        <span className="text-text peer-checked:text-text-muted size-full text-left peer-checked:line-through">
          {task.title}
        </span>
      </label>

      <Button className="shrink-0" onClick={() => onRemove(task.id)}>
        <GrTrash size={20} />
      </Button>
    </li>
  );
};
