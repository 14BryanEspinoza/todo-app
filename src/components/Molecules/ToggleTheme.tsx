import { BiSun } from 'react-icons/bi';
import { Button } from '@components/Atoms';

export const ToggleTheme = () => {
  return (
    <Button className="bg-bg/50 border-border rounded-xl border p-2">
      <BiSun className="size-6" />
    </Button>
  );
};
