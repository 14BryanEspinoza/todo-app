import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { Button } from '@components/Atoms';

export const Title = () => {
  return (
    <div className="mt-4 flex w-full items-center justify-between border-b-2 border-border px-4 pb-4">
      <h1 className="m-2 text-xl font-bold tracking-widest text-text">
        ToDo App
      </h1>

      <Button className="rounded-xl border border-border bg-bg/50 p-2">
        <TbLayoutSidebarRightExpand className="size-6" />
      </Button>
    </div>
  );
};
