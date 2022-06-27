import { ChangeEventHandler } from 'react';

export type TextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'time'
    | 'week';
  required?: boolean;
  errorText?: string;
  value?: any;
  onChange?: ChangeEventHandler<any> | undefined;
};
