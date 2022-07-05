import _ from 'lodash';

import { PaginationData } from '../types';

export const paginationModel = (data = {}): PaginationData => ({
  currentPage: _.get(data, 'current_page', 0),
  totalPages: _.get(data, 'total_pages', 0),
  totalCount: _.get(data, 'total_count', 0),
});
