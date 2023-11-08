import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from "./actions";
import { ParseError, encryptedLocalStorage } from '../../utils';
import { authApi } from './authApi'

 const getUser = () => {
   return encryptedLocalStorage.getItem('user') || null;
 };

 const getToken = () => {
  return encryptedLocalStorage.getItem('token') || null;
 }

const initialState = {
  user: getUser(),
  token: getToken(),
  loading: false,
  isSuccess: false,
  response: null
};

 const responseData = {
   status: 210,
   message: 'Something went wrong, Please try again.'
 };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLocalStorage(state, { payload }) {
      const { token, refreshToken, ...user } = payload.data;
      state.user = user;
      state.token = token;
      encryptedLocalStorage.setItem('token', token);
      encryptedLocalStorage.setItem('refreshToken', refreshToken);
      encryptedLocalStorage.setItem('role', payload.data.role);
      encryptedLocalStorage.setItem('user', user);
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.userLogin.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(authApi.endpoints.userLogin.matchFulfilled, (state, { payload }) => {
        state.response = {
          ...responseData,
          role: payload.data.role,
          status: 200,
          message: payload.message
        };
        state.loading = false;
        state.isSuccess = true;
    });
    builder.addMatcher(authApi.endpoints.userLogin.matchRejected, (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.response = {
        ...responseData,
        message: ParseError(
          payload.data && payload.data.message
            ? payload.data.message
            : payload.error
        )
      };
    });
  }
});

export const { setLocalStorage } = authSlice.actions;

export default authSlice.reducer;
