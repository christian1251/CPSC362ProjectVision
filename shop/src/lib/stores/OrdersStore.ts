import { writable } from 'svelte/store';

export type Order = {
  id: string;            // UUID or timestamp string
  items: {
    id: number;
    name: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  placedAt: Date;
  shippingInfo: Record<string, string>;  // could use ShippingInfo type
};

export const orders = writable<Order[]>([]);

export const addOrder = (order: Order) =>
  orders.update(list => [...list, order]);
