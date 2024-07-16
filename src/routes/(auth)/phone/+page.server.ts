import { redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from './$types'
import { getFirebaseServer } from "$lib/firebase/adminServer";
import type { DecodedIdToken } from "firebase-admin/auth";
import { log } from 'firebase-functions/logger';
import { getUser } from '$lib/utils'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/client';

export const load: PageServerLoad = async ({locals}) => {
//   if (locals.user) {
//     redirect(302, '/')
//   }
} 

export const actions = {
    default: async ({ request, cookies }) => {
      console.log("Phone page server actions");
      const formData = await request.formData();
      const token = formData.get("token") as string;
      console.log("token acquired", token);
      
      const admin = getFirebaseServer();
      if (admin.error) {
          console.error("Error getting firebase admin");
          throw redirect(303, "/login");
      }
      
      // Expires in 5 days
      const expiresIn = 60 * 60 * 24 * 5;
      let sessionCookie: string;
      let decodedClaims: DecodedIdToken;
      try {
        const admin_auth = admin.data.auth(admin.app);
        // persmission to sign blob/create token must be granted on iam
        // https://stackoverflow.com/questions/57564505/unable-to-assign-iam-serviceaccounts-signblob-permission
        sessionCookie = await admin_auth.createSessionCookie(token, { expiresIn: expiresIn * 1000 });
        decodedClaims = await admin_auth.verifySessionCookie(sessionCookie, false);
      } catch (error) {
        console.error("Error creating session cookie: ", (error as Error).message);
        throw redirect(303, "/login");
      }

    // If the user is not registered, redirect to registeration page
    const user = await getUser(token)
    if (user === null) {
        throw redirect(303, '/register')
        // try {
        //     console.log("User not registered, adding to database", decodedClaims.uid)
        //     const docRef = doc(db, 'users', decodedClaims.uid)
        //     await setDoc(docRef, {
        //         phone: formData.get("phone") as string,
        //         role: ""
        //     })
        // } catch (error) {
        // console.error((error as Error).message)
        // }
    }
  
      // DO NOT RENAME COOKIE 
      // FIRBASE FUNCTIONS ALLOWS ONLY ONE COOKIE, IT MUST BE NAMED __session
      // https://stackoverflow.com/questions/76611381/how-to-forwarded-cookies-to-the-clound-function-when-deploying-sveltekit-to-fire
      cookies.set("__session", sessionCookie, {
        maxAge: expiresIn,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    log("Session cookie set: ", sessionCookie);

    
    throw redirect(303, '/protected');
    }
  } satisfies Actions
    