<script lang="ts">
  import { page } from '$app/stores';
  import { orders, addOrder } from '$lib/stores/OrdersStore.ts';
  import { derived } from 'svelte/store';

  // grab orderId from query string
  const orderId = derived(page, $p => $p.url.searchParams.get('orderId'));

  // find that order in the store
  const order = derived([orders, orderId], ([$orders, $id]) =>
    $orders.find((o: { id: any; }) => o.id === $id)
  );
</script>

{#if $order}
  <h1>Thank you for your purchase!</h1>
  <h2>Order #{$order.id}</h2>

  <h3>Items</h3>
  <ul>
  {#each $order.items as item}
    <li>{item.name} × {item.quantity} — ${item.price.toFixed(2)}</li>
  {/each}
  </ul>

  <p><strong>Total paid:</strong> ${$order.total.toFixed(2)}</p>
  <p>We sent a confirmation email to {$order.shippingInfo.email}.</p>

  <a href="/orders/history">View your order history →</a>
{:else}
  <p>Order not found.</p>
{/if}