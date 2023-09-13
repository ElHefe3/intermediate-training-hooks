import { FormProps } from '@codehesion-za/headless';
import z from 'zod';

import { userSchema } from './schemas';

const user = userSchema();
export type User = z.infer<typeof user>;

export type UserProps = {
  isEdit?: boolean;
  isArchived?: boolean;
} & Omit<FormProps<User>, 'validationSchema' | 'render'>;
