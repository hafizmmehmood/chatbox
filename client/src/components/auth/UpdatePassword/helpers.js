import * as Yup from 'yup';
export const updatePasswordInitialValues = {
  password: '',
  confirmPassword: ''
};
export const updatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please Enter your password')
    .test(
      'regex',
      'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase',
      (val) => {
        let regExp = new RegExp(
          '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
        );
        return regExp.test(val);
      }
    ),
  confirmPassword: Yup.string()
    .required('Please Enter confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
