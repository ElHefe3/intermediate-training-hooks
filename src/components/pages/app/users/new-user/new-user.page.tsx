import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { ErrorObject, UserForm } from '@project/components';
import { useSideModal } from '@project/hooks';
import { User, userModel } from '@project/react-queries';
import { userService } from '@project/services';

export const NewUserPage = () => {
  const navigate = useNavigate();
  const initialValues = userModel();
  const [SideModal, isOpen, closeModal] = useSideModal(true);

  const goBack = () => {
    navigate(-1);
  };

  const submitForm = (formData: User) => {
    return userService.createUser(formData);
  };

  const onSuccess = () => {
    navigate(-1);
  };

  const onFailure = (error: ErrorObject<typeof initialValues>) => {
    toast.error(error.message, { duration: 5000 });
  };

  return (
    <SideModal isOpen={isOpen} onClose={closeModal} afterClose={goBack}>
      <h1 className="text-3xl pb-2">New User</h1>
      <UserForm
        initialValues={initialValues}
        submitForm={submitForm}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </SideModal>
  );
};
