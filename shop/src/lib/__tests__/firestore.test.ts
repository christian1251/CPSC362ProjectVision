// src/lib/__tests__/firestore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { FakeFirestore } from './__mocks__/fakefirestore.ts';

describe('Fake Firestore', () => {
  let firestore: FakeFirestore;

  beforeEach(() => {
    firestore = new FakeFirestore();
  });

  it('should save an order successfully', async () => {
    const orderId = 'order123';
    const orderData = {
      userId: 'user123',
      items: [
        { name: 'shirt', price: 5, quantity: 2 },
        { name: 'pants', price: 3, quantity: 1 },
      ],
      total: 13,
    };

    const ordersCollection = firestore.collection('orders');
    const orderDoc = ordersCollection.doc(orderId);
    await orderDoc.set(orderData);

    const savedOrder = await ordersCollection.doc(orderId).get();

    expect(savedOrder.exists).toBe(true);
    expect(savedOrder.data()).toEqual(orderData);
  });

  it('should return non-existent order correctly', async () => {
    const ordersCollection = firestore.collection('orders');
    const nonExistent = await ordersCollection.doc('missingOrder').get();

    expect(nonExistent.exists).toBe(false);
  });

});
