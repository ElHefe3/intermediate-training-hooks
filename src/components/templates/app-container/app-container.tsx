import React from 'react';

import { ChildrenProps } from '@project/types';

export const AppContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="p-5">{children}</div>;
};
