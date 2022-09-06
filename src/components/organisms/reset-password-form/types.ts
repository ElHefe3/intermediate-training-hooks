import z from 'zod';

import { resetPasswordSchema } from './schemas';

export type ResetPasswordValuesProps = z.infer<typeof resetPasswordSchema>;
