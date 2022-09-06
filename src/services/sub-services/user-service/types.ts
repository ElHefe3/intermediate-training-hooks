import z from 'zod';

import { userApiSchema } from './schemas';

export type UserApi = z.infer<typeof userApiSchema>;
