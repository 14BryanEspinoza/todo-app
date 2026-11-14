import { socialNetworks } from '@/utils';
import { Link } from '@components/Atoms';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 text-center">
      <p className="text-text font-serif text-sm tracking-widest italic">
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
            {<link.icon size={20} />}
          </Link>
        ))}
      </div>

      <small className="text-text-muted">&copy; 2026 - 14BryanEspinoza</small>
    </footer>
  );
};
