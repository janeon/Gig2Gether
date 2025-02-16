import { redirect } from "@sveltejs/kit"
import type { Actions } from './$types'

export const actions = {
    // Existing default action
    reload: async () => {
        return {
            success: true
        };
    },

    // New action to redirect to /protected/upload/manage
    manage: async () => {
        throw redirect(303, '/protected/upload/manage');
    }
} satisfies Actions
    