import { IRepositoryOption } from 'src/app/models/repository.interface';

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
  action: EProductAction;
  actionLabel: string;
  product?: IProduct;
}

export enum EProductAction {
  view_detail,
  create,
  update,
  delete
}

export interface IProductCardAction {
  label: string;
  value: EProductAction;
}

export interface IProductRepositoryOption
  extends IRepositoryOption,
    IProductBase {}
