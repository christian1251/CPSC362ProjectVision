<script lang="ts">
    import { auth } from '$lib/firebase.js';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { doc, setDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase.js';
	import { getDoc } from 'firebase/firestore/lite';
  
    let email = '', password = '';
  
    async function signup() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Stores user information in uid
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date().toISOString()
        });
  
        alert('Signed up as ' + userCredential.user.email);
      } catch (e) {
        if (e instanceof Error) {
          alert('Error: ' + e.message);
        }
      }
    }

    // Fetches user function
    async function loadUserProfile(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
  </script>
  
  <form on:submit|preventDefault={signup}>
    <input bind:value={email} placeholder="Email" type="email" required />
    <input bind:value={password} placeholder="Password" type="password" required />
    <button>Sign Up</button>
  </form>
  