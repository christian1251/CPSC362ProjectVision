import { describe, it, expect, beforeEach } from 'vitest';
import { listings } from '../stores/ListingsStore.js';

describe('Admin Listings Logic', () => {
  beforeEach(() => {
    listings.set([ // Reset fake listings
      {
        id: 1,
        name: 'Test Jacket',
        price: 99,
        size: 'M',
        color: 'Blue',
        category: 'jackets',
        image: '/images/jackets/test-jacket.webp'
      }
    ]);
  });

  it('should add a new listing', () => {
    listings.update(arr => [
      ...arr,
      {
        id: 2,
        name: 'New Shirt',
        price: 29,
        size: 'L',
        color: 'White',
        category: 'shirts',
        image: '/images/shirts/new-shirt.webp'
      }
    ]);

    listings.subscribe(items => {
      expect(items.length).toBe(2);
      expect(items.find(item => item.name === 'New Shirt')).toBeDefined();
    })();
  });

  it('should edit an existing listing', () => {
    listings.update(arr =>
      arr.map(i =>
        i.id === 1 ? { ...i, price: 79, color: 'Red' } : i
      )
    );

    listings.subscribe(items => {
      const edited = items.find(i => i.id === 1);
      expect(edited?.price).toBe(79);
      expect(edited?.color).toBe('Red');
    })();
  });

  it('should remove a listing', () => {
    listings.update(arr => arr.filter(i => i.id !== 1));

    listings.subscribe(items => {
      expect(items.length).toBe(0);
    })();
  });
});
