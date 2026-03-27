import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('dashboard'),
  },
  {
    title: 'CIP Generator',
    path: '/cip-generator',
    icon: icon('cip-gen'),
  },

  {
    title: 'Liquibase Script Generator',
    path: '/script-generator',
    icon: icon('script-gen'),
  },
];
