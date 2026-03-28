import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export const renderIcon = (
  name: string,
  className?: React.HTMLAttributes<HTMLSpanElement>['className'],
  sx?: SxProps<Theme>
) => <SvgColor src={`/assets/icons/${name}.svg`} className={className ?? ''} sx={sx} />;

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
    icon: renderIcon('navbar/dashboard'),
  },
  {
    title: 'CIP Generator',
    path: '/cip-generator',
    icon: renderIcon('navbar/cip-gen'),
  },

  {
    title: 'Liquibase Script Generator',
    path: '/script-generator',
    icon: renderIcon('navbar/script-gen'),
  },
];
