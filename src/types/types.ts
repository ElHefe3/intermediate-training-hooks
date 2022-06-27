import { ReactNode } from 'react';

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

export type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};
