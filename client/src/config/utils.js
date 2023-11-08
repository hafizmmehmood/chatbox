import { isArray, isString } from 'lodash';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY;

export const getAuthHeader = () => {
  return new Promise(resolve => {
    const token = encryptedLocalStorage.getItem('token');
    if (token) {
      resolve({
        headers: {
          authorization: 'Bearer ' + token
        }
      });
    } else resolve(null);
  });
};

export const ParseError = error => {
  let err = 'Something went wrong, Please try again.';
  if (error.message && isArray(error.message)) {
    err = error.message[0];
    if (!isString(err) && isArray(err)) {
      err = err[0] && err[0].msg ? err[0].msg : err[0];
    } else {
      err = err.msg;
    }
  } else {
    if (error.message && isString(error.message)) {
      err = error.message;
    }
    if (error.message && isString(error.message)) {
      err = error.message;
    }
  }
  if (err === 'Invalid login credentials. Please try again.') {
    err = 'Email and password is invalid!';
  }
  return err;
};

export const encryptedLocalStorage = (() => {
  return {
    setItem: (name,data)=> {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
      localStorage.setItem(name, encrypted);
    },
    getItem: (name) => {
      const encrypted = localStorage.getItem(name);
      if(!encrypted) return null;
      const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    }
  }
})();
