import {
  AuthLayout,
  ForgotPasswordPage,
  LoginPage,
  ResetPasswordPage,
  UnlockAccountPage,
} from '@project/components';

export const AuthRouter = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/unlock-account',
        element: <UnlockAccountPage />,
      },
    ],
  },
];
