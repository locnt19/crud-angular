export interface IRepository<T> {
  data: T[];
  total: number;
}

export interface IRepositoryOptions {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
}
