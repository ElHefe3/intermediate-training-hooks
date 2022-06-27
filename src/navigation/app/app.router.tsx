import {
  ProtectedRoute,
  HomePage,
  UsersPage,
  AppLayout,
  EditUserPage,
  NewUserPage,
} from '@project/components';

export const AppRouter = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/archived',
        element: (
          <ProtectedRoute>
            <UsersPage isArchived />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export const AppModalRouter = [
  {
    path: '/users/:id/edit',
    element: (
      <ProtectedRoute>
        <EditUserPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/archived/:id/edit',
    element: (
      <ProtectedRoute>
        <EditUserPage isArchived />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/new',
    element: (
      <ProtectedRoute>
        <NewUserPage />
      </ProtectedRoute>
    ),
  },
];
