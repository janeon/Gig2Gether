import { i as building } from "./internal.js";
import { g as getFirebaseServer } from "./adminServer.js";
import "clsx";
import "firebase/auth";
import { d as db } from "./client2.js";
import { doc, getDoc } from "firebase/firestore";
import { r as redirect } from "./index.js";
import { log } from "firebase-functions/logger";
const getUser = async (currUser) => {
  const ref = doc(db, "users", currUser);
  const docRef = await getDoc(ref);
  if (docRef.exists()) {
    const user = {
      uid: currUser,
      role: docRef.data().role,
      email: docRef.data().email,
      platform: docRef.data().platform
    };
    return user;
  }
  return null;
};
const handle = async ({ event, resolve }) => {
  log("Running handle in hooks");
  const session = event.cookies.get("__session") ?? "";
  if (!session) {
    log("No session found");
    return await resolve(event);
  }
  const isAuth = event.url.pathname === "/login";
  if (isAuth || building) {
    event.cookies.set("__session", "", { path: "/" });
    log("User is on login page or site is building");
    return await resolve(event);
  }
  const admin = getFirebaseServer();
  if (admin.error) {
    log("Error getting firebase admin");
    console.error("Error getting firebase admin");
    throw redirect(303, "/login");
  }
  log("got firebase admin: ");
  let decodedClaims;
  try {
    decodedClaims = await admin.data.auth(admin.app).verifySessionCookie(session, false);
  } catch (error) {
    console.error(error);
    throw redirect(303, "/login");
  }
  event.locals.user = await getUser(decodedClaims.uid);
  log("setting user at end of hook: ", event.locals.user);
  const response = await resolve(event);
  return response;
};
export {
  handle
};
