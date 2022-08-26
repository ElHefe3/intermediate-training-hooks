import z from 'zod';

import { resetPasswordValidation } from './validators';

export type ResetPasswordValuesProps = z.infer<typeof resetPasswordValidation>;
