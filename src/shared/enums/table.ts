import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel';

export interface RowsState {
  page: number;
  pageSize: number;
  search: string;
  country: string;
  sortField?: string;
  sortOrder: GridSortDirection;
}
