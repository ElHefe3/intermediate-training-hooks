import React from 'react';
import { TextInput, FormError, TextInputProps } from '@codehesion-za/headless';

export const TextField: React.FC<TextInputProps> = ({
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
