import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../global/store';
import { MainEndpoints } from '../../../global/constants/endpoints';
import { CountriesList } from '../../../shared/models/countryModel';
import { PaginationModel } from '../../../shared/models/paginationModel';
import { initialPaginationModel } from '../../../global/constants/pagination';
import { UniversitiesList } from '../../../shared/models/universityModel';
import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel';

export interface MainState {
  countries: CountriesList;
  isCountriesLoading: boolean;
  isCountriesLoaded: boolean;

  universities: UniversitiesList;
  isUniversitiesLoading: boolean;
  isUniversitiesLoaded: boolean;
}

const initialState: MainState = {
  countries: { data: [], pagination: initialPaginationModel },
  isCountriesLoading: false,
  isCountriesLoaded: false,

  universities: { data: [], pagination: initialPaginationModel },
  isUniversitiesLoading: false,
  isUniversitiesLoaded: false,
};

interface getCountriesData {
  page: number;
  pageSize: number;
}

export const getCountries = createAsyncThunk('main/getCountries', async (props: getCountriesData) => {
  try {
    const { page, pageSize } = props;
    const { data } = await axios.get(
      MainEndpoints.GET_COUNTRIES_ENDPOINT.replace('{page}', String(page)).replace('{limit}', String(pageSize))
    );
    return {
      data: data.data,
      pagination: {
        current_page: data.current_page,
        per_page: data.per_page,
        from: data.from,
        last_page: data.last_page,
        to: data.to,
        total: data.total,
      },
    } as CountriesList;
  } catch (err) {
    console.log(err);
  }
});

interface GetUniversitiesData {
  page: number;
  pageSize: number;
  search: string;
  country: string;
  sortField?: string;
  sortOrder: GridSortDirection;
}

export const getUniversities = createAsyncThunk('main/getUniversities', async (props: GetUniversitiesData) => {
  try {
    const { page, pageSize, sortField, sortOrder, search, country } = props;
    let endpoint = MainEndpoints.GET_UNIVERSITIES_ENDPOINT.replace('{page}', String(page)).replace(
      '{limit}',
      String(pageSize)
    );
    if (sortField) {
      endpoint += `&sort=${sortField},${sortOrder}`;
    }
    if (search) {
      endpoint += `&name=${search}`;
    }
    if (country) {
      endpoint += `&country=${country}`;
    }
    const { data } = await axios.get(endpoint);
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
    console.log(err);
  }
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.isCountriesLoading = true;
        state.isCountriesLoaded = false;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = {
          data: [...state.countries.data, ...(action.payload?.data || [])],
          pagination: action.payload?.pagination || initialPaginationModel,
        };
        state.isCountriesLoading = false;
        state.isCountriesLoaded = true;
      })
      .addCase(getUniversities.pending, (state) => {
        state.isUniversitiesLoading = true;
        state.isUniversitiesLoaded = false;
      })
      .addCase(getUniversities.fulfilled, (state, action) => {
        state.universities = action.payload!;
        state.isUniversitiesLoading = false;
        state.isUniversitiesLoaded = true;
      });
  },
});

export const getIsCountriesLoading = (state: RootState) => state.main.isCountriesLoading;
export const getIsCountriesLoaded = (state: RootState) => state.main.isCountriesLoaded;
export const getCountriesList = (state: RootState) => state.main.countries;

export const getIsUniversitiesLoading = (state: RootState) => state.main.isUniversitiesLoading;
export const getIsUniversitiesLoaded = (state: RootState) => state.main.isUniversitiesLoaded;
export const getUniversitiesList = (state: RootState) => state.main.universities;

export default mainSlice.reducer;
