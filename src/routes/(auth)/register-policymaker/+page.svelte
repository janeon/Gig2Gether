<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 
	import { goto } from '$app/navigation';

	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebase/client'
	import { doc, setDoc } from 'firebase/firestore';
	import { Input } from 'flowbite-svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import BlueButton from '$lib/components/BlueButton.svelte';
	import { sendEmailVerificationWithContinueUrl } from '$lib/utils';

	let show1 = false;
	let show2 = false;

	export let form : ActionData;
	let token: string;
	// $: console.log("token", token);

	async function register(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission
		if (form.password.value != form.confirm.value) {
			form.formErrors = "Passwords do not match"
			return
		}
        try {
			auth.useDeviceLanguage();
			const email = form!.email.value;
			const password = form!.password.value;
			
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            token = await cred.user.getIdToken();
			const user = cred.user
				const docRef = doc(db, 'users', user.uid)
				await setDoc(docRef, {
					email: email,
					role: "policymaker",
					platform: "policymaker"
				})
			await sendEmailVerificationWithContinueUrl(user, token);
			goto(`/verify-email?email=${email}`);

        } catch (err) {
            console.error(err);
			form!.formErrors = err.code.split('/')[1];
        }
    }
</script>

<div class="flex justify-center min-h-screen pt-16">
	<form
	  class="flex flex-col gap-4 p-8 space-y-4 bg-white rounded-md w-full max-w-md"
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
	  >
	  <button slot="left" class="pointer-events-auto">
		<EnvelopeSolid class="w-6 h-6" />
	</button>
	  </Input>
	  <Input name="password" id="show-password" type={show1 ? 'text' : 'password'} placeholder="Password" size="md" class="px-4 py-2 border border-gray-300 rounded-md">
		<button slot="left" on:click={() => (show1 = !show1)} class="pointer-events-auto">
		  {#if show1}
			<EyeOutline class="w-6 h-6" />
		  {:else}
			<EyeSlashOutline class="w-6 h-6" />
		  {/if}
		</button>
	  </Input>
	  <Input name="confirm" id="confirm-password" type={show2 ? 'text' : 'password'} placeholder="Confirm Password" size="md" class="px-4 py-2 border border-gray-300 rounded-md">
		  <button slot="left" on:click={() => (show2 = !show2)} class="pointer-events-auto">
			{#if show2}
			  <EyeOutline class="w-6 h-6" />
			{:else}
			  <EyeSlashOutline class="w-6 h-6" />
			{/if}
		  </button>
		</Input>
  
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