export type BaseFormProps<T> = {
  submitForm: Function;
  onSuccess: Function;
  onFailure?: Function;
  initialValues: T;
};
