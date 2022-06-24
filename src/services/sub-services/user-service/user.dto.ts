import { User } from '../../../react-queries';

export const userDto = (formData: User) => ({
  user: {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
  },
});
