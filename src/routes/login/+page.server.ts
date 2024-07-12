import { fail, redirect } from "@sveltejs/kit"
import type { Action, Actions, PageServerLoad } from './$types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '$lib/firebase/authstore'
import { doc, updateDoc } from 'firebase/firestore'
import { randomUUID } from 'crypto'

export const actions: Actions = {
    default: async ( {request} ) => {
        let form = await request.formData();
        let email = form.get('email') as string;
        let password = form.get('password') as string;
        if (!email || !password) {
            return fail(400, {formErrors: 'Email and password are required'});
        }
    console.log("authenticating soon");
    
  await signInWithEmailAndPassword(auth, email, password)
//   .then(async(userCredential) => {
//     const idToken = randomUUID()
//     try {
//         cookies.set('session', idToken, { path: '/' })
//       } catch (error) {
//         console.log('error setting cookies')
//       }
    // try {
    //   const user = userCredential.user
    //   const docRef = doc(db, 'users', user.uid)
    //   await updateDoc(docRef, {
    //     authToken: idToken
    //   })
    //   console.log(idToken)
    // } catch (error) {
    //   console.log("there was an error getting the user")
    // }
// })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("help",errorCode,errorMessage)
//   })
  redirect(303, '/')
}
};