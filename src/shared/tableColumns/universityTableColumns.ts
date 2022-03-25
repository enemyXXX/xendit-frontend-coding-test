import { GridColDef } from '@mui/x-data-grid';

export const universityTableColumns: GridColDef[] = [
  { field: 'name', headerName: 'UNIVERSITY NAME', flex: 1, sortable: true },
  { field: 'country', headerName: 'COUNTRY', flex: 1, sortable: true },
];
