import React from 'react';
import { ResetPasswordRequest } from '../../../services/auth';
import { RESET_PASSWORD } from '../../../utils/Constants';
import UpdatePassword from '../UpdatePassword';

const ResetPassword = () => {
  return (
      <UpdatePassword title={RESET_PASSWORD} UpdatePasswordRequest = {ResetPasswordRequest} />
  );
};
export default ResetPassword;
