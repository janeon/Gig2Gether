import { r as redirect } from "../../../chunks/index.js";
import { log } from "firebase-functions/logger";
const load = async ({ locals }) => {
  log("Loading user in protected route: ", locals.user);
  if (!locals.user) {
    log("User is not logged in");
    redirect(302, "/login");
  }
  return { user: locals.user };
};
export {
  load
};
