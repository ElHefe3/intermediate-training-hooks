import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { ErrorObject } from '@codehesion-za/headless';

import { UserForm, User } from '@project/components';
import { useSideModal } from '@project/hooks';
import { userModel } from '@project/queries';
import { userService } from '@project/services';

export const NewUserPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues = userModel();
  const [SideModal, isOpen, closeModal] = useSideModal(true);

  const goBack = () => {
    navigate(-1);
  };

  const { mutateAsync } = useMutation<User, ErrorObject<User>, User>((formData: User) =>
    userService.createUser(formData),
  );

  const submitForm = (formData: User) =>
    mutateAsync(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['getUsers']).then(() => {
          toast.success('User created');
          goBack();
        });
      },
      onError: (error) => {
        toast.error(error.message, { duration: 5000 });
      },
    });

  return (
    <SideModal isOpen={isOpen} onClose={closeModal} afterClose={goBack}>
      <h1 className="text-3xl pb-2">New User</h1>
      <UserForm initialValues={initialValues} onSubmitForm={submitForm} />
    </SideModal>
  );
};
