import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { encryptedLocalStorage } from '../../utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = encryptedLocalStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (formData) => ({
        url: '/auth/login',
        method: 'POST',
        body: formData
      }),
      transformResponse: (response)=>{
        if (response.data && response.code === 200) {
          return response;
        } else {
          builder.rejectWithValue(response);
        }
      }
    })
  })
});

export const { useUserLoginMutation } = authApi;
