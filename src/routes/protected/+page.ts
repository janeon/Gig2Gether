import { authUser } from '$lib/authstore';
import { redirect } from '@sveltejs/kit';
// import { getAuth } from 'firebase/auth';


export const load = async () => {

	// const getUser = () => {
	// 	const auth = getAuth();
	// 	const user = auth.currentUser;
	// 	if (!user) {
	// 		throw redirect(302, '/login');
	// 	}
	// }

	// getUser();
	const unsubscribe = authUser.subscribe((user) => {
		if (!user) {
			throw redirect(302, '/login');
		}
	});

	unsubscribe();

	return {};
};