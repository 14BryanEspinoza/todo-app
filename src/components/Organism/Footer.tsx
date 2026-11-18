import { socialNetworks } from '@utils';
import { Link } from '@components/Atoms';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer className={`mb-4 flex flex-col gap-6 text-center ${className}`}>
      <p className="font-serif text-sm tracking-widest text-text italic">
        "Programa no para resolver problemas, sino para crear soluciones."
      </p>

      <div className="flex justify-center gap-8">
        {socialNetworks.map((link) => (
          <Link
            key={link.label}
            url={link.url}
            className="text-text hover:text-text-muted"
            target
          >
            <link.icon className="size-5" />
          </Link>
        ))}
      </div>

      <small className="text-text-muted">&copy; 2026 - 14BryanEspinoza</small>
    </footer>
  );
};
