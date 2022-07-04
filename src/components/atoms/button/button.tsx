import React from 'react';

import { ActivityLoader } from '@project/components';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'contained',
  isLoading = false,
  isDisabled = false,
  onClick,
  className,
}) => {
  let buttonStyle;

  switch (variant) {
    case 'contained':
      buttonStyle =
        'inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out';
      break;
    case 'outlined':
      buttonStyle =
        'inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out';
      break;
    case 'text':
      buttonStyle =
        'inline-block py-1 text-blue-600 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out';
  }

  return (
    <button
      type={type}
      disabled={isLoading || isDisabled}
      onClick={onClick}
      className={`flex justify-center rounded-md ${buttonStyle} ${className}`}
    >
      {isLoading ? <ActivityLoader isLoading /> : children}
    </button>
  );
};
