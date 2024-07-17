<!-- <script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebase/client';
    import { authUser } from '$lib/authstore';
    import { doc, setDoc } from 'firebase/firestore';
	import Switch from '$lib/Switch.svelte';
    import type { ActionData } from './$types';
	// let email: string;
	// let password: string;
	let role: string = "worker" // = "worker" or "policymaker"

	let success: boolean | undefined = undefined;


	
</script> -->

<svelte:head>
	<title>Register as a Worker</title>
</svelte:head>

<div class="flex content-evenly justify-center flex-row">
		<form
			class="flex flex-col gap-4 p-8 space-y-4 bg-white"
			action="?/register" method="POST"
		>
			<input
				type="email"
				placeholder="Email"
				id="email"
				name="email"
				class="px-4 py-2 border border-gray-300 rounded-md"
				required
			/>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				class="px-4 py-2 border border-gray-300 rounded-md"
				required
			/>
			
			<div class = "flex flex-row space-x-2">
				<input id="rover" name="platform" type="radio" value="rover"required />
				<label for="rover">Rover</label><br>
				<input id="uber" name="platform" type="radio" value="uber"required />
				<label for="uber">Uber</label><br>
				<input id="upwork" name="platform" type="radio" value="upwork"required />
				<label for="upwork">UpWork</label><br>
			</div>
			
			<button type="submit" class="default-action">Register</button>
		<!-- 
			{#if !success && success !== undefined}
				<div class="p-8 text-red-500 bg-red-100">There was an error registering. Please try again.</div>
			{/if} -->
		</form>
	
</div>