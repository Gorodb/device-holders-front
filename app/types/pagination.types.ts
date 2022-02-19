export interface IPagination {
  total: number;
  totalPages: number;
  limit: number;
  page: number;
  hasNext: boolean;
}

export interface IPaginateParams {
  limit: number;
  page: number;
}

export interface ISearchPaginate extends IPaginateParams{
  search?: string;
}
