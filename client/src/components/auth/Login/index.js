import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageLight from '../../../assets/img/login-office.jpeg';
import ImageDark from '../../../assets/img/login-office-dark.jpeg';
import { Formik } from 'formik';
import LoginForm from './loginForm';
import { LoginInitialValues, LoginSchema } from './helpers';
import { success, error } from '../../shared/Helpers';
import { useDispatch } from 'react-redux';
import { setLocalStorage } from '../../../config/features/auth/authSlice'
import { useUserLoginMutation } from '../../../config/features/auth/authApi';

const Login = () => {
  const dispatch = useDispatch();
  const [userLogin, { isLoading, isSuccess, isError, error: loginError, data}] = useUserLoginMutation();
  const SubmitForm = useCallback(data => {
    userLogin(data);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        dispatch(setLocalStorage(data));
        success(data.message);
        //navigate('/dashboard');
      } else if (isError) {
        error(loginError.error || loginError.data.message);
      }
    }
  }, [isLoading, isSuccess, isError]);

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
                  Login
                </h1>
                {/* login form start */}
                <div>
                  <Formik
                    initialValues={LoginInitialValues}
                    onSubmit={SubmitForm}
                    validationSchema={LoginSchema}>
                    {props => {
                      return (
                        <>
                          <LoginForm
                            loading={isLoading}
                            {...props}
                          />
                        </>
                      );
                    }}
                  </Formik>
                </div>
                {/* login form end */}
                <hr className="my-8" />
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline"
                    to="/forgot-password">
                    Forgot your password?
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

export default Login;
