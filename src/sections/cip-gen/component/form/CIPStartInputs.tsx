import { Card, Grid, CardContent } from '@mui/material';

import SelectJira from './SelectJira';
import SelectConfluence from './SelectConfluence';
import MapUsersToPhases from './MapUsersToPhases';

const CIPStartInputs = () => (
  <Card variant="outlined" className="rounded-4xl">
    <CardContent component={Grid} container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2 }}>
      <Grid size={6}>
        <SelectJira />
      </Grid>
      <Grid size={6}>
        <SelectConfluence />
      </Grid>
      <Grid size={6}>
        <MapUsersToPhases />
      </Grid>
    </CardContent>
    {/* <CardActions>
      <Button variant="contained" color="primary" type="submit">
        Generate CIP
      </Button>
    </CardActions> */}
  </Card>
);

export default CIPStartInputs;
