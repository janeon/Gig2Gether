import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	reload: async () => {
		redirect(303, '/protected/upload/expenses');
	},
	// New action to redirect to /protected/upload/manage
	manage: async () => {
		throw redirect(303, '/protected/upload/manage');
	}
} satisfies Actions;
