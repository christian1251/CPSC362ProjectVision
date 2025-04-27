import { writable } from 'svelte/store';

export const listings = writable([
  {
    id: 1,
    name: 'Denim Jacket',
    price: 65,
    size: 'M',
    color: 'Blue',
    category: 'jackets',
    image: '/images/jackets/jacket-1.webp'
  },
  {
    id: 2,
    name: 'Varsity Jacket',
    price: 80,
    size: 'L',
    color: 'Black',
    category: 'jackets',
    image: '/images/jackets/jacket-2.webp'
  },
  {
    id: 3,
    name: 'Graphic Tee',
    price: 25,
    size: 'S',
    color: 'White',
    category: 'shirts',
    image: '/images/shirts/shirt-1.webp'
  },
  {
    id: 4,
    name: 'Plain Tee',
    price: 20,
    size: 'M',
    color: 'Gray',
    category: 'shirts',
    image: '/images/shirts/shirt-2.webp'
  },
  /* …pants, sweaters… */
]);
