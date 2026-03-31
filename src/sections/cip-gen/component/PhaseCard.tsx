import React, { useState } from 'react';

import {
  Box,
  Card,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import StepDetailsDialog from './PhaseModal';

type Step = {
  stepNumber: number;
  activityDescription: string;
  stepByStepActivities: string[];
  [key: string]: any;
};

type Props = {
  step: Step;
  onChange: (updated: Step) => void;
};

const StepCard: React.FC<Props> = ({ step, onChange }) => {
  const [activities, setActivities] = useState(step.stepByStepActivities);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempValue(activities[index]);
  };

  const handleSave = (index: number) => {
    const updated = [...activities];
    updated[index] = tempValue;
    setActivities(updated);
    setEditingIndex(null);
    onChange({ ...step, stepByStepActivities: updated });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempValue('');
  };

  const handleDelete = (index: number) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
    onChange({ ...step, stepByStepActivities: updated });
  };

  return (
    <>
      <Card
        elevation={2}
        sx={{
          minWidth: 380, // important for carousel scroll
          maxWidth: 420,
          flexShrink: 0, // prevent shrinking in carousel
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" gap={1}>
            <Typography variant="h6">Activity:</Typography>
            <Typography variant="body2" color="text.secondary">
              {step.activityDescription}
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box display="flex" flexDirection="column" gap={1}>
            {activities.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1}>
                {editingIndex === index ? (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <IconButton onClick={() => handleSave(index)} size="small">
                      save
                    </IconButton>
                    <IconButton onClick={handleCancel} size="small">
                      cancel
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {index + 1}. {item}
                    </Typography>
                    <IconButton onClick={() => handleEdit(index)} size="small">
                      edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} size="small">
                      delete
                    </IconButton>
                  </>
                )}
              </Box>
            ))}
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button size="small" onClick={() => setOpen(true)}>
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>

      <StepDetailsDialog open={open} onClose={() => setOpen(false)} step={step} />
    </>
  );
};

export default StepCard;
