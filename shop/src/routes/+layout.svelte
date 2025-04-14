<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<h1>Brandname</h1>

<nav>
	<a class="link" href="/">Home</a>
	<a class="link" href="/cart"> Cart</a>
</nav>

<style>
	.link {
		color: forestgreen;
		text-decoration-line: underline;
  		text-decoration-color: hotpink;
	}
</style>

{@render children()}
