import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '../Shared/Button';
import TextField from '../../shared/Inputs/TextField';
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  _FIRST_NAME,
  _LAST_NAME,
  _EMAIL,
  _ID
} from './constants';

function AdminFormBody({
  loading,
  touched,
  values,
  errors,
  handleChange,
  handleSubmit,
  setFieldValue,
  actionState,
  admin
}) {
  useEffect(() => {
    if (admin) {
      setFieldValue(_FIRST_NAME, admin.firstName);
      setFieldValue(_LAST_NAME, admin.lastName);
      setFieldValue(_EMAIL, admin.email);
      setFieldValue(_ID, admin.id);
    }
  }, [admin, setFieldValue]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} className="p-2">
            <TextField
              label={FIRST_NAME}
              value={values.firstName}
              onChange={handleChange}
              name={_FIRST_NAME}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className="p-2">
            <TextField
              label={LAST_NAME}
              value={values.lastName}
              onChange={handleChange}
              name={_LAST_NAME}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} className="p-2">
            <TextField
              type={_EMAIL}
              label={EMAIL}
              value={values.email}
              onChange={handleChange}
              name={_EMAIL}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="mr-2 mb-2 mt-2">
        <Button loading={loading} actionState={actionState} />
      </DialogActions>
    </form>
  );
}

export default AdminFormBody;
