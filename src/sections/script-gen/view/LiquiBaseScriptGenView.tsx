import { varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, type ChangeEvent } from 'react';

import {
  Box,
  Skeleton,
  useTheme,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { renderIcon } from 'src/layouts/nav-config-dashboard';

import Rotating from 'src/components/loaders/Rotating';

import { useGenerateLiquibase } from 'src/sections/script-gen/hooks/use-generate-liquibase';

import ScriptGenError from '../components/error';
import CodeDisplay from '../components/CodeDisplay';

const LiquiBaseScriptGenView = () => {
  const [streamedLiquibase, setStreamedLiquibase] = useState<string>('');
  const [promptString, setPromptString] = useState<string>('');

  const theme = useTheme();

  // ------- Script Generation Api Call ----------
  const {
    data: generatedLiquibase,
    isPending: isGenerating,
    reset: resetGeneratedLiquibase,
    mutate: generateLiquibaseMutation,
    error: generateLiquibaseError,
  } = useGenerateLiquibase();

  useEffect(() => {
    if (generateLiquibaseError || !generatedLiquibase || !generatedLiquibase.length) {
      setStreamedLiquibase('');
      return undefined;
    }

    let currentIndex = 0;
    const chunkSize = Math.max(8, Math.ceil(generatedLiquibase.length / 36));
    const streamTimer = window.setInterval(() => {
      currentIndex = Math.min(generatedLiquibase.length, currentIndex + chunkSize);
      setStreamedLiquibase(generatedLiquibase.slice(0, currentIndex));

      if (currentIndex >= generatedLiquibase.length) {
        window.clearInterval(streamTimer);
      }
    }, 18);

    return () => {
      window.clearInterval(streamTimer);
    };
  }, [generateLiquibaseError, generatedLiquibase]);

  const handleGenerateLiquibase = () => {
    if (!hasPrompt) {
      return;
    }

    resetGeneratedLiquibase();
    setStreamedLiquibase('');
    generateLiquibaseMutation({ prompt: promptString });
  };

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromptString(event.target.value);

    if (generateLiquibaseError || generatedLiquibase) {
      resetGeneratedLiquibase();
      setStreamedLiquibase('');
    }
  };

  const hasPrompt = promptString.trim().length > 0;
  const showResponsePanel =
    isGenerating || Boolean(generatedLiquibase) || Boolean(generateLiquibaseError);
  const generatedLiquibaseLength = generatedLiquibase?.length ?? 0;
  const visibleLiquibase =
    streamedLiquibase.length < generatedLiquibaseLength
      ? `${streamedLiquibase}|`
      : streamedLiquibase;

  return (
    <DashboardContent>
      <Box
        className="h-full flex flex-col"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="flex mb-6 items-center-safe gap-2">
          {renderIcon('navbar/script-gen', 'h-7 w-7', { color: 'primary.main' })}
          <div className="flex flex-col items-start">
            <Typography variant="h3" className="text-3xl text-gray-800">
              Liquibase Script Generator
            </Typography>
            <Typography variant="body1">
              Auto-generate compliant Liquibase changeSets with built-in rollback logic.
            </Typography>
          </div>
        </div>

        <Box
          sx={{
            position: 'relative',
            height: '75dvh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: showResponsePanel ? 8 : '50%',
              left: '50%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: showResponsePanel ? 'translate(-50%, 0)' : 'translate(-50%, -50%)',
              transition: theme.transitions.create(['top', 'transform'], {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.easeInOut,
              }),
            }}
          >
            <OutlinedInput
              name="script-generator-prompt"
              onChange={handlePromptChange}
              value={promptString}
              placeholder="Generate a Liquibase changeSet for adding a new column to the users table ...."
              className="rounded-full ps-2"
              sx={{
                width: { xs: '100%', sm: hasPrompt ? '80%' : 700 },
                maxWidth: '100%',
                padding: 0,
                paddingRight: '10px',
                backgroundColor: varAlpha(theme.palette.common.whiteChannel, 0.72),
                backdropFilter: 'blur(12px)',
                // border: `1px solid ${varAlpha(theme.palette.common.whiteChannel, 0.55)}`,
                transition: theme.transitions.create(['width', 'transform', 'box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                }),

                '&.Mui-focused': {
                  width: { xs: '100%', sm: '80%' },
                  // borderColor: varAlpha(theme.palette.primary.mainChannel, 0.2),
                  // borderWidth: '0.1px',
                  boxShadow: `0 10px 30px ${varAlpha(theme.palette.primary.mainChannel, 0.12)}`,
                  transform: 'translateY(-1px)',
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleGenerateLiquibase}
                    color="primary"
                    disabled={!hasPrompt || isGenerating}
                    className="hover:scale-110 transition-transform"
                    sx={[
                      (localTheme) => ({
                        backgroundColor: localTheme.palette.primary.main,
                        ':hover': {
                          backgroundColor: localTheme.palette.primary.main,
                        },
                        textTransform: 'none',
                        color: localTheme.palette.primary.contrastText,
                      }),
                    ]}
                  >
                    {isGenerating ? (
                      <Rotating>{renderIcon('common/ai')}</Rotating>
                    ) : (
                      renderIcon('navbar/cip-gen')
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              top: { xs: 88, sm: 96 },
              opacity: showResponsePanel ? 1 : 0,
              transform: showResponsePanel ? 'translateY(0)' : 'translateY(24px)',
              transition: theme.transitions.create(['opacity', 'transform'], {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.easeInOut,
              }),
              pointerEvents: showResponsePanel ? 'auto' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isGenerating ? (
              <Box
                sx={{
                  height: '100%',
                  width: { xs: '100%', sm: '80%' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  p: 3,
                  borderRadius: 3,
                  background: `linear-gradient(180deg, ${varAlpha(theme.palette.common.whiteChannel, 0.78)} 0%, ${varAlpha(theme.palette.common.whiteChannel, 0.62)} 100%)`,
                  border: `1px solid ${varAlpha(theme.palette.common.whiteChannel, 0.55)}`,
                  boxShadow: `0 20px 45px ${varAlpha(theme.palette.common.blackChannel, 0.12)}`,
                  backdropFilter: 'blur(18px)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Rotating>{renderIcon('common/ai')}</Rotating>
                  <div>
                    <Typography variant="subtitle1">Drafting Liquibase changeSet</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Analyzing the schema update and assembling rollback steps.
                    </Typography>
                  </div>
                </div>

                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  <Skeleton animation="wave" variant="rounded" height={20} width="38%" />
                  <Skeleton animation="wave" variant="rounded" height={20} width="72%" />
                  <Skeleton animation="wave" variant="rounded" height={20} width="66%" />
                  <Skeleton animation="wave" variant="rounded" height={20} width="48%" />
                  <Skeleton animation="wave" variant="rounded" height={240} />
                </Box>
              </Box>
            ) : null}

            {!isGenerating && generateLiquibaseError ? (
              <ScriptGenError
                message={generateLiquibaseError.message}
                prompt={promptString}
                onRetry={handleGenerateLiquibase}
                isRetrying={isGenerating}
              />
            ) : null}

            {!isGenerating && !generateLiquibaseError && generatedLiquibase ? (
              <Box sx={{ height: '100%', display: 'flex', width: { xs: '100%', sm: '80%' } }}>
                <CodeDisplay generatedLiquibase={visibleLiquibase} />
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
};

export default LiquiBaseScriptGenView;
