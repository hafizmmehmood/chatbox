import React from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import {
  _OUTLINE,
  _MEDIUM,
  _PASSWORD,
  _SUBMIT
} from '../../../utils/Constants';
import {
  LOGIN,
  _NEW_PASSWORD,
  NEW_PASSWORD,
  ENTER_NEW_PASSWORD,
  _CONFIRM_PASSWORD,
  CONFIRM_PASSWORD,
  RE_ENTER_PASSWORD
} from './constants';

const ResetPasswordForm = (props) => {
  const {
    touched,
    errors,
    loading,
    values,
    handleSubmit,
    handleChange,
    title
  } = props;
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mb-4 w-100">
        <div className="mb-4 mt-2 w-100">
          <TextField
            fullWidth
            variant={_OUTLINE}
            className="custom-text-field dark:custom-text-field-dark"
            size={_MEDIUM}
            type={_PASSWORD}
            autoComplete={_NEW_PASSWORD}
            name={_PASSWORD}
            id="textfield-password"
            onChange={handleChange}
            helperText={touched.password && errors.password}
            label={NEW_PASSWORD}
            placeholder={ENTER_NEW_PASSWORD}
          />
        </div>
        <div className="mb-4 mt-2 w-100">
          <TextField
            fullWidth
            variant={_OUTLINE}
            className="custom-text-field dark:custom-text-field-dark"
            size={_MEDIUM}
            type={_PASSWORD}
            autoComplete="confirm-password"
            name={_CONFIRM_PASSWORD}
            id="textfield-confrim-password"
            onChange={handleChange}
            helperText={touched.confirmPassword && errors.confirmPassword}
            label={CONFIRM_PASSWORD}
            placeholder={RE_ENTER_PASSWORD}
            value={values.email}
          />
        </div>
        <Button
          type={_SUBMIT}
          className="mt-4 w-full bg-indigo-700"
          variant="contained">
          {!loading ? (
            title
          ) : (
            <CircularProgress className="text-indigo-700" size={24} />
          )}
        </Button>
      </div>

      <hr className="my-8" />
      <div id="signup-div" className="text-center text-sm mt-4 cursor-pointer">
        Don't want to Update?{' '}
        <a
          href={'/login'}
          className="text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline">
          {LOGIN}
        </a>
      </div>
    </form>
  );
};
export default ResetPasswordForm;
