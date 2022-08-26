import { ReactNode } from 'react';
import z from 'zod';

import { paginationApiSchema, paginationSchema } from '@project/validators';

export type ChildrenProps = {
  children: ReactNode;
};

export type OptionalChildrenProps = {
  children?: ReactNode;
};

export type BaseOption = {
  label: string;
  value: string;
};

export type BaseMultiOption = {
  label: string;
  options: BaseOption[];
};

export type Pagination = z.infer<typeof paginationSchema>;

export type PaginationApi = z.infer<typeof paginationApiSchema>;
