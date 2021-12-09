import { IRepositoryOptions } from 'src/app/models/repository.interface';

interface IProductBase {
  id?: number;
  name?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  quantity?: number;
  status?: TProductStatus;
  createdAt?: string;
}

export interface IProduct extends IProductBase {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
  status: TProductStatus;
  createdAt: string;
}

export type TProductStatus = 'AVAILABLE' | 'DELETED';

export interface IProductDialog {
  title: string;
  action: EProductActions;
  actionLabel: string;
}

export enum EProductActions {
  create,
  update,
  delete
}

export enum ECardCTA {
  view_detail,
  update,
  delete
}

export interface IProductCTA {
  label: string;
  value: ECardCTA;
}

export interface IProductRepositoryOptions
  extends IRepositoryOptions,
    IProductBase {}
