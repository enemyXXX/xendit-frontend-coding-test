import React, { useEffect, useMemo, useState } from 'react';
import styles from './MainPage.module.css';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import {
  getCountries,
  getCountriesList,
  getIsCountriesLoading,
  getIsUniversitiesLoading,
  getUniversities,
  getUniversitiesList,
} from './services/mainSlice';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { universityTableColumns } from '../../shared/tableColumns/universityTableColumns';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { PER_PAGE } from '../../global/constants/pagination';
import { RowsState } from '../../shared/enums/table';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import { MoreVert, Search } from '@mui/icons-material';
import { UniversitiesList, UniversityModel } from '../../shared/models/universityModel';
import { Select } from '@material-ui/core';
import { CountriesList, CountryModel } from '../../shared/models/countryModel';
import ButtonItem from '../../shared/components/button/Button';
import CustomModal, { ModalActions } from '../../shared/components/modal/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UniversityDetailsInformation from './forms/details/UniversityDetailsInformation';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const universities: UniversitiesList = useAppSelector(getUniversitiesList);
  const countries: CountriesList = useAppSelector(getCountriesList);
  const isUniversitiesLoading: boolean = useAppSelector(getIsUniversitiesLoading);
  const [selectedRow, setSelectedRow] = useState<UniversityModel>();
  const [search, setSearch] = useState<string>('');
  const [universityDetailsModalOpened, setUniversityDetailsModalOpened] = useState<boolean>(false);
  const [universityCreateEditModalOpened, setUniversityCreateEditModalOpened] = useState<boolean>(false);
  const [universityDeleteModalOpened, setUniversityDeleteModalOpened] = useState<boolean>(false);
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
          <IconButton aria-label="more" onClick={() => handleMenuClick(params.row)}>
            <MoreVert />
          </IconButton>
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

  const handleCountrySelection = (country: string) => {
    setRowsState({
      ...rowsState,
      country: country,
    });
  };

  const handleCountriesLoading = (page: number) => {
    if (page > countries.pagination.current_page) {
      dispatch(
        getCountries({
          page,
          pageSize: PER_PAGE,
        })
      );
    }
  };

  const handleMenuClick = (row: UniversityModel) => {
    setSelectedRow(row);
    setUniversityDetailsModalOpened(true);
  };

  const handleDeleteUniversity = () => {
    if (selectedRow) {
      console.log('delete');
    }
  };

  const handleSaveUpdatedUniversity = (university: UniversityModel) => {
    if (university.id) {
      console.log('update');
    } else {
      console.log('save');
    }
  };

  return (
    <>
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
            {!rowsState.country && <InputLabel id="country-select-label">Country</InputLabel>}
            <Select
              className={styles.select}
              MenuProps={{
                PaperProps: {
                  style: {
                    width: 250,
                  },
                },
              }}
              variant={'outlined'}
              labelId="country-select-label"
              id="country-select"
              value={rowsState.country}
              onOpen={() => handleCountriesLoading(1)}
              onChange={(event) => {
                handleCountrySelection(event.target.value as string);
              }}
            >
              <MenuItem value="">None</MenuItem>
              {countries.data.map((country: CountryModel) => (
                <MenuItem key={country.id} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
              <ButtonItem
                handleClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleCountriesLoading(countries.pagination.current_page + 1);
                }}
                fullWidth
                stylesWrapper={styles.loadMoreBtn}
                variant={'contained'}
                size={'medium'}
                disabled={countries.pagination.current_page === countries.pagination.last_page}
              >
                Load more
              </ButtonItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="sort-select-label">Sort</InputLabel>
            <Select
              className={styles.select}
              variant={'outlined'}
              labelId="sort-select-label"
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
      {universityDetailsModalOpened && selectedRow && (
        <CustomModal
          title="Detail information"
          revert
          content={<UniversityDetailsInformation university={selectedRow} />}
          actions={
            <ModalActions>
              <ButtonItem
                handleClick={() => {
                  setUniversityDetailsModalOpened(false);
                  setUniversityCreateEditModalOpened(true);
                }}
                icon={<EditIcon />}
                variant={'text'}
                size={'small'}
                color={'primary'}
              >
                Edit
              </ButtonItem>
              <ButtonItem
                handleClick={() => {
                  setUniversityDetailsModalOpened(false);
                  setUniversityDeleteModalOpened(true);
                }}
                icon={<DeleteIcon />}
                variant={'text'}
                size={'small'}
                color={'error'}
              >
                Delete
              </ButtonItem>
            </ModalActions>
          }
          handleClose={() => setUniversityDetailsModalOpened(false)}
        />
      )}
      {universityDeleteModalOpened && (
        <CustomModal
          title="Delete University"
          content={
            <Typography>
              Do you really want to delete the <strong>{selectedRow?.name}</strong>? You have no chance to rollback your
              changes
            </Typography>
          }
          actions={
            <ModalActions>
              <ButtonItem
                handleClick={handleDeleteUniversity}
                icon={<DeleteIcon />}
                variant={'text'}
                size={'medium'}
                color={'error'}
              >
                Delete
              </ButtonItem>
            </ModalActions>
          }
          handleClose={() => setUniversityDeleteModalOpened(false)}
        />
      )}
      {universityCreateEditModalOpened && selectedRow && (
        <CustomModal
          title={selectedRow.id ? 'Edit' : 'Create'}
          content={
            <Typography>
              Do you really want to delete the <strong>{selectedRow?.name}</strong>? You have no chance to rollback your
              changes
            </Typography>
          }
          actions={
            <ModalActions>
              <ButtonItem
                handleClick={handleDeleteUniversity}
                icon={<DeleteIcon />}
                variant={'text'}
                size={'medium'}
                color={'error'}
              >
                Delete
              </ButtonItem>
            </ModalActions>
          }
          handleClose={() => setUniversityCreateEditModalOpened(false)}
        />
      )}
    </>
  );
};

export default MainPage;
