import { Moon } from 'lucide-react';
import { Button, Time } from '@components';

export const Header = () => {
  return (
    <header className="flex items-start gap-6 text-center">
      <div>
        <h1 className="text-text m-2 text-4xl font-bold">ToDo App</h1>

        <Time />
      </div>

      <Button
        type="button"
        ariaLabel="color de tema"
        className="border-border bg-surface text-text-muted hover:bg-surface-hover size-10 border p-2"
      >
        <Moon />
      </Button>
    </header>
  );
};
