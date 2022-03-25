import { PaginationModel } from './paginationModel';

export type UniversityModel = {
  alpha_two_code: string;
  country: string;
  created_at: Date;
  domains: string[];
  id: number;
  name: string;
  state_province?: string;
  updated_at: Date;
  web_pages: string[];
};

export type UniversitiesList = {
  data: UniversityModel[];
  pagination: PaginationModel;
};
