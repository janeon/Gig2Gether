import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({locals}) => {
  // log("Loading user in protected route: ")
    if (!locals.user) {
        console.log("User is not logged in")
        redirect(302, '/login')
    }
    return { user: locals.user }
  } 