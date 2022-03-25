import React, { useEffect, useMemo, useState } from 'react';
import styles from './MainPage.module.css';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { getIsUniversitiesLoading, getUniversities, getUniversitiesList } from './services/mainSlice';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { universityTableColumns } from '../../shared/tableColumns/universityTableColumns';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { PER_PAGE } from '../../global/constants/pagination';
import { RowsState } from '../../shared/enums/table';
import { FormControl, IconButton, InputAdornment, InputLabel, Menu, MenuItem, TextField } from '@mui/material';
import { MoreVert, Search } from '@mui/icons-material';
import { UniversityModel } from '../../shared/models/universityModel';
import { Select } from '@material-ui/core';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const universities = useAppSelector(getUniversitiesList);
  const isUniversitiesLoading = useAppSelector(getIsUniversitiesLoading);
  const [selectedRow, setSelectedRow] = useState<UniversityModel>();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState<string>('');
  const [rowsState, setRowsState] = React.useState<RowsState>({
    page: 1,
    pageSize: PER_PAGE,
    search: '',
    country: '',
    sortField: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      rowsState.search !== search &&
        setRowsState((prev) => ({
          ...prev,
          search: search,
        }));
    }, 500);

    return () => clearTimeout(searchDelay);
  }, [search, rowsState]);

  useEffect(() => {
    dispatch(getUniversities(rowsState));
  }, [rowsState]);

  const columns: GridColDef[] = [
    ...universityTableColumns,
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 30,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuClick(e, params.row)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id={params.row.id}
            anchorEl={anchorEl}
            keepMounted={false}
            open={selectedRow?.id === params.row.id}
            onClose={() => setSelectedRow(undefined)}
          >
            <MenuItem onClick={() => handleEditUniversity(params.row)}> Edit </MenuItem>
            <MenuItem onClick={() => handleDeleteUniversity(params.row)}> Delete </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const possibleFilters = useMemo(() => columns.filter((column) => column.sortable).map((col) => col.field), [columns]);

  const handleSortChange = (model: GridSortModel) => {
    setRowsState({
      ...rowsState,
      sortField: model[0]?.field,
      sortOrder: model[0]?.sort,
    });
  };

  const handleMenuClick = (event: any, row: UniversityModel) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleEditUniversity = (row: UniversityModel) => {
    console.log(row);
  };

  const handleDeleteUniversity = (row: UniversityModel) => {
    console.log(row);
  };

  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <TextField
          className={styles.search}
          label="Search universities name"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl>
          <InputLabel id="sort-select-label">Age</InputLabel>
          <Select
            className={styles.select}
            variant={'outlined'}
            labelId="sort-select-label"
            id="demo-simple-select"
            value={rowsState.sortField}
            label="Sort"
            onChange={(event) => {
              handleSortChange([
                {
                  field: event.target.value as string,
                  sort: 'asc',
                },
              ]);
            }}
          >
            {possibleFilters.map((possibleFilter) => (
              <MenuItem key={possibleFilter} value={possibleFilter}>
                {possibleFilter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="sort-select-label">Age</InputLabel>
          <Select
            className={styles.select}
            variant={'outlined'}
            labelId="sort-select-label"
            id="demo-simple-select"
            value={rowsState.sortField}
            label="Sort"
            onChange={(event) => {
              handleSortChange([
                {
                  field: event.target.value as string,
                  sort: 'asc',
                },
              ]);
            }}
          >
            {possibleFilters.map((possibleFilter) => (
              <MenuItem key={possibleFilter} value={possibleFilter}>
                {possibleFilter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <DataGrid
        rows={universities.data}
        sortModel={[
          {
            field: rowsState?.sortField || '',
            sort: rowsState?.sortOrder,
          },
        ]}
        sortingOrder={['asc', 'desc']}
        disableColumnMenu
        onSortModelChange={(model) => handleSortChange(model)}
        rowCount={universities.pagination.total}
        columns={columns}
        pageSize={rowsState.pageSize}
        loading={isUniversitiesLoading}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
        onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        disableSelectionOnClick
        paginationMode={'server'}
      />
    </div>
  );
};

export default MainPage;
