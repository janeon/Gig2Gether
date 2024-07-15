<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 
	export let form : ActionData;
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase/client';
	let token: string;
	// $: console.log("token", token);

	export const prerender = false
	async function login(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission
        try {
            const cred = await signInWithEmailAndPassword(auth, form.email.value, form.password.value);
            token = await cred.user.getIdToken();
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

<div class="flex flex-col items-center">
	<form method="POST" use:enhance bind:this={form}
	class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
	>
		<input type="email" placeholder="email" name="email" 
		class="px-4 py-2 border border-gray-300 rounded-md" required/>
		<input type="password" placeholder="password" name="password" 
		class="px-4 py-2 border border-gray-300 rounded-md" required/>

		{#if form?.formErrors}
			<article>
				<div style="color: red;">
					{form.formErrors}
				</div>
			</article>
		{/if}
	<button on:click={login} type="submit" class="default-action">Login</button>
	</form>
</div>