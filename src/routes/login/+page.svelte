<script lang="ts">
	import { goto } from '$app/navigation';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebase.client';
	import { authUser } from '$lib/authstore';
    import { doc, getDoc } from 'firebase/firestore';

	const errorMessages = [
		{
			type: 'auth/user-not-found',
			message:
				'This email is not registered. Please register first or try again with a different email.'
		},
		{
			type: 'auth/wrong-password',
			message: 'The password you entered is incorrect. Please try again.'
		}
	];
	
	// const roles = [
	// 	"worker",
	// 	"policymaker"
	// ]
	let email: string;
	let password: string;
	// let role: string;
	let success: boolean | undefined = undefined;

	let customError = {
		type: '',
		message: ''
	};

	const login = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async(userCredential) => {
				const docRef = doc(db, "users", userCredential.user.uid)
				const docSnap = await getDoc(docRef)
				if (docSnap.exists() && docSnap.data().datasharing) {
					const role = docSnap.data().role;
					$authUser = {
						uid: userCredential.user.uid,
						email: userCredential.user.email || '',
						role: role
					};
					console.log(role);
					goto('/protected');
				}
				else {
					customError = {
						type: "Not a user in ",
						message: "You do not have an account associated with the datasharing portal."
					}
				}
			})
			.catch((error) => {
				const errorCode = error.code;

				const errorMatch = errorMessages.find((error) => error.type === errorCode);

				if (errorMatch) {
					customError = errorMatch;
				} else {
					customError = {
						type: 'unknown',
						message: 'There was an error logging in. Please try again.'
					};
				}

				success = false;
			});
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<h1 class="text-4xl font-bold">Login</h1>

<form
	class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-10/12"
	on:submit|preventDefault={login}
>
	<input
		type="email"
		placeholder="Email"
		class="px-4 py-2 border border-gray-300 rounded-md"
		required
		bind:value={email}
	/>
	<input
		type="password"
		placeholder="Password"
		class="px-4 py-2 border border-gray-300 rounded-md"
		required
		bind:value={password}
	/>
	<!-- <select bind:value={role} placeholder = "Sign in as" required>
		{#each roles as r}
            <option value = {r}>
                {r}
            </option>
        {/each}
	</select> -->
	<button type="submit" class="default-action">Login</button>

	{#if !success && success !== undefined}
		<div class="p-8 text-red-500 bg-red-100">{customError.message}</div>
	{/if}
</form>