import z from 'zod';

import { forgotPasswordSchema } from './schemas';

export type ForgotPasswordValuesProps = z.infer<typeof forgotPasswordSchema>;
