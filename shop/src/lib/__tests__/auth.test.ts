import { describe, it, expect, beforeEach } from 'vitest';
import { FakeAuth } from './__mocks__/fakeauth.ts';

describe('Firebase Auth', () => {
  let fakeAuth: FakeAuth;

  beforeEach(() => {
    fakeAuth = new FakeAuth();
  });

  it('should sign up a user successfully', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const userCredential = await fakeAuth.createUserWithEmailAndPassword(email, password);

    expect(userCredential.email).toBe('test@example.com');
  });

  it('should log in a user successfully', async () => {
    const email = 'test2@example.com';
    const password = 'password123';

    await fakeAuth.createUserWithEmailAndPassword(email, password);
    const userCredential = await fakeAuth.signInWithEmailAndPassword(email, password);

    expect(userCredential.email).toBe('test2@example.com');
  });

  it('should fail to sign up with an existing email', async () => {
    const email = 'duplicate@example.com';
    const password = 'password123';

    await fakeAuth.createUserWithEmailAndPassword(email, password);

    await expect(fakeAuth.createUserWithEmailAndPassword(email, password))
      .rejects
      .toThrow('Email already in use');
  });

  it('should fail to log in with wrong password', async () => {
    const email = 'wrongpass@example.com';
    const correctPassword = 'password123';
    const wrongPassword = 'wrongpassword';

    await fakeAuth.createUserWithEmailAndPassword(email, correctPassword);

    await expect(fakeAuth.signInWithEmailAndPassword(email, wrongPassword))
      .rejects
      .toThrow('Incorrect password');
  });

  it('should fail to log in if user not found', async () => {
    const email = 'notfound@example.com';
    const password = 'password123';

    await expect(fakeAuth.signInWithEmailAndPassword(email, password))
      .rejects
      .toThrow('User not found');
  });

});