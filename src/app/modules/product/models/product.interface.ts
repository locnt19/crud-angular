export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
  status: IProductStatus;
  createdAt: string;
}

export type IProductStatus = 'AVAILABLE' | 'DELETED';
