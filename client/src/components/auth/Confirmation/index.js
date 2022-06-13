import React, { useEffect } from 'react';
import { confirmEmail } from '../../../services/auth';
import UpdatePassword from '../UpdatePassword'
import {SET_PASSWORD} from '../../../utils/Constants';

const Confirmation = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <UpdatePassword title={SET_PASSWORD} UpdatePasswordRequest = {confirmEmail} />
    </>
  );
};

export default Confirmation;
