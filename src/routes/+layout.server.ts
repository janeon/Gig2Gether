import { log } from 'firebase-functions/logger';

// get `locals.user` and pass it to the `page` store
export const load = async ({ locals }) => {
  console.log("Layout load on main", locals.user, );
  return {
    user: locals.user,
  }
}