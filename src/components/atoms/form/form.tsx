import { Formik, FormikHelpers, FormikProps } from 'formik';
import { toast } from 'react-hot-toast';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import _ from 'lodash';

import { FormProps, ErrorObject } from './types';

export const Form = <T extends Record<string, unknown>>({
  initialValues,
  submitForm,
  onSuccess,
  onFailure,
  validationSchema,
  render,
}: FormProps<T>) => {
  const _handleFormSubmitError = (
    error: ErrorObject<typeof initialValues>,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    const apiErrors = error?.errors;
    if (!_.isEmpty(apiErrors)) {
      actions.setErrors(apiErrors);
    } else {
      toast.error(error.message);
    }
  };

  const _handleSubmission = (
    formData: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    submitForm(formData, actions)
      .then(() => {
        actions.setSubmitting(false);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error: ErrorObject<typeof initialValues>) => {
        actions.setSubmitting(false);
        if (onFailure) {
          onFailure(error, actions);
        } else {
          _handleFormSubmitError(error, actions);
        }
      });
  };

  const FormikBody = (props: FormikProps<typeof initialValues>) => {
    const { handleSubmit, handleReset } = props;

    return (
      <form onReset={handleReset} onSubmit={handleSubmit}>
        {render(props)}
      </form>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      validateOnBlur
      validateOnChange={false}
      onSubmit={_handleSubmission}
      enableReinitialize
    >
      {FormikBody}
    </Formik>
  );
};
