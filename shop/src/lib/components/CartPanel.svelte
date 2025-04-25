<script lang="ts">
  import { cart } from "$lib/stores/Cartstores.js";
  import type { Product } from "$lib/types.ts";

  // Reactive total
  $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  function removeFromCart(id: number) {
    cart.update(c => {
      const index = c.findIndex(item => item.id === id);
      if (index === -1) return c;

      const updated = [...c];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
      } else {
        updated.splice(index, 1); // remove item entirely
      }
      return updated;
  });}

  function incrementItem(id: number) {
    cart.update(c => {
      const updated = [...c];
      const index = updated.findIndex(item => item.id === id);
      if (index !== -1) updated[index].quantity += 1;
      return updated;
    });
  }

  function clearCart() {
    cart.set([]);
  }
</script>

<p>This page should add up the total of the listing prices, allow for removal of listings, and have a checkout.</p>

{#each $cart as item (item.id)}
  <p>
    {item.name} — ${item.price} × {item.quantity}  
    = <strong>${(item.price * item.quantity).toFixed(2)}</strong>
  </p>
  <button on:click={() => removeFromCart(item.id)}>➖ Remove</button>
  <button on:click={() => incrementItem(item.id)}>➕ Add</button>
{/each}

<p><strong>Total:</strong> ${total.toFixed(2)}</p>

<button><a href="/checkout">Checkout</a></button>
<button on:click={clearCart}> Clear Cart</button>

<style>
    button {
      cursor: pointer;
      border: 2px outset black;
      border-color: blue;
      margin: 1rem;
      background-color: cadetblue;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
    }
  </style>