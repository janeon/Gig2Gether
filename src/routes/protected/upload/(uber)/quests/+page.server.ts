import { redirect } from "@sveltejs/kit"
import type { Actions } from './$types'

export const actions = {
    reload: async () => {
        redirect(303, "/protected/upload/quests");
    },
    manage: async () => {
        redirect(303, "/protected/upload/manage");
    }
}  satisfies Actions
    