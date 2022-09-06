import z from 'zod';

export const commonSchemas = {
  username: z.string().email('Must be a valid email'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/^(?=.*[a-z])/, 'Must have 1 lowercase letter')
    .regex(/^(?=.*[A-Z])/, 'Must have 1 uppercase letter')
    .regex(/^(?=.*\d)/, 'Must have 1 digit')
    .regex(/^(?=.*[^a-zA-Z\d])/, 'Must have 1 symbol'),
  mobile: z.union([z.string().min(12).startsWith('+27'), z.string().min(10).startsWith('0')]),
};

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
});

export const paginationApiSchema = z.object({
  current_page: z.number(),
  total_pages: z.number(),
  total_count: z.number(),
});
