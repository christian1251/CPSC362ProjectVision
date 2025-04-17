<script lang="ts">
  import { cart } from "$lib/stores/Cartstores.js";
  import type { Product } from "$lib/types.ts";

  // Reactive total
  $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
</script>

<p>This page should add up the total of the listing prices, allow for removal of listings, and have a checkout.</p>

{#each $cart as item (item.id)}
  <p>
    {item.name} — ${item.price} × {item.quantity}  
    = <strong>${(item.price * item.quantity).toFixed(2)}</strong>
  </p>
{/each}

<p><strong>Total:</strong> ${total.toFixed(2)}</p>

<button>Checkout</button>

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