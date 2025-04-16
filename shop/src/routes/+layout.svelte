<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>



<div class="top-bar">
	<h1 class = "brand">shopppp</h1>
	<nav>
	
	<a class="link" href="/">Home</a>
	<a class="link" href="/cart"> Cart</a>
	<a class="link" href="/admin"> Admin</a>
	</nav>
</div>

<style>
	.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #133A3A;
	color: #E4E9DD;
	padding: 0.75rem 2rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 10;
}

.brand {
	font-family: fantasy;
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	margin: 0;
}

nav {
	display: flex;
	gap: 1.5rem;
}

.link {
	font-family: fantasy;
	color: white;
	text-decoration: none;
	font-weight: 500;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	transition: background-color 0.2s ease;
}

.link:hover {
	background-color: rgba(255, 255, 255, 0.1);
	text-decoration: underline;
}
</style>

{@render children()}
