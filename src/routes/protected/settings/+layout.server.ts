export const load = async ({ locals }) => {
	// console.log('Parent Load:', locals.user); // Logs the user data, with updated data on subsequent requests
	return { user: locals.user };
};