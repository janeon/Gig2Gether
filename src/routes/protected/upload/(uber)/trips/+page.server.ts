import { redirect } from "@sveltejs/kit"
import type { Actions } from './$types'

export const actions = {
    default: async () => {
        redirect(303, "/protected/upload/trips");
    }
  } satisfies Actions
    