import { redirect } from "@sveltejs/kit"
import type { Actions } from './$types'

export const actions = {
    reload: async () => {
        redirect(303, "/protected/upload/trips");
    }, 
    manage: async () => {
        redirect(303, "/protected/upload/manage");
    }
  } satisfies Actions
    