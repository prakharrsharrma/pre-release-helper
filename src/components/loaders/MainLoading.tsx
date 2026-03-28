import { keyframes } from '@emotion/react';
import { varAlpha } from 'minimal-shared/utils';

import { Box, Stack, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { SvgColor } from 'src/components/svg-color';

const orbit = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.04);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const breathe = keyframes`
  0%,
  100% {
    transform: scale(0.96);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
`;

const drift = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -12px, 0);
  }
`;

const scan = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
`;

const statusPills = ['Syncing prompts', 'Warming routes', 'Preparing assets'];

const MainLoading = () => (
  <Box
    sx={(theme) => ({
      position: 'relative',
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      px: { xs: 3, md: 4 },
      py: 6,

      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.18)} 1px, transparent 1.4px)`,
        backgroundSize: '18px 18px',
        opacity: 0.7,
        pointerEvents: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: '12% 18%',
        borderRadius: '50%',
        filter: 'blur(90px)',
      },
    })}
  >
    <Box
      sx={(theme) => ({
        position: 'relative',
        zIndex: 1,
        width: 1,
        maxWidth: 560,
        overflow: 'hidden',
        borderRadius: 5,
        px: { xs: 3, md: 4 },
        py: { xs: 4, md: 4.5 },
        border: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.72)}`,
        backgroundColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.7),
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: `0 24px 80px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.14)}`,
      })}
    >
      <Stack spacing={3.5} alignItems="center">
        <Box
          sx={(theme) => ({
            position: 'relative',
            width: 132,
            height: 132,
            display: 'grid',
            placeItems: 'center',
            animation: `${drift} 4s ease-in-out infinite`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `1px solid ${varAlpha(theme.vars.palette.primary.mainChannel, 0.24)}`,
              animation: `${orbit} 6s linear infinite`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 12,
              borderRadius: '50%',
              border: `1px dashed ${varAlpha(theme.vars.palette.info.mainChannel, 0.38)}`,
              animation: `${orbit} 9s linear infinite reverse`,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              position: 'absolute',
              inset: 24,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.22)} 0%, ${varAlpha(theme.vars.palette.info.mainChannel, 0.12)} 46%, transparent 78%)`,
              filter: 'blur(4px)',
              animation: `${breathe} 2.6s ease-in-out infinite`,
            })}
          />

          <Box
            sx={(theme) => ({
              position: 'relative',
              zIndex: 1,
              width: 68,
              height: 68,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 3,
              color: 'common.white',
              background: `linear-gradient(135deg, ${theme.vars.palette.primary.dark} 0%, ${theme.vars.palette.primary.main} 55%, ${theme.vars.palette.info.main} 100%)`,
              boxShadow: `0 12px 30px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.35)}`,
            })}
          >
            <SvgColor src="/assets/icons/common/ai.svg" sx={{ width: 34, height: 34 }} />
          </Box>

          <Box
            sx={(theme) => ({
              position: 'absolute',
              top: 16,
              right: 10,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: theme.vars.palette.info.main,
              boxShadow: `0 0 0 8px ${varAlpha(theme.vars.palette.info.mainChannel, 0.14)}`,
            })}
          />
          <Box
            sx={(theme) => ({
              position: 'absolute',
              bottom: 22,
              left: 8,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.vars.palette.primary.main,
              boxShadow: `0 0 0 10px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.12)}`,
            })}
          />
        </Box>

        <Stack spacing={1} alignItems="center" sx={{ textAlign: 'center', maxWidth: 420 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
            Preparing your workspace
          </Typography>
        </Stack>

        <Box sx={{ width: 1 }}>
          <LinearProgress
            sx={(theme) => ({
              height: 10,
              borderRadius: 999,
              overflow: 'hidden',
              backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 999,
                backgroundImage: `linear-gradient(90deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.info.main} 100%)`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, transparent 0%, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.48)} 50%, transparent 100%)`,
                animation: `${scan} 1.8s linear infinite`,
              },
            })}
          />
        </Box>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {statusPills.map((label) => (
            <Box
              key={label}
              sx={(theme) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.9,
                borderRadius: 99,
                color: 'text.secondary',
                border: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                backgroundColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.52),
              })}
            >
              <Box
                sx={(theme) => ({
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.vars.palette.primary.main,
                  animation: `${breathe} 1.8s ease-in-out infinite`,
                })}
              />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.04em' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  </Box>
);

export default MainLoading;
