import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ErrorObject } from '@codehesion-za/headless';

import { User, UserForm } from '@project/components';
import { useSideModal } from '@project/hooks';
import { userModel, useUserQuery } from '@project/queries';
import { userService } from '@project/services';
import { EditUserPageProps } from './types';

export const EditUserPage = ({ isArchived }: EditUserPageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userQuery = useUserQuery(Number(id));
  const initialValues = userModel(userQuery?.data);
  const [SideModal, isOpen, closeModal] = useSideModal(true);

  const goBack = () => {
    navigate(-1);
  };

  const { mutateAsync } = useMutation(
    (formData: User) => userService.updateUser(Number(id), formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getUsers']).then(() => {
          toast.success('User updated');
          goBack();
        });
      },
      onError: (error: ErrorObject<typeof initialValues>) => {
        toast.error(error.message, { duration: 5000 });
      },
    },
  );

  const submitForm = (formData: User) => mutateAsync(formData);

  return (
    <SideModal isOpen={isOpen} onClose={closeModal} afterClose={goBack}>
      <h1 className="text-3xl pb-2">Edit User</h1>
      <UserForm
        initialValues={initialValues}
        onSubmitForm={submitForm}
        isEdit
        isArchived={isArchived}
      />
    </SideModal>
  );
};
