import z from 'zod';
import { loginSchema } from './schemas';

export type LoginValuesProps = z.infer<typeof loginSchema>;

export type RouteState = { from?: string };
