<script lang="ts">
	import { auth, db } from '$lib/firebase.js';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { doc, setDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let errorMsg = '';

	async function signup() {
		errorMsg = '';
		loading  = true;

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			/* basic user doc */
			await setDoc(doc(db, 'users', res.user.uid), {
				email: res.user.email,
				createdAt: new Date().toISOString()
			});

			alert(`Account created for ${res.user.email}`);
			goto('/');                // redirect to home
		} catch (err) {
			if (err instanceof Error) errorMsg = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<section class="wrapper">
	<div class="card">
		<h1>Create your StyleSpot account</h1>

		<form on:submit|preventDefault={signup}>
			<input  bind:value={email}     placeholder="Email"    type="email"    required />
			<input  bind:value={password}  placeholder="Password (min 6 chars)" type="password" required minlength="6" />
			<button disabled={loading}>
				{loading ? 'Signing up…' : 'Sign Up'}
			</button>
		</form>

		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}

		<p class="alt">
			Already have an account? <a href="/login">Log in</a>
		</p>
	</div>
</section>

<style>
/* identical styling to login page for consistency */
.wrapper{
	min-height:calc(100vh - 72px);
	display:flex;align-items:center;justify-content:center;
	padding:2rem 1rem;
}
.card{
	background:#fff;
	padding:2.5rem 2rem;
	border-radius:12px;
	box-shadow:0 4px 18px rgba(0,0,0,.08);
	width:100%;max-width:420px;
	text-align:center;
}
.card h1{margin:0 0 1.75rem;font-size:1.5rem;font-weight:600;}
form{display:flex;flex-direction:column;gap:1rem;}

input{
	padding:.75rem 1rem;border:1px solid #ccc;border-radius:8px;
	font-size:1rem;width:100%;
}
input:focus{border-color:#28a745;outline:none;}

button{
	background:#28a745;color:#fff;border:none;
	padding:.75rem 1rem;font-size:1rem;border-radius:8px;cursor:pointer;
	transition:background .15s;
}
button:hover   {background:#1e7e34;}
button:disabled{opacity:.6;cursor:not-allowed;}

.error{color:#d73035;margin-top:1rem;}
.alt{margin-top:1.5rem;font-size:.95rem;}
.alt a{color:#28a745;text-decoration:none;}
.alt a:hover{text-decoration:underline;}
</style>
