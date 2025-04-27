<script lang="ts">
	/* ---------- data ----------- */
	import { cart }   from '$lib/stores/Cartstores.js';
	import { goto }   from '$app/navigation';

	const PLACEHOLDER = '/images/placeholder.webp';   // falls back if no image

	/* ---------- helpers -------- */
	$: total = $cart.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2);

	function inc(id: number){
		cart.update(c => c.map(i => i.id === id ? {...i, quantity:i.quantity+1} : i));
	}
	function dec(id: number){
		cart.update(c =>
			c.map(i => i.id === id ? {...i, quantity:i.quantity-1} : i).filter(i => i.quantity>0)
		);
	}
	const clear  = () => cart.set([]);
	const payNow = () => goto('/checkout');
</script>

<h1 class="title">Your cart</h1>

{#if $cart.length === 0}
	<p class="empty">Your cart is empty.</p>
{:else}
	<ul class="list">
		{#each $cart as item (item.id)}
			<li class="card">
				<img class="thumb" src={item.image || PLACEHOLDER} alt={item.name} />

				<div class="info">
					<h3>{item.name}</h3>
					<p class="price">${item.price} &times; {item.quantity}</p>
				</div>

				<div class="qty-box">
					<button on:click={() => dec(item.id)} aria-label="decrease">−</button>
					<span>{item.quantity}</span>
					<button on:click={() => inc(item.id)} aria-label="increase">+</button>
				</div>
			</li>
		{/each}
	</ul>

	<div class="summary">
		<span>Subtotal</span>
		<span class="total">${total}</span>
	</div>

	<div class="actions">
		<button class="primary" on:click={payNow}>Proceed to Checkout</button>
		<button class="ghost"   on:click={clear}>Clear Cart</button>
	</div>
{/if}

<style>
/* ---------- typography / layout ---------- */
.title{margin:0 0 1.75rem;font-size:1.9rem;font-weight:600;}
.empty{color:#555;margin-top:1rem;}

.list{
	list-style:none;margin:0 0 2rem;padding:0;
	display:flex;flex-direction:column;gap:1.25rem;
}
.card{
	display:flex;align-items:center;gap:1rem;
	background:#fff8e6;border:1px solid #f4e6bf;border-radius:12px;
	padding:1rem 1.25rem;
	box-shadow:0 2px 6px rgba(0,0,0,.04);
}
.thumb{
	width:72px;height:72px;border-radius:8px;object-fit:cover;
	background:#eee;
}
.info h3{margin:0 0 .25rem;font-size:1.1rem;}
.price{margin:0;color:#444;font-size:.95rem;}

.qty-box{
	display:flex;align-items:center;gap:10px;margin-left:auto;
}
.qty-box button{
	width:34px;height:34px;border:none;border-radius:6px;
	background:#28a745;color:#fff;font-size:1rem;cursor:pointer;
}
.qty-box button:hover{background:#1e7e34}

/* ---------- totals ---------- */
.summary{
	display:flex;justify-content:space-between;
	font-size:1.25rem;font-weight:600;margin-bottom:1.5rem;
}
.total{color:#28a745;}

/* ---------- bottom buttons ---------- */
.actions{display:flex;gap:1rem;flex-wrap:wrap;}
.primary{
	background:#28a745;color:#fff;border:none;border-radius:6px;
	padding:.65rem 1.6rem;font-size:1rem;cursor:pointer;
}
.primary:hover{background:#1e7e34}
.ghost{
	background:none;color:#28a745;border:2px solid #28a745;
	padding:.55rem 1.45rem;border-radius:6px;font-size:1rem;cursor:pointer;
}
.ghost:hover{background:#28a745;color:#fff}
</style>
