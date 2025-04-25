'use client';

import { Control, Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface ControlledTextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function ControlledTextField({
  control,
  name,
  label,
  type = 'text',
  required = false,
  fullWidth = true,
  className = '',
  ...props
}: ControlledTextFieldProps) {
  return (
    <FormControl fullWidth={fullWidth} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="outlined"
            required={required}
            error={!!error}
            helperText={error?.message || ''}
            {...props}
          />
        )}
      />
    </FormControl>
  );
}
