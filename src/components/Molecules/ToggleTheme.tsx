import { BiMoon, BiSun } from 'react-icons/bi';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '@components/Atoms';

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      onClick={toggleTheme}
      aria-label={isDark ? 'cambiar a tema claro' : 'cambiar a tema oscuro'}
      title={isDark ? 'Tema Claro' : 'Tema Oscuro'}
      className="rounded-xl border border-border bg-bg/50 p-2"
    >
      {isDark ? <BiSun className="size-5" /> : <BiMoon className="size-5" />}
    </Button>
  );
};
