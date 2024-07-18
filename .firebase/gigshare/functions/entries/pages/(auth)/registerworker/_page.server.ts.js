import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { a as auth, d as db } from "../../../../chunks/client2.js";
import { doc, setDoc } from "firebase/firestore";
import { randomUUID } from "crypto";
const load = async ({ locals }) => {
  if (locals.user) {
    redirect(302, "/");
  }
};
const register = async ({ request, cookies }) => {
  const data = await request.formData();
  const role = "worker";
  const platform = data.get("platform");
  const email = data.get("email");
  const password = data.get("password");
  console.log(email, password);
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { invalid: true });
  }
  await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
    const idToken = randomUUID();
    try {
      cookies.set("session", idToken, { path: "/" });
    } catch (error) {
      console.log("error setting cookies");
      return;
    }
    try {
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        email,
        authToken: idToken,
        role,
        platform
      });
    } catch (error) {
      console.log("there was an error saving the user");
      return;
    }
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("ERROR:", errorCode, errorMessage);
    return;
  });
  redirect(303, "/protected/welcome");
};
const actions = { register };
export {
  actions,
  load
};
