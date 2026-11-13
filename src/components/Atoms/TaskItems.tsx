import { GrTrash } from 'react-icons/gr';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { MdOutlineCheckBox } from 'react-icons/md';
import { Button } from '@components';

interface Props {
  id: string;
  task: string;
}

const isCheck = true;

export const TaskItems = ({ id, task }: Props) => {
  return (
    <div className="bg-bg/50 border-border mr-2 flex w-full items-center gap-4 rounded-xl border p-4">
      <input type="checkbox" name={id} id={id} className="sr-only" />

      {!isCheck ? (
        <MdOutlineCheckBoxOutlineBlank size={30} />
      ) : (
        <MdOutlineCheckBox size={30} />
      )}

      <label
        htmlFor={id}
        className="text-text size-full cursor-pointer text-left select-none"
      >
        {task}
      </label>

      <Button type="button" ariaLabel="eliminar tarea">
        <GrTrash size={20} />
      </Button>
    </div>
  );
};
