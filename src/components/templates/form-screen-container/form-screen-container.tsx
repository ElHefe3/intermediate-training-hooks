import React from 'react';

import { ChildrenProps } from '@project/types';

export const FormScreenContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="flex h-5/6 w-1/2 flex-col justify-center">{children}</div>;
};
