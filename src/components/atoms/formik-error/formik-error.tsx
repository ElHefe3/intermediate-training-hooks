import React from 'react';
import { ErrorMessage } from 'formik';

import { FormikErrorProps } from './types';

export const FormikError: React.FC<FormikErrorProps> = ({ name, errorText }) => (
  <ErrorMessage name={name}>
    {(msg) => <span className="text-red-600">{errorText || msg}</span>}
  </ErrorMessage>
);
