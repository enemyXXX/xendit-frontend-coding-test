import { PaginationModel } from '../../shared/models/paginationModel';

export const PER_PAGE = 10;

export const initialPaginationModel: PaginationModel = {
  from: 0,
  to: 0,
  total: 0,
  current_page: 0,
  last_page: 0,
  per_page: PER_PAGE,
};
