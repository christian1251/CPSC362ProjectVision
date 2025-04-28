import { describe, it, expect, beforeEach } from 'vitest';
import { orders, addOrder, type Order } from '../stores/OrdersStore.js';

describe('Orders Store', () => {

  beforeEach(() => {
    orders.set([]); 
  });

  it('should start with an empty list', () => {
    orders.subscribe(list => {
      expect(list.length).toBe(0);
    })();
  });

  it('should add a single order', () => {
    const order: Order = {
      id: 'order1',
      items: [
        { id: 1, name: 'shirt', price: 5, size: 'M', color: 'Black', quantity: 2 }
      ],
      subtotal: 10,
      shipping: 5,
      tax: 1.5,
      total: 16.5,
      placedAt: new Date(),
      shippingInfo: { name: 'John Doe', address: '123 Street' }
    };

    addOrder(order);

    orders.subscribe(list => {
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('order1');
      expect(list[0].items.length).toBe(1);
      expect(list[0].total).toBe(16.5);
    })();
  });

  it('should add multiple orders', () => {
    const order1: Order = {
      id: 'order1',
      items: [{ id: 1, name: 'shirt', price: 5, size: 'M', color: 'Black', quantity: 2 }],
      subtotal: 10,
      shipping: 5,
      tax: 1.5,
      total: 16.5,
      placedAt: new Date(),
      shippingInfo: { name: 'John Doe', address: '123 Street' }
    };

    const order2: Order = {
      id: 'order2',
      items: [{ id: 2, name: 'pants', price: 3, size: 'L', color: 'Green', quantity: 1 }],
      subtotal: 3,
      shipping: 4,
      tax: 0.7,
      total: 7.7,
      placedAt: new Date(),
      shippingInfo: { name: 'Jane Smith', address: '456 Avenue' }
    };

    addOrder(order1);
    addOrder(order2);

    orders.subscribe(list => {
      expect(list.length).toBe(2);
      expect(list[1].id).toBe('order2');
    })();
  });

});
