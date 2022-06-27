import { ReactNode } from 'react';
import { ObjectSchema } from 'yup';
import { FormikHelpers } from 'formik';
import { FormikProps } from 'formik/dist/types';

export type BaseFormProps<T> = {
  initialValues: T;
  submitForm: (formData: T) => Promise<any>;
  onSuccess: () => void;
  onFailure?: (error: ErrorObject<T>) => void;
};

export type ErrorObject<T> = {
  errors: any | T;
  statusCode: number;
  message: string;
};

export type FormProps<Value> = {
  initialValues: Value;
  submitForm: (formData: Value) => Promise<any>;
  onSuccess: () => void;
  onFailure?: (error: ErrorObject<Value>, actions: FormikHelpers<Value>) => void;
  validationSchema: ObjectSchema<any>;
  render: (props: FormikProps<Value>) => ReactNode;
};
