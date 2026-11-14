interface Props {
  date: Date;
}

export const dateShort = ({ date }: Props) => {
  const formatShort = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).format(date);

  return formatShort;
};

export const dateLong = ({ date }: Props) => {
  const formatLong = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return formatLong;
};
