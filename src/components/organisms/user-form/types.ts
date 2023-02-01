import { FormProps } from '@codehesion-za/headless';
import z from 'zod';

import { userSchema } from './schemas';

export type User = z.infer<typeof userSchema>;

export interface UserProps extends Omit<FormProps<User>, 'validationSchema' | 'render'> {
  isEdit?: boolean;
  isArchived?: boolean;
}
