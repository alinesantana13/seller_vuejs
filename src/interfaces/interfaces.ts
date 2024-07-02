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
  id: number;
  buyer_id: number;
  store_id: number;
  state: string;
  payment_status: string;
  created_at: Date;
  total_order_items: string;
  order_items: {
    product_title: string;
    amount: number;
    price: number;
  }[];
}