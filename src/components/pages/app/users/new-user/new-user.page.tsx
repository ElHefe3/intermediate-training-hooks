import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ErrorObject } from '@codehesion-za/headless';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { UserForm, User } from '@project/components';
import { userService } from '@project/services';
import { useSideModal } from '@project/hooks';
import { userModel } from '@project/queries';

export const NewUserPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues = userModel();
  const [SideModal, isOpen, closeModal] = useSideModal(true);

  const goBack = () => {
    navigate(-1);
  };

  const { mutateAsync } = useMutation((formData: User) => userService.createUser(formData));

  const submitForm = (formData: User) =>
    mutateAsync(formData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['getUsers']).then(() => {
          toast.success('User created');
          goBack();
        });
      },
      onError: (error) => {
        const { message } = error as ErrorObject<typeof initialValues>;
        toast.error(message, { duration: 5000 });
      },
    });

  return (
    <SideModal isOpen={isOpen} onClose={closeModal} afterClose={goBack}>
      <h1 className="pb-2 text-3xl">New User</h1>
      <UserForm initialValues={initialValues} onSubmitForm={submitForm} />
    </SideModal>
  );
};
