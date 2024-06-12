import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '$lib/firebase.client';
import { authUser } from '$lib/authstore';


    export function handleLogout() {
            signOut(auth)
                .then(() => {
                    authUser.set(undefined);  // Clear the authenticated user state
                    goto('/login');
                })
                .catch((error) => {
                    console.log(error);
                });
        };