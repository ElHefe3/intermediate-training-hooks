import z from 'zod';
import { commonValidations, paginationApiSchema } from '../../../validators';

export const userApiSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: commonValidations.username,
});

export const usersApiSchema = z.object({
  users: z.array(userApiSchema),
  meta: paginationApiSchema,
});
