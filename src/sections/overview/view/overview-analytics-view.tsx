import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <AnalyticsWidgetSummary
            title="CIP Generated"
            total={714000}
            icon={<img alt="CIP Generated" src="/assets/icons/navbar/cip-gen.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <AnalyticsWidgetSummary
            title="New users"
            total={1352831}
            color="secondary"
            icon={<img alt="New users" src="/assets/icons/navbar/script-gen.svg" />}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
