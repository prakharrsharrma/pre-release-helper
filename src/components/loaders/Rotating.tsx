import type { ReactNode } from 'react';

import { Box } from '@mui/material';

type RotatingProps = {
  children: ReactNode;
};

const Rotating = ({ children }: RotatingProps) => (
  <Box
    sx={{
      display: 'inline-flex',
      '@keyframes rotateInOut': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '50%': {
          transform: 'rotate(180deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      animation: 'rotateInOut 1.2s ease-in-out infinite',
    }}
  >
    {children}
  </Box>
);

export default Rotating;
