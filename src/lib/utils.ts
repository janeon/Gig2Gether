import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '$lib/firebase/client';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { type RequestEvent, type Cookies, fail, redirect } from '@sveltejs/kit';

import type { User } from '../app';

export const authenticateUser = async(event: RequestEvent) => {
    const {cookies} = event
    let verifytoken : string

    const userToken = cookies.get("session")
    const currUser = auth.currentUser!.uid
    const ref = doc(db, "users", currUser)
    const docRef = await getDoc(ref)
    if (docRef.exists()) {
        verifytoken = docRef.data().authToken
        console.log("token",verifytoken)
        if (verifytoken != userToken) {
            cookies.delete('session', {path: '/'})
            signOut(auth)
            console.log("tokens not equal")
        }
        const user : User = {
            uid: currUser,
            role: docRef.data().role,
            email: docRef.data().email
        }
        return user
    }
    return null
}

// export function loginSetCookie(email:string, password:string, idToken:string, cookies:Cookies) {
//     try { // firebase log
//       console.log("about to get credential");
      
//     //   const userCredential = signInWithEmailAndPassword(auth, email, password);
//       console.log("got userCredential");
//     //   // set cookie
//     //   try { 
//     //     cookies.set('session', idToken, { path: '/' });
//     //   } catch (error) {
//     //     const errorMessage = (error as Error).message;
//     //     return fail(402, { formErrors: "Error setting cookie: " + errorMessage });
//     //   }
//     //   console.log('cookie set');
      
//     //   // update user
//     //   try { 
//     //     const user = userCredential.user;
//     //     const docRef = doc(db, 'users', user.uid);
//     //     await updateDoc(docRef, {
//     //       authToken: idToken
//     //     });
//     //   } catch (error) {
//     //     const errorMessage = (error as Error).message;
//     //     return fail(402, { formErrors: "Error updating user: " + errorMessage });
//     //   }
//     //   console.log("user updated");
      
//     } catch (error) {
//       const errorMessage = (error as Error).message;
//       console.log("Could not log in:", errorMessage);
//       return fail(402, { formErrors: "Username or password not found" });
//     }
//     console.log("logged in");
    
//     return redirect(303, '/protected')
//   }



