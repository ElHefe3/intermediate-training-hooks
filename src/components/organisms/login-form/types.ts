import z from 'zod';
import { loginValidation } from './validators';

export type LoginValuesProps = z.infer<typeof loginValidation>;

export type RouteState = { from?: string };
