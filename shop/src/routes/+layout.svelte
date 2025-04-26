<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header class="top-bar">
	<h1 class="brand"><a href="/">shopppp</a></h1>
	<nav>
		<a class="link" href="/"> Home</a>
		<a class="link" href="/cart"> Cart</a>
		<a class="link" href="/admin"> Admin</a>
		<a class="link" href="/login"> Login</a>
		<a class="link" href="/signup"> Sign up</a>
	</nav>
</header>

{@render children()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap');

	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background-color: #f0f4f8;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #133A3A;
		color: #E4E9DD;
		padding: 1rem 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.brand {
		font-family: 'Inter', sans-serif;
		font-size: 1.75rem;
		font-weight: 700;
		color: #E4E9DD;
		margin: 0;
	}

	nav {
		display: flex;
		gap: 1.25rem;
	}

	.link {
		color: #E4E9DD;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		transition: all 0.2s ease-in-out;
		position: relative;
	}

	.link::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background: #E4E9DD;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.25s ease-out;
	}

	.link:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.link:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>