import "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
let auth;
async function load({ url }) {
  function getAuthUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => resolve(user ? user : false));
    });
  }
  return {
    getAuthUser,
    url: url.pathname
  };
}
const prerender = true;
export {
  load,
  prerender
};
