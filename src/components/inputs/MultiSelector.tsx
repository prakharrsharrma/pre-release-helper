import React from 'react';
import { Controller, useFormContext, type FieldPath, type FieldValues } from 'react-hook-form';

import { Box, Chip, TextField, Autocomplete } from '@mui/material';

type MultiSelectorProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName;
  options: string[];
  label?: string;
};

const MultiSelector = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label = 'Select Items',
  options,
  name,
}: MultiSelectorProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value) ? (field.value as string[]) : [];
        return (
          <>
            <Autocomplete
              multiple
              options={options}
              getOptionLabel={(option) => option}
              value={selectedValues}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={label}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 200,
                    },
                  }}
                />
              )}
              renderTags={() => null}
            />

            {!!selectedValues.length && (
              <Box mt={2}>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedValues.map((item) => (
                    <Chip
                      className="rounded-full"
                      key={item}
                      label={item}
                      color="primary"
                      variant="outlined"
                      onDelete={() =>
                        field.onChange(selectedValues.filter((value) => value !== item))
                      }
                      sx={{
                        borderRadius: '6px',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </>
        );
      }}
    />
  );
};

export default MultiSelector;
