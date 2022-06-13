import * as Yup from 'yup';

export const ForgetPasswordInitialValues = {
  email: ''
};

export const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!')
});
