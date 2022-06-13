import React from 'react';
import { Button } from '@mui/material';
import { _CONTAINED, _SECONDARY } from '../../../../utils/Constants';

const InputButton = ({ loading, type, inputClass, description,onClick }) => {
  return (
    <Button
      disabled={loading}
      type={type}
      className={inputClass}
      variant={_CONTAINED}
      color={_SECONDARY}
      onClick = {onClick}
      >
      {description}
    </Button>
  );
};

export default InputButton;
