import { FormikProps } from 'formik/dist/types';
import { useParams } from 'react-router-dom';

import { Button, Form, TextField } from '@project/components';
import { User } from '@project/react-queries';
import { userService } from '@project/services';
import { UserProps } from './types';
import { userValidation } from './validators';

export const UserForm = ({
  initialValues,
  submitForm,
  onSuccess,
  onFailure,
  isEdit,
  isArchived,
}: UserProps) => {
  const { id } = useParams();

  const onArchive = () => {
    return userService.archiveUser(Number(id));
  };

  const onRestore = () => {
    return userService.restoreUser(Number(id));
  };

  const FormComponent = ({ isSubmitting, handleSubmit }: FormikProps<User>) => (
    <div className="space-y-4">
      <TextField name="firstName" label="First Name" type="text" />
      <TextField name="lastName" label="Last Name" type="text" />
      <TextField name="email" label="Email" type="email" />
      <Button
        type="submit"
        isLoading={isSubmitting}
        onClick={handleSubmit}
        className="submit-button"
      >
        {isEdit ? 'Update' : 'Create'}
      </Button>
      {isEdit && !isArchived ? (
        <Button type="button" onClick={onArchive} className="submit-button">
          Archive
        </Button>
      ) : null}
      {isEdit && isArchived ? (
        <Button type="button" onClick={onRestore} className="submit-button">
          Restore
        </Button>
      ) : null}
    </div>
  );

  return (
    <Form
      initialValues={initialValues}
      submitForm={submitForm}
      onSuccess={onSuccess}
      onFailure={onFailure}
      validationSchema={userValidation}
      render={FormComponent}
    />
  );
};
