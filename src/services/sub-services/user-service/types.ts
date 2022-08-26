import z from 'zod';

import { userApiSchema } from './validations';

export type UserApi = z.infer<typeof userApiSchema>;
