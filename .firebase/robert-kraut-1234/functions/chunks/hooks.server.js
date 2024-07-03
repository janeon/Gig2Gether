import "./client.js";
import { signOut } from "firebase/auth";
import { a as auth, d as db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";
const authenticateUser = async (event) => {
  const { cookies } = event;
  let verifytoken;
  const userToken = cookies.get("session");
  const currUser = auth.currentUser.uid;
  const ref = doc(db, "users", currUser);
  const docRef = await getDoc(ref);
  if (docRef.exists()) {
    verifytoken = docRef.data().authToken;
    console.log("token", verifytoken);
    if (verifytoken != userToken) {
      cookies.delete("session", { path: "/" });
      signOut(auth);
      console.log("tokens not equal");
    }
    const user = {
      uid: currUser,
      role: docRef.data().role,
      email: docRef.data().email
    };
    return user;
  }
  return null;
};
const handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");
  if (!session) {
    return await resolve(event);
  }
  event.locals.user = await authenticateUser(event);
  console.log("Running handle");
  return await resolve(event);
};
export {
  handle
};
