<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';
	import { authUser } from '$lib/authstore';

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				$authUser = undefined;
				goto('/login');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>