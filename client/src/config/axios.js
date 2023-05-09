import axios from 'axios';
import { serverUrl } from './config';
import { encryptedLocalStorage } from '../config/utils';

const instance = axios.create({
  baseURL: serverUrl
});

let isRefreshingToken = false;
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      const rememberMe = localStorage.getItem('rememberMe');
      if (rememberMe === 'false') {
        localStorage.clear();
        window.location.reload();
      }
      const refreshToken = encryptedLocalStorage.getItem('refreshToken');
      const originalRequest = error.config;
      if (!isRefreshingToken) {
        isRefreshingToken = true;
        return instance
          .post('/auth/refresh-token', {
            refreshToken: `Bearer ${refreshToken}`
          })
          .then(({ data: { data } }) => {
            encryptedLocalStorage.setItem('token', data.token);
            encryptedLocalStorage.setItem('refreshToken', data.refreshToken);
            encryptedLocalStorage.setItem('user', data);
            originalRequest.headers['authorization'] = `Bearer ${data.token}`;
            return axios.request(originalRequest);
          })
          .catch((error) => {
            localStorage.clear();
            window.location.reload();
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshingToken = false;
          });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
