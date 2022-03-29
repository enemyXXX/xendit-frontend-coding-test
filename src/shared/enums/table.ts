import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel';

export interface RowsState {
  page: number;
  limit: number;
  name: string;
  country: string;
  sortField?: string;
  sortOrder: GridSortDirection;
}
