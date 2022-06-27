import React from 'react';

import { ChildrenProps } from '@project/types';

export const FormBodyContainer: React.FC<ChildrenProps> = ({ children }) => (
  <div className="grid grid-cols-1 gap-5">{children}</div>
);
