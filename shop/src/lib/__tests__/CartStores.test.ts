import { describe, it, expect } from 'vitest';
import { cart, addToCart, clearCart, removeFromCart } from '../stores/Cartstores.js'; 
describe('Cart Store', () => {
  it('should add an item to the cart', () => {
    clearCart(); // Clear cart before testing
    
    addToCart({ id: 1 , name: 'shirt', price: 5, quantity: 1, size: "M", color: "red"});
    
    cart.subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].name).toBe('shirt');
      expect(items[0].price).toBe(5);
      expect(items[0].quantity).toBe(1);
      expect(items[0].size).toBe('M');
      expect(items[0].color).toBe('red');
    })();
  });
});



it('should remove an item from the cart', () => {
  clearCart(); // start fresh

  addToCart({ id: 2, name: 'pants', price: 3, size: 'Small', color: 'Green', quantity: 1 });
  removeFromCart(2);

  cart.subscribe(items => {
    expect(items.length).toBe(0);
  })();
});

it('should clear the cart', () => {
  clearCart(); // start fresh

  addToCart({ id: 3, name: 'jacket', price: 6, size: 'Large', color: 'Brown', quantity: 1 });
  addToCart({ id: 4, name: 'sweater', price: 7, size: 'Medium', color: 'Dark Brown', quantity: 1 });

  clearCart();

  cart.subscribe(items => {
    expect(items.length).toBe(0);
  })();
});

it('should increase quantity if adding duplicate item', () => {
  clearCart(); // start fresh

  addToCart({ id: 5, name: 'shirt', price: 4, size: 'Small', color: 'Black', quantity: 1 });
  addToCart({ id: 5, name: 'shirt', price: 4, size: 'Small', color: 'Black', quantity: 2 });

  cart.subscribe(items => {
    expect(items.length).toBe(1); // Still only 1 item (not 2 separate shirt)
    expect(items[0].quantity).toBe(3); // 1 + 2 = 3
  })();
});

it('should not crash when removing a non-existent item', () => {
  clearCart(); 
  addToCart({ id: 1, name: 'shirt', price: 5, size: 'Medium', color: 'Black', quantity: 1 });

  removeFromCart(999); // ID 999 does not exist

  cart.subscribe(items => {
    expect(items.length).toBe(1); 
  })();
});
