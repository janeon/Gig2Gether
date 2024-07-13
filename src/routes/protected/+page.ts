import { authUser } from '$lib/firebase/authstore';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	// const unsubscribe = authUser.subscribe((user) => {
	// 	if (!user) {
	// 		throw redirect(302, '/login');
	// 	}
	// });

	// unsubscribe();

	return {};
};