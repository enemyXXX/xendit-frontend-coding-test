import { PaginationModel } from '../../shared/models/paginationModel';

export const PER_PAGE = 10;

export const initialPaginationModel: PaginationModel = {
  from: 1,
  to: 1,
  total: 1,
  current_page: 1,
  last_page: 1,
  per_page: PER_PAGE,
};
