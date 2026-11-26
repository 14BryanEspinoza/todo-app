import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'todo-app/theme:v1';

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  } catch {
    return 'dark';
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Si la preferencia no es critica: seguimos con el tema de memoria.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }

  return context;
};
