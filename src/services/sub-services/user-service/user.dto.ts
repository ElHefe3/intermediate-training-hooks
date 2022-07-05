import { User } from '../../../queries';

export const userDto = (formData: User) => ({
  user: {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
  },
});
