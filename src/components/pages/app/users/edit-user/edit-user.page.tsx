import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorObject } from '@codehesion-za/headless';
import { toast } from 'react-hot-toast';

import { User, UserForm } from '@project/components';
import { userService } from '@project/services';
import { useSideModal } from '@project/hooks';
import { userModel } from '@project/queries';

import { EditUserPageProps } from './types';

export const EditUserPage = ({ isArchived }: EditUserPageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userQuery = useQuery(['getUser', id], () => userService.getUser(Number(id)));
  const initialValues = userModel(userQuery?.data);
  const [SideModal, isOpen, closeModal] = useSideModal(true);

  const goBack = () => {
    navigate(-1);
  };

  const { mutateAsync } = useMutation(
    (formData: User) => userService.updateUser(Number(id), formData),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['getUsers']).then(() => {
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
      <h1 className="pb-2 text-3xl">Edit User</h1>
      <UserForm
        initialValues={initialValues}
        onSubmitForm={submitForm}
        isEdit
        isArchived={isArchived}
      />
    </SideModal>
  );
};
