import { PaginationApi, Pagination } from '@project/types';

export const paginationModel = (data?: PaginationApi): Pagination => ({
  currentPage: data?.current_page ?? 0,
  totalPages: data?.total_pages ?? 0,
  totalCount: data?.total_count ?? 0,
});
