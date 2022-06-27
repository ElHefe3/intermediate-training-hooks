import { ChangeEventHandler } from 'react';

export type CheckboxProps = {
  name: string;
  color?: string;
  checked: boolean;
  onChange?: ChangeEventHandler<any> | undefined;
};
