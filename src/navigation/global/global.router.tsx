import { NotFound } from '@project/components';

export const GlobalRouter = [
  {
    path: '*',
    element: <NotFound />,
  },
];
