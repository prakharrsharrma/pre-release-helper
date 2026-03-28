import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import Container from '@mui/material/Container';

import { layoutClasses } from '../core/classes';

// ----------------------------------------------------------------------

export type DashboardContentProps = ContainerProps & {
  layoutQuery?: Breakpoint;
  disablePadding?: boolean;
};

export function DashboardContent({
  sx,
  children,
  className,
  disablePadding,
  maxWidth = 'lg',
  layoutQuery = 'lg',
  ...other
}: DashboardContentProps) {
  return (
    <Container
      className={mergeClasses([layoutClasses.content, className])}
      maxWidth={maxWidth}
      sx={[
        (theme) => ({
          display: 'flex',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle, ${varAlpha(theme.palette.primary.mainChannel, 0.16)} 1px, transparent 1.2px)`,
            backgroundSize: '18px 18px',
            opacity: 0.9,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle at 58% 50%, ${varAlpha(theme.palette.primary.mainChannel, 0.12)}, transparent 40%), linear-gradient(180deg, ${varAlpha(theme.palette.common.whiteChannel, 0.24)} 0%, transparent 45%)`,
          },
          flex: '1 1 auto',
          flexDirection: 'column',
          pt: 'var(--layout-dashboard-content-pt)',
          pb: 'var(--layout-dashboard-content-pb)',
          [theme.breakpoints.up(layoutQuery)]: {
            px: 'var(--layout-dashboard-content-px)',
          },
          ...(disablePadding && {
            p: {
              xs: 0,
              sm: 0,
              md: 0,
              lg: 0,
              xl: 0,
            },
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {children}
    </Container>
  );
}
