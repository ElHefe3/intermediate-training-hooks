import React from 'react';
import { Button as Btn } from '@material-ui/core';
import { Spinner } from 'react-activity';
import 'react-activity/dist/Spinner.css';

type Props = {
  children: React.ReactNode;
  type?: 'text' | 'outlined' | 'contained';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick: (T) => void;
  className?: string;
};

export const Button: React.FC<Props> = ({
  children,
  type = 'contained',
  isLoading = false,
  isDisabled = false,
  onClick,
  className,
}) => {
  return (
    <Btn variant={type} disabled={isLoading || isDisabled} onClick={onClick} className={className}>
      {isLoading ? <Spinner /> : children}
    </Btn>
  );
};
