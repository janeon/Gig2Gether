import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from './$types'
import { log } from "firebase-functions/logger";

export const load: PageServerLoad = async ({locals}) => {
  log("Running protected load", locals.user);
  log("Loading user in protected route: ", locals.user)
    if (!locals.user) {
        log("User is not logged in")
        redirect(302, '/login')
    }
  } 