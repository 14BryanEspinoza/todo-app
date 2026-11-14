import { BiSun } from 'react-icons/bi';
import { Button } from '@components';

export const ToggleTheme = () => {
  return (
    <Button
      type="button"
      onClick={() => {}}
      className="bg-bg/50 border-border rounded-xl border p-2"
    >
      <BiSun className="size-6" />
    </Button>
  );
};
