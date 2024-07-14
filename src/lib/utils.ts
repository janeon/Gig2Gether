import { db } from '$lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

import type { User } from '../app';

export const getUser = async(currUser:string) => {
    const ref = doc(db, "users", currUser)
    const docRef = await getDoc(ref)
    if (docRef.exists()) {
        const user : User = {
            uid: currUser,
            role: docRef.data().role,
            email: docRef.data().email
        }
        return user
    }
    return null
}