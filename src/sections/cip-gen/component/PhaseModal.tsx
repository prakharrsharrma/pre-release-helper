import React from 'react';

import { Box, Dialog, Divider, Typography, DialogTitle, DialogContent } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  step: Record<string, any>;
};

const StepDetailsDialog: React.FC<Props> = ({ open, onClose, step }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle sx={{ fontWeight: 600 }}>Step {step.stepNumber} Details</DialogTitle>

    <DialogContent dividers>
      <Box display="flex" flexDirection="column" gap={2}>
        {Object.entries(step).map(([key, value]) => {
          if (key === 'stepNumber') return null;

          return (
            <Box key={key}>
              <Typography variant="caption" color="text.secondary">
                {formatLabel(key)}
              </Typography>

              <Typography variant="body2" mt={0.5}>
                {Array.isArray(value) ? value.join(', ') : value || '-'}
              </Typography>

              <Divider sx={{ mt: 1 }} />
            </Box>
          );
        })}
      </Box>
    </DialogContent>
  </Dialog>
);

export default StepDetailsDialog;

// helper
const formatLabel = (key: string) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
