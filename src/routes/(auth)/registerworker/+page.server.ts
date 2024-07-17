import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '$lib/firebase/client'
import { doc, setDoc } from 'firebase/firestore'
import { randomUUID } from 'crypto'

export const load: PageServerLoad = async ({locals}) => {
  if (locals.user) {
    redirect(302, '/')
  }
}

const register: Action = async ({ request, cookies }) => {
  const data = await request.formData()
  const role = "worker";
  const platform = data.get('platform')
  const email = data.get('email')
  const password = data.get('password')

  console.log(email, password)
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    return fail(400, { invalid: true })
  }
  await createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const idToken = randomUUID()
    try {
        cookies.set('session', idToken, { path: '/' })
      } catch (error) {
        console.log('error setting cookies')
        return
      }
    try {
      const user = userCredential.user
      const docRef = doc(db, 'users', user.uid)
      await setDoc(docRef, {
        email: email,
        authToken: idToken,
        role: role,
        platform: platform
      })
    } catch (error) {
      console.log("there was an error saving the user")
      return
    }

})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("ERROR:",errorCode,errorMessage)
    return
  })
  redirect(303, '/protected/welcome')
}

export const actions: Actions = { register }