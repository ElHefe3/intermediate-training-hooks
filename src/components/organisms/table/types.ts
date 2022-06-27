import React from 'react';
import { ColumnDef, PaginationState, ReactTableGenerics, Table } from '@tanstack/react-table';
import { Overwrite } from '@tanstack/table-core/build/types/utils';

export type TableProps<Value> = {
  table: Table<Overwrite<ReactTableGenerics, { Row: Value }>>;
  columns: ColumnDef<Overwrite<ReactTableGenerics, { Row: Value }>>[];
  data: Value[];
  isLoading?: boolean;
  paginationSizeOptions?: number[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
};
