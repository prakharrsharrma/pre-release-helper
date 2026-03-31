import { useForm, FormProvider } from 'react-hook-form';

import { Box, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { renderIcon } from 'src/layouts/nav-config-dashboard';

import CIPPhases from '../component/CIPPhases';
import CIPStartInputs from '../component/form/CIPStartInputs';

import type { CipGenFormValues } from '../types/cip-gen-form';

// ----------------------------------------------------------------------

const defaultValues: CipGenFormValues = {
  additionalNotes: '',
  teamMembers: [],
  plannedEndDate: '',
  plannedStartDate: '',
  environment: '',
  confluencePageIds: [],
  jiraTicketIds: [],
  changeRequestNumber: '',
};

const CipGenView = () => {
  const formMethods = useForm<CipGenFormValues>({
    defaultValues,
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (values: CipGenFormValues) => {
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <CIPStartInputs />
        </Box>

        <Box sx={{ mt: 4 }}>
          <CIPPhases />
        </Box>
      </DashboardContent>
    </FormProvider>
  );
};

export default CipGenView;
