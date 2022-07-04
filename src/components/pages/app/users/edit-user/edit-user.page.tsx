import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { ErrorObject, UserForm } from '@project/components';
import { useSideModal } from '@project/hooks';
import { User, userModel, useUserQuery } from '@project/react-queries';
import { userService } from '@project/services';
import { EditUserPageProps } from './types';

export const EditUserPage = ({ isArchived }: EditUserPageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userQuery = useUserQuery(Number(id));
  const initialValues = userModel(_.get(userQuery, 'data'));
  const [SideModal, isOpen, closeModal] = useSideModal(true);

  const goBack = () => {
    navigate(-1);
  };

  const submitForm = (formData: User) => {
    return userService.updateUser(Number(id), formData);
  };

  const onSuccess = () => {
    navigate(-1);
  };

  const onFailure = (error: ErrorObject<typeof initialValues>) => {
    toast.error(error.message, { duration: 5000 });
  };

  return (
    <SideModal isOpen={isOpen} onClose={closeModal} afterClose={goBack}>
      <h1 className="text-3xl pb-2">Edit User</h1>
      <UserForm
        initialValues={initialValues}
        submitForm={submitForm}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isEdit
        isArchived={isArchived}
      />
    </SideModal>
  );
};
