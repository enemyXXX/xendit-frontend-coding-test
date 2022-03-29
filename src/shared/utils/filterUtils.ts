import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel';

export type QueryParameters = {
  page: number;
  limit: number;
  name: string;
  country: string;
  sort: string;
};

export class FilterUtils {
  static getSortValue = (sortField?: string, sortOrder?: GridSortDirection) =>
    ((sortField && sortOrder) || undefined) && `${sortField},${sortOrder}`;

  static getQueryParams = (params: Partial<QueryParameters>) => {
    const queryParameters: Partial<QueryParameters> = {};
    if (params.page !== undefined) {
      queryParameters.page = params.page;
    }
    if (params.limit !== undefined) {
      queryParameters.limit = params.limit;
    }
    if (params.sort !== undefined) {
      queryParameters.sort = params.sort;
    }
    if (params.name) {
      queryParameters.name = params.name;
    }
    if (params.country) {
      queryParameters.country = params.country;
    }
    return queryParameters;
  };
}
