import { signOut } from 'firebase/auth';
import { auth } from '$lib/firebase/client';
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  redirect(302, '/')
}

export const actions: Actions = {
    default({ cookies }) {
        signOut(auth)
        .then(() => {
            cookies.delete('__session', {path: '/'})
            redirect(302, '/');
        })
        .catch((error) => {
            console.log("here")
            console.log(error);
        });
    }
    };