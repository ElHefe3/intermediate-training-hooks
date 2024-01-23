import { PaginationState } from '@tanstack/react-table';
import React, { useState } from 'react';

export const usePagination = (
  page = 0,
  pageSize = 10,
): [PaginationState, React.Dispatch<React.SetStateAction<PaginationState>>] => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: pageSize,
  });

  return [pagination, setPagination];
};
