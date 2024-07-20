import { signOut } from "firebase/auth";
import { a as auth } from "../../../../chunks/client2.js";
import { r as redirect } from "../../../../chunks/index.js";
const load = async () => {
  redirect(302, "/");
};
const actions = {
  default({ cookies }) {
    signOut(auth).then(() => {
      cookies.delete("__session", { path: "/" });
      redirect(302, "/");
    }).catch((error) => {
      console.log("here");
      console.log(error);
    });
  }
};
export {
  actions,
  load
};
