import React from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/Spinner.css';

import { LoaderProps } from '../../../types';

export const Loader: React.FC<LoaderProps> = ({ children, isLoading }) => {
  return isLoading ? (
    <div className="flex w-full justify-center p-10">
      <Spinner />
    </div>
  ) : (
    <div>{children}</div>
  );
};
