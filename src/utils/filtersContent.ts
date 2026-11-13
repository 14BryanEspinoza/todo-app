interface Props {
  id: string;
  label: string;
  ariaLabel: string;
  colorText: string;
}

export const filtersContent: Props[] = [
  {
    id: 'btnAll',
    label: 'Todas',
    ariaLabel: 'todas las tareas',
    colorText: 'text-text-muted',
  },
  {
    id: 'btnEarrings',
    label: 'Pendientes',
    ariaLabel: 'tareas pendientes',
    colorText: 'text-text-muted',
  },
  {
    id: 'btnCompleted',
    label: 'Completadas',
    ariaLabel: 'tareas completadas',
    colorText: 'text-text-muted',
  },
  {
    id: 'btnDeleted',
    label: 'Eliminar',
    ariaLabel: 'Eliminar completadas',
    colorText: 'text-danger',
  },
];
