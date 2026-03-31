import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { Box, Button, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { renderIcon } from 'src/layouts/nav-config-dashboard';

import Rotating from 'src/components/loaders/Rotating';

import CIPPhases from '../component/CIPPhases';
import CIPStartInputs from '../component/form/CIPStartInputs';

import type { CipGenFormValues } from '../types/cip-gen-form';

// ----------------------------------------------------------------------

const defaultValues: CipGenFormValues = {
  additionalNotes: '',
  teamMembers: [
    {
      name: '',
      email: '',
      contactNumbers: '',
      role: '',
      location: 'PREPARATION',
    },
    {
      name: '',
      email: '',
      contactNumbers: '',
      role: '',
      location: 'EXECUTION',
    },
    {
      name: '',
      email: '',
      contactNumbers: '',
      role: '',
      location: 'GOLIVE',
    },
    {
      name: '',
      email: '',
      contactNumbers: '',
      role: '',
      location: 'NOGO',
    },
    {
      name: '',
      email: '',
      contactNumbers: '',
      role: '',
      location: 'POSTROLLBACK',
    },
  ],
  plannedEndDate: '',
  plannedStartDate: '',
  environment: '',
  confluencePageIds: [],
  jiraTicketIds: [],
  changeRequestNumber: '',
};

const CipGenView = () => {
  const [isGeneratingCip, setIsGeneratingCip] = useState(false);

  const formMethods = useForm<CipGenFormValues>({
    defaultValues,
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (values: CipGenFormValues) => {
    setIsGeneratingCip(true);
    console.log('CIP form values', values);
  };

  return (
    <FormProvider {...formMethods}>
      <DashboardContent>
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {renderIcon('navbar/script-gen', 'h-8 w-8', {
            color: 'primary.main',
          })}

          <Box>
            <Typography variant="h4" fontWeight={600}>
              CIP Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Automatically draft standardized Change Implementation Plans from Jira and Confluence
              data.
            </Typography>
          </Box>
        </Box>

        {/* ------------- Inputs ------------- */}

        <form
          className="w-full flex flex-col items-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CIPStartInputs />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={isGeneratingCip}
            loadingIndicator={
              <>
                <Rotating>{renderIcon('common/ai')}</Rotating> Generating
              </>
            }
            startIcon={renderIcon('common/ai')}
          >
            Generate CIP
          </Button>
        </form>

        <Box sx={{ mt: 4 }}>
          <CIPPhases />
        </Box>
      </DashboardContent>
    </FormProvider>
  );
};

export default CipGenView;
