import instance from '../../../config/axios';
import { ParseError, getAuthHeader } from '../../../config/utils';
import { isObject } from 'lodash';

export const GetAdmins = async () => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  const headers = await getAuthHeader();
  return instance
    .get('/admin/admins/', headers)
    .then((response) => {
      if (response.data && response.data.code === 200) {
        response = response.data;
        return {
          ...responseData,
          status: 200,
          data: response.data,
          message: response.message,
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

export const CreateAdmin = async (formData) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  const headers = await getAuthHeader();

  return instance
    .post('/admin/admins/', formData, headers)
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

export const UpdateAdmin = async ({formData, id}) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  const headers = await getAuthHeader();
  
  return instance
    .put('/admin/admins/' + id, formData, headers)
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

export const EnableOrDisableAdmin = async (formData) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  const headers = await getAuthHeader();

  return instance
    .post('/admin/admins/enabled', formData, headers)
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
export const ResentInvitation = async (id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.'
  };
  const headers = await getAuthHeader();

  return instance
    .get(`/admin/admins/${id}/resentInvitation`, headers)
    .then((response) => {
      if (response.data && response.data.code === 200) {
        response = response.data;
        return {
          ...responseData,
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
