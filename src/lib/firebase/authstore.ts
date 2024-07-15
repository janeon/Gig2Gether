import { writable } from 'svelte/store';
import { auth } from './client';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthUser {
	uid: string;
	email: string;
	role: string;
}

onAuthStateChanged(auth, (user) => {
	authUser.set(user);
  });

export const authUser = writable<AuthUser | undefined>(undefined);