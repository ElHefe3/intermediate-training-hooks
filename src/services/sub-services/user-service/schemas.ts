import z from 'zod';
import { commonSchemas, paginationApiSchema } from '../../../schemas';

export const userApiSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: commonSchemas.username,
});

export const usersApiSchema = z.object({
  users: z.array(userApiSchema),
  meta: paginationApiSchema,
});
