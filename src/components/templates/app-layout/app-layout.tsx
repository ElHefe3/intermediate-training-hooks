import React from 'react';
import { Outlet } from 'react-router-dom';

import { Drawer, Nav } from '@project/components';
import { OptionalChildrenProps } from '@project/types';

export const AppLayout: React.FC<OptionalChildrenProps> = ({ children }) => (
  <div className="flex">
    <Drawer />
    <Nav>{children || <Outlet />}</Nav>
  </div>
);
