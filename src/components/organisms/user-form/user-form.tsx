import { FormikProps } from 'formik/dist/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Form } from '@codehesion-za/headless';

import { Button, TextField } from '@project/components';
import { userService } from '@project/services';
import { User, UserProps } from './types';
import { userSchema } from './schemas';

export const UserForm = ({
  initialValues,
  onSubmitForm,
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
      <TextField name="email" label="Email" type="email" autoComplete="username" />
      <TextField name="password" label="Password" type="password" autoComplete="new-password" />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
      />
      <Button type="submit" isLoading={isSubmitting} onClick={handleSubmit} style="submit-button">
        {isEdit ? 'Update' : 'Create'}
      </Button>
      {isEdit && !isArchived ? (
        <Button type="button" onClick={onArchive} style="submit-button">
          Archive
        </Button>
      ) : null}
      {isEdit && isArchived ? (
        <Button type="button" onClick={onRestore} style="submit-button">
          Restore
        </Button>
      ) : null}
    </div>
  );

  return (
    <Form
      initialValues={initialValues}
      onSubmitForm={onSubmitForm}
      onSuccess={onSuccess}
      onFailure={onFailure}
      validationSchema={userSchema(!isEdit)}
      render={FormComponent}
    />
  );
};
