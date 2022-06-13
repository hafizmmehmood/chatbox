import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonComp from '../../shared/Buttons';

function Button({ loading, actionState }) {
  return (
    <ButtonComp
      loading={loading}
      value={
        loading ? (
          <CircularProgress color="inherit" size={22} />
        ) : !actionState ? (
          'Create'
        ) : (
          'Update'
        )
      }
    />
  );
}

export default Button;
