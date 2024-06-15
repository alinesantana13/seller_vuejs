export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IStore {
  id: number;
  name: string;
  image_url: string;
}

export interface IProduct {
  id: number;
  store_id: number;
  title: string;
  price: number;
  image_url: string;
}

export interface IPagination {
  current: number,
  per_page: number,
  pages: number,
  count: number,
  previous: number,
  next: number
}

export interface IOrder {
  orderId: number;
  userId: number;
  productIds: number[];
  orderDate: Date;
}