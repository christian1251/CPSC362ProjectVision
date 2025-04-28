export class FakeAuth {
    private users: Record<string, string> = {}; // email => password
  
    async createUserWithEmailAndPassword(email: string, password: string) {
      if (this.users[email]) {
        throw new Error('Email already in use');
      }
      this.users[email] = password;
      return { email };
    }
  
    async signInWithEmailAndPassword(email: string, password: string) {
      if (!this.users[email]) {
        throw new Error('User not found');
      }
      if (this.users[email] !== password) {
        throw new Error('Incorrect password');
      }
      return { email };
    }
  
    reset() {
      this.users = {}; 
    }
  }