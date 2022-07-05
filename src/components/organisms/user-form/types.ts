import { BaseFormProps } from '@project/components';
import { User } from '@project/queries';

export interface UserProps extends BaseFormProps<User> {
  isEdit?: boolean;
  isArchived?: boolean;
}
