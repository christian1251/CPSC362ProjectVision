<script lang="ts">
	/* ------------ imports already in your version ------------- */
	import '../app.css';
	import { user }     from '$lib/stores/auth.js';
	import { auth }     from '$lib/firebase.js';
	import { signOut }  from 'firebase/auth';
	import { cart }     from '$lib/stores/Cartstores.js';
	import { onMount }  from 'svelte';

	let menuOpen = false;
	let dropdownEl: HTMLDivElement;

	function toggleMenu()  {	menuOpen = !menuOpen; }
	function handleLogout() { signOut(auth); menuOpen = false; }

	const onClickOutside = (e:MouseEvent) => {
		if (menuOpen && dropdownEl && !dropdownEl.contains(e.target as Node)) {
			menuOpen = false;
		}
	};
	onMount(() => {
		document.addEventListener('click', onClickOutside);
		return () => document.removeEventListener('click', onClickOutside);
	});

	/* cart badge */
	$: cartCount = $cart.reduce((t,i)=>t+i.quantity, 0);
</script>

<header class="navbar">
	<div class="left-nav">
		<a class="brand" href="/">
			<!-- put logo.png / logo.webp in  static/images/ -->
			<img class="logo" src="/images/logo.png" alt="StyleSpot logo" />
		</a>

		<nav class="main-nav">
			<a href="/">Home</a>
			<a href="/admin">Admin</a>
			<a href="/category/jackets">Jackets</a>
			<a href="/category/shirts">Shirts</a>
			<a href="/category/pants">Pants</a>
			<a href="/category/sweaters">Sweaters</a>
		</nav>
	</div>

	<div class="icon-nav">
		<div class="dropdown" bind:this={dropdownEl}>
			<button class="icon-link" aria-label="Account" on:click={toggleMenu}>
				<i class="fa-solid fa-user"></i>
			</button>
			{#if menuOpen}
				<ul class="dropdown-menu">
					{#if $user}
						<li><button on:click={handleLogout}>Logout</button></li>
					{:else}
						<li><a href="/login">Login</a></li>
						<li><a href="/signup">Sign up</a></li>
					{/if}
				</ul>
			{/if}
		</div>

		<div class="cart-wrapper">
			<a class="icon-link" aria-label="Cart" href="/cart">
				<i class="fa-solid fa-shopping-cart"></i>
				{#if cartCount > 0}
					<span class="cart-badge">{cartCount}</span>
				{/if}
			</a>
		</div>
	</div>
</header>

<main class="container">
	<slot/>
</main>

<style>
/* ------------ NAVBAR / GENERAL rules (unchanged) ------------- */
/* keep your existing navbar / dropdown / container styles here  */

/* ---------- only the logo & badge tweaks are new ------------- */
.logo{
	height:100px;          /* adjust if you want it bigger/smaller   */
	width:auto;
	object-fit:contain;
	/* turn dark logo white so it pops on the green bar            */
	filter:brightness(0) invert(1);
}

/* cart badge */
.cart-wrapper{position:relative;}
.cart-badge{
	position:absolute;top:-6px;right:-6px;
	background:mediumseagreen;color:#fff;
	border-radius:9999px;padding:2px 6px;
	font-size:.7rem;font-weight:bold;
}
</style>
