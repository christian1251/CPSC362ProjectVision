<script lang="ts">
	import '../app.css';
	import { user } from '../lib/stores/auth.js';
	import { auth } from '../lib/firebase.js';
	import { signOut } from 'firebase/auth';
  
	function handleLogout() {
	  signOut(auth);
	}
  </script>
  
  <header class="navbar">
	<div class="brand">shopppp</div>
	<nav class="nav-links">
	  <a href="/">Home</a>
	  <a href="/cart">Cart</a>
	  <a href="/admin">Admin</a>
	  {#if $user}
		<button on:click={handleLogout}>Logout</button>
	  {:else}
		<a href="/login">Login</a>
		<a href="/signup">Sign up</a>
	  {/if}
	</nav>
  </header>
  
  <main class="container">
	<slot />
  </main>
  