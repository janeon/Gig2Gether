import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../$types"


export const load: PageServerLoad = async () => {
    // we only use this endpoint for the api
    // and don't need to see the page
    console.log("loading")
    redirect(302, '/protected/settings/account')
  }