import type { Handle } from '@sveltejs/kit'
import { building } from "$app/environment";
import { getFirebaseServer } from '$lib/firebase/adminServer'
import { getUser } from '$lib/utils' 
import { redirect } from '@sveltejs/kit'
import type { DecodedIdToken } from "firebase-admin/auth";
import { log } from 'firebase-functions/logger';


export const handle: Handle = async ({ event, resolve }) => {
  log("Running handle in hooks")
  // get cookies from browser
  const session = event.cookies.get("__session") ?? "";
  if (!session) {
    // if there is no session load page as normal
    // log("No session found")
    return await resolve(event)
  }

  // if the user is on the login page or the site is building
  const isAuth: boolean = event.url.pathname === "/login";
    if (isAuth || building) {
      event.cookies.set("__session", "", { path: "/" });
      log("User is on login page or site is building")
      return await resolve(event);
    }
  
  // get the firebase admin instance
  const admin = getFirebaseServer();
  if (admin.error) {
    // log("Error getting firebase admin")
    console.error("Error getting firebase admin");
    throw redirect(303, "/login");
  }

  // log("got firebase admin: ")
  
  // verify the session with admin sdk
  let decodedClaims: DecodedIdToken;
  try {
      const admin_auth = admin.data.auth(admin.app);
      decodedClaims = await admin_auth.verifySessionCookie(session, false);
  } catch (error) {
      console.error(error);
      throw redirect(303, "/login");
  }
  
  // find the user based on the session
  event.locals.user = await getUser(decodedClaims.uid)
  // log("setting user at end of hook: ")

  // load page as normal
  const response = await resolve(event)
  return response
}
