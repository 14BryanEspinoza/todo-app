import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { Button } from '@components';

export const Title = () => {
  return (
    <div className="border-border mt-4 flex w-full items-center justify-between border-b-2 px-4 pb-4">
      <h1 className="text-text m-2 text-xl font-bold tracking-widest">
        ToDo App
      </h1>

      <Button
        type="button"
        onClick={() => {}}
        className="bg-bg/50 border-border rounded-xl border p-2"
      >
        <TbLayoutSidebarRightExpand className="size-6" />
      </Button>
    </div>
  );
};
