import { signOut } from "firebase/auth";
import { a as auth } from "../../../../chunks/firebase.js";
import { r as redirect } from "../../../../chunks/index.js";
const load = async () => {
  redirect(302, "/");
};
const actions = {
  default({ cookies }) {
    signOut(auth).then(() => {
      cookies.delete("session", { path: "/" });
      redirect(302, "/");
    }).catch((error) => {
      console.log(error);
    });
  }
};
export {
  actions,
  load
};
