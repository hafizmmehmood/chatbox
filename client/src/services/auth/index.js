import instance from '../../config/axios';
import { ParseError } from '../../config/utils';
import { isObject } from 'lodash';

export const AuthLogin = async (formData) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  return instance
    .post('/auth/login', formData)
    .then((response) => {
      if (response.data && response.data.code === 200) {

        response = response.data;
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('user', JSON.stringify(response?.data));
        localStorage.setItem('role', response?.data.role);
        return {
          ...responseData,
          role: response.data.role,
          status: 200,
          message: response.message
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data)
        };
      }
    })
    .catch((err) => {
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message
        )
      };
    });
};

export const ForgotPasswordRequest = async (formData) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  return instance
    .post('/auth/forgetPassword', formData)
    .then((response) => {
      if (response.data && response.data.code === 200) {
        response = response.data;
        return {
          ...responseData,
          data: isObject(response.data) ? response.data : {},
          status: 200,
          message: response.message
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data)
        };
      }
    })
    .catch((err) => {
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message
        )
      };
    });
};

export const ResetPasswordRequest = async (token, formData) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  return instance
    .post('/auth/resetPassword', {
      token: token,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    })
    .then((response) => {
      if (response.data && response.data.code === 200) {
        response = response.data;
        return {
          ...responseData,
          data: isObject(response.data) ? response.data : {},
          status: 200,
          message: response.message
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data)
        };
      }
    })
    .catch((err) => {
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message
        )
      };
    });
};
export const confirmEmail = async (token,formData) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  return instance
    .post('/auth/confirmation', {
      token: token,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    })
    .then((response) => {
      if (response.data && response.data.code === 200) {
        response = response.data;
        return {
          ...responseData,
          data: isObject(response.data) ? response.data : {},
          status: 200,
          message: response.message
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data)
        };
      }
    })
    .catch((err) => {
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message
        )
      };
    });
};
