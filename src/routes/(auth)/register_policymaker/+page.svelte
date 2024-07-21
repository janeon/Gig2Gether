<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 

	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebase/client'
	import { doc, setDoc } from 'firebase/firestore';
	import { Input } from 'flowbite-svelte';
	import BlueButton from '$lib/components/BlueButton.svelte';

	export let form : ActionData;
	let token: string;
	// $: console.log("token", token);

	async function register(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission
        try {
			const email = form!.email.value;
			const password = form!.password.value
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            token = await cred.user.getIdToken();
			try {
				const user = cred.user
				const docRef = doc(db, 'users', user.uid)
				await setDoc(docRef, {
					email: email,
					role: "policymaker",
					platform: "policymaker"
				})
			} catch (error) {
			console.error((error as Error).message)
			}
            await auth.signOut();
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "token";
            input.value = token;
            form.appendChild(input);
            form.submit();
        } catch (err) {
            console.error(err);
			form!.formErrors = err.code.split('/')[1];
        }
    }
</script>

<div class="flex justify-center min-h-screen pt-16">
	<form
	  class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
	  action="?/register"
	  method="POST"
	  use:enhance
	  bind:this={form}
	>
	  <Input
		type="email"
		placeholder="Email"
		name="email"
		label="Email"
		required
	  />
	  <Input
		type="password"
		placeholder="Password"
		name="password"
		label="Password"
		required
	  />
  
	  {#if form?.formErrors}
		<article>
		  <div class="text-red-600">
			{form.formErrors}
		  </div>
		</article>
	  {/if}
  
	  <BlueButton onclick={register} type="submit" buttonText="Register" href="/protected"/>

	</form>
  </div>