import { fail, redirect } from "@sveltejs/kit"
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
        const credential = await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        return fail(403, { formErrors: (error as Error).message });
      }
      
      redirect(302, '/protected');
    }
  } as Actions



    