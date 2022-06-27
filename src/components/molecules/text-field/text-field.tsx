import React from 'react';
import { useField } from 'formik';

import { FormikError } from '@project/components';
import { TextFieldProps } from './type';

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  type,
  required,
  errorText,
  value,
  onChange,
}) => {
  const [fieldProps] = useField({ name, required, type, value, onChange });

  const Required = () => (required ? <span> *</span> : null);

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>
        {label}
        <Required />
      </label>
      <input {...fieldProps} id={name} type={type} placeholder={placeholder} required={required} />
      <FormikError name={name} errorText={errorText} />
    </div>
  );
};
