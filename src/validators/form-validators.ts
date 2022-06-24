import * as Yup from 'yup';

export const commonValidations = {
  username: Yup.string().email('Email must be a valid email').required('Email is required'),
  password: (edit = false) =>
    Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?!.*\s)/,
        'Passwords must contain at least one uppercase letter, one lowercase letter, one numeric digit and one special character',
      )
      .when('edit', {
        is: () => !edit,
        then: Yup.string().required('Enter your password'),
        otherwise: Yup.string(),
      }),
  confirmPassword: Yup.mixed()
    .test('match', 'Does not match', (value, testContext) => {
      return testContext.parent.password === testContext.parent.confirmPassword;
    })
    .required('Reenter your password'),
  mobile: Yup.string().required('Must provide a mobile number'),
};
