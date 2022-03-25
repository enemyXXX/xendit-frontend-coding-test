import { PaginationModel } from './paginationModel';

export type CountryModel = {
  id: number;
  name: string;
  code: string;
  updatedAt: Date;
  createdAt: Date;
};

export type CountriesList = {
  data: CountryModel[];
  pagination: PaginationModel;
};
