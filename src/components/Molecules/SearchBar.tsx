import { Input } from '@components/Atoms';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <Input
      id="task-search"
      label="Buscar tareas"
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar tarea"
      autoComplete="off"
    />
  );
};
