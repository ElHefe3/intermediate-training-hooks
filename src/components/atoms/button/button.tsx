import React from 'react';
import { Button as Btn } from '@codehesion-za/headless';

import { ActivityLoader } from '@project/components';
import { ButtonPropsType } from './types';

export const Button: React.FC<ButtonPropsType> = ({
  children,
  variant = 'contained',
  className,
  disabledClassName,
  ...rest
}) => {
  let _className: string;
  let _disableClassName: string;

  switch (variant) {
    case 'contained':
      _className =
        'inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out';
      _disableClassName = 'bg-gray-100 text-gray-400';
      break;
    case 'outlined':
      _className =
        'inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out';
      _disableClassName = 'bg-gray-100 border-gray-400 text-gray-400';
      break;
    case 'text':
      _className =
        'inline-block py-1 text-blue-600 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out';
      _disableClassName = 'text-gray-400';
  }

  return (
    <Btn
      className={className || _className}
      disabledClassName={disabledClassName || _disableClassName}
      loader={<ActivityLoader isLoading />}
      {...rest}
    >
      {children}
    </Btn>
  );
};
