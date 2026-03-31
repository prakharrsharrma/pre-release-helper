import React from 'react';

import { Card, Grid, CardContent } from '@mui/material';

import SelectJira from './SelectJira';

const CIPStartInputs = () => (
  <Card
    elevation={2}
    sx={{
      borderRadius: 3,
      p: 1,
    }}
  >
    <CardContent component={Grid} container sx={{ p: 4 }}>
      <Grid>
        <SelectJira />
      </Grid>
    </CardContent>
  </Card>
);

export default CIPStartInputs;
