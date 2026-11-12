interface Props {
  label: string;
  ariaLabel: string;
  colorText: string;
}

export const filtersContent: Props[] = [
  {
    label: 'Todas',
    ariaLabel: 'todas las tareas',
    colorText: 'text-text-muted',
  },
  {
    label: 'Pendientes',
    ariaLabel: 'tareas pendientes',
    colorText: 'text-text-muted',
  },
  {
    label: 'Completadas',
    ariaLabel: 'tareas completadas',
    colorText: 'text-text-muted',
  },
  {
    label: 'Eliminar',
    ariaLabel: 'Eliminar completadas',
    colorText: 'text-danger',
  },
];
