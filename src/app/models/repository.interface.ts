export interface IRepository<T> {
  data: T[];
  total: number;
}

export interface IRepositoryOption {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
  q?: string;
}
