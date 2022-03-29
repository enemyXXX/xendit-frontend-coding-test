import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../global/store';
import { MainEndpoints } from '../../../global/constants/endpoints';
import { CountriesList } from '../../../shared/models/countryModel';
import { PaginationModel } from '../../../shared/models/paginationModel';
import { initialPaginationModel } from '../../../global/constants/pagination';
import { UniversitiesList, UniversityModel } from '../../../shared/models/universityModel';
import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel';
import { toast } from 'react-toastify';
import { removeToastWithDelay } from '../../../shared/utils/toastUtils';
import { FilterUtils } from '../../../shared/utils/filterUtils';

export interface MainState {
  countries: CountriesList;
  isCountriesLoading: boolean;
  isCountriesLoaded: boolean;

  createEditCountries: CountriesList;
  isCreateEditCountriesLoading: boolean;
  isCreateEditCountriesLoaded: boolean;

  universities: UniversitiesList;
  isUniversitiesLoading: boolean;
  isUniversitiesLoaded: boolean;
}

const initialState: MainState = {
  countries: { data: [], pagination: initialPaginationModel },
  isCountriesLoading: false,
  isCountriesLoaded: false,

  createEditCountries: { data: [], pagination: initialPaginationModel },
  isCreateEditCountriesLoading: false,
  isCreateEditCountriesLoaded: false,

  universities: { data: [], pagination: initialPaginationModel },
  isUniversitiesLoading: false,
  isUniversitiesLoaded: false,
};

interface getCountriesData {
  page: number;
  limit: number;
  editMode?: boolean;
}

export const getCountriesAsync = createAsyncThunk('main/getCountries', async (props: getCountriesData) => {
  try {
    const { page, limit, editMode } = props;
    const { data } = await axios.get(MainEndpoints.GET_COUNTRIES_ENDPOINT, {
      params: FilterUtils.getQueryParams({
        page,
        limit,
      }),
    });
    return {
      editMode,
      data: data.data,
      pagination: {
        current_page: data.current_page,
        per_page: data.per_page,
        from: data.from,
        last_page: data.last_page,
        to: data.to,
        total: data.total,
      },
    };
  } catch (err) {
    toast(`Something wrong during countries loading`, {
      type: 'error',
      theme: 'colored',
    });
  }
});

interface GetUniversitiesData {
  page: number;
  limit: number;
  name: string;
  country: string;
  sortField?: string;
  sortOrder: GridSortDirection;
}

export const getUniversitiesAsync = createAsyncThunk('main/getUniversities', async (props: GetUniversitiesData) => {
  try {
    const { page, limit, sortField, sortOrder, name, country } = props;
    const { data } = await axios.get(MainEndpoints.UNIVERSITY_ENDPOINT, {
      params: FilterUtils.getQueryParams({
        page,
        limit,
        sort: FilterUtils.getSortValue(sortField, sortOrder),
        name,
        country,
      }),
    });
    return {
      data: data.data,
      pagination: {
        current_page: data.current_page,
        per_page: data.per_page,
        from: data.from,
        last_page: data.last_page,
        to: data.to,
        total: data.total,
      } as PaginationModel,
    } as UniversitiesList;
  } catch (err) {
    toast(`Something wrong during universities loading`, {
      type: 'error',
      theme: 'colored',
    });
  }
});

interface SaveUniversityData {
  university: UniversityModel;
  callback: (success: boolean) => void;
}

export const saveUniversityAsync = createAsyncThunk('main/saveUniversity', async (props: SaveUniversityData) => {
  const { university, callback } = props;
  const toastId = `university-${university.id}`;
  try {
    toast(university.id ? 'Update University...' : 'University Creating...', {
      type: 'info',
      isLoading: true,
      toastId: toastId,
      autoClose: false,
    });
    if (university.id) {
      await axios.put(`${MainEndpoints.UNIVERSITY_ENDPOINT}/${String(university.id)}`, university);
    } else {
      await axios.post(MainEndpoints.UNIVERSITY_ENDPOINT, university);
    }
    removeToastWithDelay(toastId);
    toast(`University has been successfully ${university.id ? 'Updated' : 'Created'}!`, {
      type: 'success',
    });
    callback(true);
  } catch (err) {
    removeToastWithDelay(toastId);
    toast(`Something wrong during university ${university.id ? 'update' : 'create'}`, {
      type: 'error',
      theme: 'colored',
    });
    callback(false);
  }
});

interface DeleteUniversityData {
  id: number;
  callback: (success: boolean) => void;
}

export const deleteUniversityAsync = createAsyncThunk('main/deleteUniversity', async (props: DeleteUniversityData) => {
  const { id, callback } = props;
  const toastId = `university-${id}`;
  try {
    toast('University deleting...', {
      type: 'info',
      isLoading: true,
      toastId: toastId,
      autoClose: false,
    });
    await axios.delete(`${MainEndpoints.UNIVERSITY_ENDPOINT}/${String(id)}`);
    removeToastWithDelay(toastId);
    toast(`University has been successfully deleted!`, {
      type: 'success',
    });
    callback(true);
  } catch (err) {
    removeToastWithDelay(toastId);
    toast(`Something wrong during university deleting`, {
      type: 'error',
      theme: 'colored',
    });
    callback(false);
  }
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesAsync.pending, (state) => {
        state.isCountriesLoading = true;
        state.isCountriesLoaded = false;
      })
      .addCase(getCountriesAsync.fulfilled, (state, action) => {
        const editMode = !!action.payload?.editMode;
        const countries = {
          data: [
            ...(editMode ? state.createEditCountries.data : state.countries.data),
            ...(action.payload?.data || []),
          ],
          pagination: action.payload?.pagination || initialPaginationModel,
        };
        if (!editMode) {
          state.countries = countries;
          state.isCountriesLoading = false;
          state.isCountriesLoaded = true;
        } else {
          state.createEditCountries = countries;
          state.isCreateEditCountriesLoading = false;
          state.isCreateEditCountriesLoaded = true;
        }
      })
      .addCase(getUniversitiesAsync.pending, (state) => {
        state.isUniversitiesLoading = true;
        state.isUniversitiesLoaded = false;
      })
      .addCase(getUniversitiesAsync.fulfilled, (state, action) => {
        state.universities = action.payload!;
        state.isUniversitiesLoading = false;
        state.isUniversitiesLoaded = true;
      });
  },
});

export const getIsCountriesLoading = (state: RootState) => state.main.isCountriesLoading;
export const getIsCountriesLoaded = (state: RootState) => state.main.isCountriesLoaded;
export const getCountriesList = (state: RootState) => state.main.countries;

export const getIsCreateEditCountriesLoading = (state: RootState) => state.main.isCreateEditCountriesLoading;
export const getIsCreateEditCountriesLoaded = (state: RootState) => state.main.isCreateEditCountriesLoaded;
export const getCreateEditCountries = (state: RootState) => state.main.createEditCountries;

export const getIsUniversitiesLoading = (state: RootState) => state.main.isUniversitiesLoading;
export const getIsUniversitiesLoaded = (state: RootState) => state.main.isUniversitiesLoaded;
export const getUniversitiesList = (state: RootState) => state.main.universities;

export default mainSlice.reducer;
