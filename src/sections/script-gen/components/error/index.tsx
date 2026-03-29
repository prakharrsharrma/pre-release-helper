import { varAlpha } from 'minimal-shared/utils';

import { Box, Stack, Button, useTheme, Typography } from '@mui/material';

import { renderIcon } from 'src/layouts/nav-config-dashboard';

type ScriptGenErrorProps = {
  message?: string;
  prompt?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

const ScriptGenError = ({ message, prompt, onRetry, isRetrying = false }: ScriptGenErrorProps) => {
  const theme = useTheme();
  const promptPreview = prompt?.trim();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        border: `1px solid ${varAlpha(theme.palette.error.mainChannel, 0.16)}`,
        background: `linear-gradient(145deg, ${varAlpha(theme.palette.common.whiteChannel, 0.9)} 0%, ${varAlpha(theme.palette.error.mainChannel, 0.06)} 100%)`,
        boxShadow: `0 24px 48px ${varAlpha(theme.palette.error.mainChannel, 0.08)}`,
        backdropFilter: 'blur(18px)',
        width: '80%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${varAlpha(theme.palette.error.mainChannel, 0.14)} 0%, transparent 70%)`,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${varAlpha(theme.palette.primary.mainChannel, 0.1)} 0%, transparent 72%)`,
        }}
      />

      <Stack
        spacing={3}
        sx={{
          position: 'relative',
          zIndex: 1,
          justifyContent: 'center',
          height: '100%',
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 52,
              height: 52,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '18px',
              color: 'error.main',
              backgroundColor: varAlpha(theme.palette.error.mainChannel, 0.12),
              border: `1px solid ${varAlpha(theme.palette.error.mainChannel, 0.14)}`,
            }}
          >
            {renderIcon('common/ai', 'h-6 w-6', { color: 'error.main' })}
          </Box>

          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.18em', color: 'error.main', fontWeight: 700 }}
            >
              AI generation interrupted
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              The script could not be generated this time.
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
          {message ||
            'The request did not complete successfully. Adjust the prompt or retry once the service is responsive again.'}
        </Typography>

        {promptPreview ? (
          <Box
            sx={{
              p: 2,
              borderRadius: 2.5,
              border: `1px solid ${varAlpha(theme.palette.common.blackChannel, 0.08)}`,
              backgroundColor: varAlpha(theme.palette.common.whiteChannel, 0.68),
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mb: 0.75 }}
            >
              Last prompt
            </Typography>
            <Typography variant="body2">{promptPreview}</Typography>
          </Box>
        ) : null}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            variant="contained"
            size="large"
            onClick={onRetry}
            disabled={!onRetry || isRetrying}
            sx={{
              minWidth: 172,
              borderRadius: 999,
              textTransform: 'none',
              boxShadow: 'none',
            }}
          >
            {isRetrying ? 'Retrying...' : 'Try again'}
          </Button>

          <Button
            variant="text"
            size="large"
            disabled
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: 'text.secondary',
            }}
          >
            Or refine the prompt above for a narrower request.
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ScriptGenError;
