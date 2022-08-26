import z from 'zod';

import { forgotPasswordValidation } from './validators';

export type ForgotPasswordValuesProps = z.infer<typeof forgotPasswordValidation>;
