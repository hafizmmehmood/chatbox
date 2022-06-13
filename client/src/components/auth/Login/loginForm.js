import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  _MEDIUM,
  _OUTLINE,
  _PASSWORD,
  _EMAIL,
  _SUBMIT
} from '../../../utils/Constants';
import { EMAIL, PASSWORD, LOGIN } from './constants';
import { Button, TextField } from '@mui/material';

const LoginForm = (props) => {
  const { touched, errors, loading, values, handleSubmit, handleChange } =
    props;
  return (
    <form onSubmit={handleSubmit} autoComplete="off" id="login-submit">
      <div className="mb-4">
        <TextField
          size={_MEDIUM}
          fullWidth
          variant={_OUTLINE}
          className="custom-text-field dark:custom-text-field-dark"
          id="textfield-login-email"
          label={EMAIL}
          type={_EMAIL}
          name={_EMAIL}
          helperText={touched.email && errors.email}
          onChange={handleChange}
          value={values.email}
        />
      </div>
      <div className="mb-3">
        <TextField
          size={_MEDIUM}
          fullWidth
          variant={_OUTLINE}
          className="custom-text-field dark:custom-text-field-dark"
          type={_PASSWORD}
          autoComplete="new-password"
          name={_PASSWORD}
          id="textfield-login-password"
          helperText={touched.password && errors.password}
          onChange={handleChange}
          value={values.password}
          label={PASSWORD}
        />
      </div>

      <div className="text-center text-white pt-2">
        <Button
          disabled={loading}
          type={_SUBMIT}
          className="mt-4 w-full bg-indigo-700"
          variant="contained">
          {loading ? (
            <CircularProgress className="text-indigo-700" size={24} />
          ) : (
            LOGIN
          )}
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;
