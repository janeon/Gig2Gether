import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '$lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { randomUUID } from 'crypto'

export const load: PageServerLoad = async ({locals}) => {
  if (locals.user) {
    redirect(302, '/')
  }
}

const login: Action = async ({ cookies,request }) => {
  console.log('login', request.url);
  
  const data = await request.formData()
  const email = data.get('email')
  const password = data.get('password')

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  await signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const idToken = randomUUID()
    try {
        cookies.set('session', idToken, { path: '/' })
      } catch (error) {
        console.log('error setting cookies')
      }
    try {
      const user = userCredential.user
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, {
        authToken: idToken
      })
      console.log(idToken)
    } catch (error) {
      console.log("there was an error getting the user")
    }
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("help",errorCode,errorMessage)
  })
  redirect(303, '/protected')
}

export const actions: Actions = { login }