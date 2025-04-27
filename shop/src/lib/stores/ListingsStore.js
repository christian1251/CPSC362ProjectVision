import { writable } from 'svelte/store';

export const listings = writable([
  {
    id: 1,
    name: 'Bomber Jacket',
    price: 65,
    size: 'M',
    color: 'Orange',
    category: 'jackets',
    image: '/images/jackets/jacket-1.webp'
  },
  {
    id: 2,
    name: 'Rain Jacket',
    price: 80,
    size: 'L',
    color: 'Black',
    category: 'jackets',
    image: '/images/jackets/jacket-2.webp'
  },
  {
    id: 3,
    name: 'Button Up Shirt',
    price: 25,
    size: 'S',
    color: 'White',
    category: 'shirts',
    image: '/images/shirts/shirt-1.webp'
  },
  {
    id: 4,
    name: 'Plain White Tee',
    price: 20,
    size: 'M',
    color: 'Gray',
    category: 'shirts',
    image: '/images/shirts/shirt-2.webp'
  },
  {
    id: 5,
    name: 'Slim Fit Jeans',
    price: 45,
    size: 'M',
    color: 'Khaki',
    category: 'pants',
    image: '/images/pants/pants-1.webp'
  },
  {
    id: 6,
    name: 'Denim Jeans',
    price: 50,
    size: 'L',
    color: 'Dark Blue',
    category: 'pants',
    image: '/images/pants/pants-2.webp'
  },
  {
    id: 7,
    name: 'Cable Knit Sweater',
    price: 60,
    size: 'S',
    color: 'Cream',
    category: 'sweaters',
    image: '/images/sweaters/sweater-1.webp'
  },
  {
    id: 8,
    name: 'Fleece Pullover',
    price: 55,
    size: 'M',
    color: 'Olive',
    category: 'sweaters',
    image: '/images/sweaters/sweater-2.webp'
  }
  
]);
