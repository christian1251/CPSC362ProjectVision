<script lang="ts">
  import '../app.css';
  import { orders } from '$lib/stores/OrdersStore.js';
  import { derived } from 'svelte/store';
  import { page } from '$app/stores';

  // grab orderId from query string
  const orderId = derived(page, $p => $p.url.searchParams.get('orderId'));

  // find that order in the store
  const order = derived(
    [orders, orderId],
    ([$orders, $id]) => $orders.find(o => o.id.toString() === $id)
  );
</script>

{#if $order}
  <h1>Thank you for your purchase!</h1>
  <h2>Order #{$order.id}</h2>

  <h3>Items</h3>
  <ul>
    {#each $order.items as item}
      <li>{item.name} × {item.quantity}</li>
    {/each}
  </ul>
{:else}
  <p>Sorry, we couldn’t find that order.</p>
{/if}
