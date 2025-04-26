<script lang="ts">
    import { orders, addOrder } from '$lib/stores/OrdersStore';
  </script>
  
  <h1>Your Orders</h1>
  
  {#each $orders as o}
    <details>
      <summary>Order #{o.id} – ${o.total.toFixed(2)} – {o.placedAt.toLocaleDateString()}</summary>
      <ul>
        {#each o.items as it}
          <li>{it.name} × {it.quantity}</li>
        {/each}
      </ul>
    </details>
  {/each}
  
  {#if !$orders.length}
    <p>No orders yet.</p>
  {/if}
  