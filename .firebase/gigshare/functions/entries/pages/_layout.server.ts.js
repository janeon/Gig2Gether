import { log } from "firebase-functions/logger";
const load = async ({ locals }) => {
  log("Layout load on main", locals.user);
  return {
    user: locals.user
  };
};
export {
  load
};
