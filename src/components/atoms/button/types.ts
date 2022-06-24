import { ChildrenProps } from '@project/types';

export interface ButtonProps extends ChildrenProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'text' | 'outlined' | 'contained';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick: (arg0: any) => void;
  className?: string;
}
