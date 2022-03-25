import React, { useEffect, useMemo, useState } from 'react';
import styles from './MainPage.module.css';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import {
  deleteUniversityAsync,
  getCountriesAsync,
  getCountriesList,
  getIsUniversitiesLoading,
  getUniversitiesAsync,
  getUniversitiesList,
  saveUniversityAsync,
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
import { CountriesList } from '../../shared/models/countryModel';
import ButtonItem from '../../shared/components/button/Button';
import CustomModal, { ModalActions } from '../../shared/components/modal/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UniversityDetailsInformation from './forms/details/UniversityDetailsInformation';
import UniversityCreateEditForm from './forms/createEdit/UniversityCreateEditForm';
import PageHeader from '../../shared/page/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import { initialUniversityValue } from './forms/createEdit/university-values';
import LazyLoadingSelect from '../../shared/components/select/LazyLoadingSelect';

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

  const updateTableData = (rowsState: RowsState) => {
    dispatch(getUniversitiesAsync(rowsState));
  };

  useEffect(() => {
    updateTableData(rowsState);
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
        getCountriesAsync({
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
      dispatch(
        deleteUniversityAsync({
          id: selectedRow.id,
          callback: (success: boolean) => {
            updateTableData(rowsState);
            success && setUniversityDeleteModalOpened(false);
          },
        })
      );
    }
  };

  const handleSaveUpdatedUniversity = (university: UniversityModel, callback: (success: boolean) => void) => {
    dispatch(
      saveUniversityAsync({
        university,
        callback: (success: boolean) => {
          callback(success);
          updateTableData(rowsState);
        },
      })
    );
  };

  const handleAddNewUniversity = () => {
    setUniversityCreateEditModalOpened(true);
    setSelectedRow(initialUniversityValue);
  };

  return (
    <>
      <div className={styles.root}>
        <PageHeader
          title={'Universities'}
          actions={
            <ButtonItem size={'large'} handleClick={handleAddNewUniversity} icon={<AddIcon />}>
              Add
            </ButtonItem>
          }
        />
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
          <LazyLoadingSelect
            label={'Country'}
            name={'country'}
            value={rowsState.country}
            handleLazyLoading={handleCountriesLoading}
            pagination={countries.pagination}
            handleValueSelection={handleCountrySelection}
            items={countries.data}
            fieldLabel={'name'}
            fieldValue={'name'}
          />
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
          className={styles.dataTable}
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
          onPageChange={(page) => setRowsState((prev) => ({ ...prev, page: page + 1 }))}
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
                size={'small'}
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
            <UniversityCreateEditForm
              handleSave={handleSaveUpdatedUniversity}
              handleClose={() => setUniversityCreateEditModalOpened(false)}
              university={selectedRow}
            />
          }
          handleClose={() => setUniversityCreateEditModalOpened(false)}
        />
      )}
    </>
  );
};

export default MainPage;
