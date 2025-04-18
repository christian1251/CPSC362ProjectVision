<script lang="ts">
    import { auth } from '$lib/firebase.js';
    import { signInWithEmailAndPassword } from 'firebase/auth';
  
    let email = '', password = '';
  
    async function login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in as ' + userCredential.user.email);
      } catch (e) {
        if (e instanceof Error) {
        alert('Error: ' + e.message);
        }
      }
    }
  </script>
  
  <form on:submit|preventDefault={login}>
    <input bind:value={email} placeholder="Email" type="email" required />
    <input bind:value={password} placeholder="Password" type="password" required />
    <button>Log In</button>
  </form>
  