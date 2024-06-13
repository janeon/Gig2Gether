<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebase.client';
    import { authUser } from '$lib/authstore';
    import { doc, setDoc } from 'firebase/firestore';
	import Switch from '$lib/Switch.svelte';
	// const roles = [
	// 	"worker",
	// 	"policymaker"
	// ]
	let email: string;
	let password: string;
	let role: string = "worker" // = "worker" or "policymaker"

	let success: boolean | undefined = undefined;

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async(userCredential) => {
				$authUser = {
					uid: userCredential.user.uid,
					email: userCredential.user.email || '',
					role: role
				};
				const userRef = doc(db, "users", $authUser.uid);
				await setDoc(userRef,
            	{	email: $authUser.email,
					role: role,
					datasharing: true
				}), {merge: true}
				goto('/protected');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);

				success = false;
			});
	};

	
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="flex flex-col items-center">
	<Switch bind:value={role} label="I'm a gig" options={["worker", "policymaker"]} design="inner"/>

<form
	class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
	on:submit|preventDefault={register}
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
	
	<button type="submit" class="default-action">Register</button>

	{#if !success && success !== undefined}
		<div class="p-8 text-red-500 bg-red-100">There was an error registering. Please try again.</div>
	{/if}
</form>
</div>