import * as Yup from 'yup';
import 'yup-phone';

function matchPasswords() {
  return this.parent.password === this.parent.confirmPassword;
}

const validationSchema = {
  username: Yup.string().email('Email must be a valid email').required('Email is required'),
  password: (edit = false) =>
    Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/,
        'Passwords must contain at least one uppercase letter, one lowercase letter, one numeric digit and one special character',
      )
      .when('edit', {
        is: () => !edit,
        then: Yup.string().required('Enter your password'),
        otherwise: Yup.string(),
      }),
  confirmPassword: Yup.mixed()
    .test('match', 'Does not match', matchPasswords)
    .required('Reenter your password'),
  mobileZA: Yup.string().phone('ZA').required(),
  mobile: Yup.mixed().test('mobile', 'Must provide a mobile number', (data) =>
    validationSchema.mobileZA.isValidSync(data),
  ),
};

export const loginValidation = Yup.object({
  username: validationSchema.username,
  password: validationSchema.password(false),
});

export const forgotPasswordValidation = Yup.object({
  username: validationSchema.username,
});

export const resetPasswordValidation = Yup.object({
  password: validationSchema.password(false),
  confirmPassword: validationSchema.confirmPassword,
});
