// import { page } from '$app/stores';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/index';
// import { authUser } from '$lib/authstore';../routes/login/$types';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '../app';
import type { RequestEvent } from '@sveltejs/kit';


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