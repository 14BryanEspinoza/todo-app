import type { IconType } from 'react-icons/lib';
import { FaLinkedinIn, FaGithub, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

interface Props {
  url: string;
  label: string;
  icon: IconType;
}

export const contactEmail = '14bryespinoza@gmail.com';

export const socialNetworks: Props[] = [
  {
    url: 'https://www.linkedin.com/in/14bryanespinoza',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
  },
  {
    url: 'https://github.com/14bryanespinoza',
    label: 'GitHub',
    icon: FaGithub,
  },
  {
    url: 'https://www.facebook.com/14bryanespinoza',
    label: 'Facebook',
    icon: FaFacebookF,
  },
  {
    url: 'https://twitter.com/14bryanespinoza',
    label: 'X (Twitter)',
    icon: FaTwitter,
  },
  {
    url: `mailto:${contactEmail}`,
    label: 'Email',
    icon: SiGmail,
  },
];
