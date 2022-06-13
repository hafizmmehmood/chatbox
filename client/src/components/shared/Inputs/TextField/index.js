import React from 'react';
import { TextField } from '@mui/material';
import { SMALL, TEXT } from '../../Constants';

function InputTextField({
  label,
  value,
  onChange,
  name,
  error,
  helperText,
  type,
  disabled,
  placeholder
}) {
  return (
    <TextField
      fullWidth
      type={type || TEXT}
      className="custom-text-field dark:custom-text-field-dark"
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder || ''}
      size={SMALL}
      name={name}
      error={error}
      helperText={helperText}
      disabled={disabled || false}
    />
  );
}

export default InputTextField;
