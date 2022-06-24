import React from 'react';

import { ChildrenProps } from '@project/types';

export const FormScreenContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="flex h-5/6 flex-col justify-center w-1/2">{children}</div>;
};
