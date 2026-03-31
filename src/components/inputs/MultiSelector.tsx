import React from 'react';

import { Box, Chip, TextField, Typography, Autocomplete } from '@mui/material';

type MultiSelectorProps = {
  label?: string;
  options: string[];
  value?: string[];
  onChange?: (newValue: string[]) => void;
  placeholder?: string;
};

const MultiSelector: React.FC<MultiSelectorProps> = ({
  label = 'Select Items',
  options,
  value,
  onChange,
  placeholder = 'Select...',
}) => (
  <Box>
    <Typography variant="h6" mb={2}>
      {label}
    </Typography>

    {/* Multi Select */}
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option}
      value={value}
      onChange={(_, newValue) => onChange?.(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      )}
      renderTags={() => null}
    />

    {/* Selected Items */}
    {!!value?.length && (
      <Box mt={3}>
        <Typography variant="subtitle2" mb={1} color="text.secondary">
          Selected Items
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1}>
          {value?.map((item) => (
            <Chip
              key={item}
              label={item}
              color="primary"
              variant="outlined"
              onDelete={() => onChange?.(value.filter((v) => v !== item))}
              sx={{
                borderRadius: '6px',
              }}
            />
          ))}
        </Box>
      </Box>
    )}
  </Box>
);

export default MultiSelector;
