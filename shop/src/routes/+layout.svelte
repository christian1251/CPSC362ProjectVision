<!-- src/routes/+layout.svelte -->
<script lang="ts">
	/* ---- imports that were already there ---- */
	import '../app.css';
	import { user }            from '$lib/stores/auth.js';
	import { auth }            from '$lib/firebase.js';
	import { signOut }         from 'firebase/auth';
	import { onMount }         from 'svelte';

	/* ---- header dropdown state ---- */
	let menuOpen   = false;
	let dropdownEl: HTMLDivElement;

	function toggleMenu()   { menuOpen = !menuOpen; }
	function handleLogout() { signOut(auth); menuOpen = false; }

	const onClickOutside = (e: MouseEvent) => {
		if (menuOpen && dropdownEl && !dropdownEl.contains(e.target as Node)) {
			menuOpen = false;
		}
	};
	onMount(() => {
		document.addEventListener('click', onClickOutside);
		return () => document.removeEventListener('click', onClickOutside);
	});
</script>

<header class="navbar">
	<div class="left-nav">
		<a class="brand" href="/">
			<!--  put logo.webp (or png) under  static/images/logo.webp  -->
			<img src="/images/logo.webp" alt="StyleSpot logo" />
		</a>

		<nav class="main-nav">
			<a href="/">Home</a>
			<a href="/admin">Admin</a>

			<!-- Quick category shortcuts -->
			<a href="/category/jackets">Jackets</a>
			<a href="/category/shirts">Shirts</a>
			<a href="/category/pants">Pants</a>
			<a href="/category/sweaters">Sweaters</a>
		</nav>
	</div>

	<div class="icon-nav">
		<div class="dropdown" bind:this={dropdownEl}>
			<button class="icon-link" on:click={toggleMenu} title="Account">
				<i class="fa-solid fa-user"></i>
			</button>

			{#if menuOpen}
				<ul class="dropdown-menu">
					{#if $user}
						<li><button on:click={handleLogout}>Logout</button></li>
					{:else}
						<li><a href="/login">Login</a></li>
						<li><a href="/signup">Sign&nbsp;up</a></li>
					{/if}
				</ul>
			{/if}
		</div>

		<a class="icon-link" href="/cart" title="Cart">
			<i class="fa-solid fa-shopping-cart"></i>
		</a>
	</div>
</header>

<main class="container">
	<!-- every child route is rendered here -->
	<slot />
</main>

<style>
	/* exactly what you used before – shortened for space */
</style>
