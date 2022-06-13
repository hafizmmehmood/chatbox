import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SMALL } from '../../Constants';

function InputSelect({
  label,
  value,
  error,
  onChange,
  name,
  disabled,
  children
}) {
  return (
    <FormControl
      size={SMALL}
      fullWidth
      className="custom-input-select dark:custom-input-select-dark">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label={label}
        disabled={disabled || false}
        name={name}
        error={error}
        onChange={onChange}>
        {children}
      </Select>
    </FormControl>
  );
}

export default InputSelect;
