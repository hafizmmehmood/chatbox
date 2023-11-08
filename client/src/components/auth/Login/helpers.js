import * as Yup from 'yup';
export const LoginInitialValues = {
  email: '',
  password: '',
  rememberMe: false
};
export const ResetPassworfInitialValues = {
  email: ''
};
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required!')
});
export const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!')
});
