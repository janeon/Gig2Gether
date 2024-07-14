import { error, fail, redirect } from "@sveltejs/kit"
import { randomUUID } from 'crypto'
import type { Actions, PageServerLoad } from './$types'
// import { loginSetCookie } from "$lib/utils"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$lib/firebase/client';

export const load: PageServerLoad = async ({locals}) => {
  if (locals.user) {
    redirect(302, '/')
  }
} 

export const actions = {
    default: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        console.log('idToken', idToken);
        
      } catch (err) {
        console.error('Sign-in error:', err);
        return fail(403, { formErrors: err.code.split('/')[1] });
      }
      redirect(303, '/protected');
    }
  } as Actions



    