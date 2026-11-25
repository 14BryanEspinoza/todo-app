import { BiSun } from 'react-icons/bi';
import { Button } from '@components/Atoms';

export const ToggleTheme = () => {
  return (
    <Button className="rounded-xl border border-border bg-bg/50 p-2">
      <BiSun className="size-6" />
    </Button>
  );
};
