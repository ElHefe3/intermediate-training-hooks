import { FormikProps } from 'formik/dist/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Button, Form, TextField } from '@project/components';
import { userService } from '@project/services';
import { User, UserProps } from './types';
import { userSchema } from './schemas';

export const UserForm = ({
  initialValues,
  submitForm,
  onSuccess,
  onFailure,
  isEdit,
  isArchived,
}: UserProps) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const invalidateUsers = () => queryClient.invalidateQueries(['getUsers']).then(goBack);

  const archiveMutation = useMutation(() => userService.archiveUser(Number(id)), {
    onSuccess: () => {
      toast.success('User archived');
      return invalidateUsers();
    },
    onError: () => toast.error('Failed to archive'),
  });

  const restoreMutation = useMutation(() => userService.restoreUser(Number(id)), {
    onSuccess: () => {
      toast.success('User restored');
      return invalidateUsers();
    },
    onError: () => toast.error('Failed to restore'),
  });

  const onArchive = () => archiveMutation.mutateAsync();

  const onRestore = () => restoreMutation.mutateAsync();

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
      validationSchema={userSchema}
      render={FormComponent}
    />
  );
};
