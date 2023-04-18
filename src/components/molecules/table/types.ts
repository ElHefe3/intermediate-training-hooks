import React from 'react';
import { ColumnDef, PaginationState } from '@tanstack/react-table';

export type TableProps<Value> = {
  columns: ColumnDef<Value, any>[];
  data: Value[];
  isLoading?: boolean;
  paginationSizeOptions?: number[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pageCount?: number;
};
