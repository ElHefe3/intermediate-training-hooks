import React from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/Spinner.css';

import { LoadingContainerProps } from './types';

export const LoadingContainer: React.FC<LoadingContainerProps> = ({ children, isLoading }) => {
  return isLoading ? (
    <div className="flex w-full justify-center p-10">
      <Spinner />
    </div>
  ) : (
    <>{children}</>
  );
};
