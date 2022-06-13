import React, { useState } from 'react';
import ImageLight from '../../../assets/img/login-office.jpeg';
import ImageDark from '../../../assets/img/login-office-dark.jpeg';
import { Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import { updatePasswordInitialValues, updatePasswordSchema } from './helpers';
import UpdatePasswordForm from './updatePasswordForm';
import { _CONFIRM_TOKEN } from '../../../utils/Constants';
import { success, error } from '../../shared/Helpers';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UpdatePassword = ({ title, UpdatePasswordRequest }) => {
  let query = useQuery();
  const [loading, setLoading] = useState(false);

  const SubmitForm = data => {
    const token = query.get(_CONFIRM_TOKEN);
    setLoading(true);
    UpdatePasswordRequest(token, data).then(res => {
      setLoading(false);
      if (res.status === 200) {
        success(res.message);
        window.location = '/login';
      } else error(res.message);
    });
  };
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
                  {title}
                </h1>
                <div>
                  <Formik
                    initialValues={updatePasswordInitialValues}
                    onSubmit={SubmitForm}
                    validationSchema={updatePasswordSchema}>
                    {props => {
                      return (
                        <>
                          <UpdatePasswordForm
                            loading={loading}
                            {...props}
                            title={title}
                          />
                        </>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdatePassword;
