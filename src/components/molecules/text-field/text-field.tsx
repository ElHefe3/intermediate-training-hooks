import React from 'react';
import { TextInput, FormError } from '@codehesion-za/headless';

import { TextInputPropsType } from './types';

export const TextField: React.FC<TextInputPropsType> = ({
  name,
  label,
  required,
  errorText,
  ...rest
}) => {
  const Required = () => (required ? <span> *</span> : null);

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>
        {label}
        <Required />
      </label>
      <TextInput name={name} {...rest} />
      <FormError name={name} errorText={errorText} />
    </div>
  );
};
