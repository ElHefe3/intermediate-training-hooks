import React from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/Spinner.css';

import { ActivityLoaderProps } from '../../../types';

export const ActivityLoader: React.FC<ActivityLoaderProps> = ({ isLoading }) => {
  return isLoading ? <Spinner /> : null;
};
