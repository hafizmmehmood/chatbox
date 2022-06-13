import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ImageLight from '../../../assets/img/forgot-password-office.jpeg';
import ImageDark from '../../../assets/img/forgot-password-office-dark.jpeg';
import { Formik } from 'formik';
import { ForgotPasswordRequest } from '../../../services/auth';
import { ForgetPasswordInitialValues, ForgetPasswordSchema } from './helpers';
import { error } from '../../shared/Helpers';
import { Button, TextField } from '@mui/material';
import { _EMAIL, _SUBMIT, _MEDIUM, _OUTLINE } from '../../../utils/Constants';
import { EMAIL } from './constants';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const SubmitForm = useCallback((data) => {
    setLoading(true);
    ForgotPasswordRequest(data).then((res) => {
      setLoading(false);
      if (res.status === 200) window.location = '/login';
      else error(res.message);
    });
  }, []);

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Forgot password
                </h1>
                {/* login form start */}
                <div>
                  <Formik
                    initialValues={ForgetPasswordInitialValues}
                    onSubmit={SubmitForm}
                    validationSchema={ForgetPasswordSchema}>
                    {(props) => {
                      const {
                        handleSubmit,
                        touched,
                        values,
                        handleChange,
                        errors
                      } = props;
                      return (
                        <form
                          onSubmit={handleSubmit}
                          autoComplete="off"
                          id="login-submit">
                          <div className="mb-4">
                            <TextField
                              size={'_MEDIUM'}
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
                          <Button
                            disabled={loading}
                            size={_MEDIUM}
                            type={_SUBMIT}
                            className="mt-4 w-full bg-indigo-700"
                            variant="contained">
                            Send Rquest
                          </Button>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
                {/* login form end */}
                <hr className="my-8" />
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline"
                    to="/login">
                    Login?
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
