<script lang="ts">
	import { auth } from '$lib/firebase.js';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let errorMsg = '';

	async function login() {
		errorMsg = '';
		loading  = true;

		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			alert(`Welcome back, ${res.user.email}!`);
			goto('/');               // ✔️ redirect to home (adjust if you prefer)
		} catch (err) {
			if (err instanceof Error) errorMsg = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<section class="wrapper">
	<div class="card">
		<h1>Log in to StyleSpot</h1>

		<form on:submit|preventDefault={login}>
			<input  bind:value={email}     placeholder="Email"    type="email"    required />
			<input  bind:value={password}  placeholder="Password" type="password" required minlength="6" />
			<button disabled={loading}>
				{loading ? 'Logging in…' : 'Log In'}
			</button>
		</form>

		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}

		<p class="alt">
			No account? <a href="/signup">Create one</a>
		</p>
	</div>
</section>

<style>
/* generic centre-on-screen wrapper */
.wrapper{
	min-height:calc(100vh - 72px);  /* 72 = navbar height */
	display:flex;align-items:center;justify-content:center;
	padding:2rem 1rem;
}

/* card look */
.card{
	background:#fff;
	padding:2.5rem 2rem;
	border-radius:12px;
	box-shadow:0 4px 18px rgba(0,0,0,.08);
	width:100%;max-width:420px;
	text-align:center;
}

.card h1{
	margin:0 0 1.75rem;font-size:1.5rem;font-weight:600;
}

form{display:flex;flex-direction:column;gap:1rem;}

/* inputs */
input{
	padding:.75rem 1rem;border:1px solid #ccc;border-radius:8px;
	font-size:1rem;width:100%;
}
input:focus{border-color:#28a745;outline:none;}

/* button */
button{
	background:#28a745;color:#fff;border:none;
	padding:.75rem 1rem;font-size:1rem;border-radius:8px;cursor:pointer;
	transition:background .15s;
}
button:hover   {background:#1e7e34;}
button:disabled{opacity:.6;cursor:not-allowed;}

/* error text */
.error{color:#d73035;margin-top:1rem;}

/* alternate link */
.alt{margin-top:1.5rem;font-size:.95rem;}
.alt a{color:#28a745;text-decoration:none;}
.alt a:hover{text-decoration:underline;}
</style>
