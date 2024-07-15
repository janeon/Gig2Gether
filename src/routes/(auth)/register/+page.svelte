<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 
	export let form : ActionData;
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth, db } from '$lib/firebase/client'
	import { doc, setDoc } from 'firebase/firestore';
	let token: string;
	$: console.log("token", token);

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
					role: form!.role.value
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


<div class="flex flex-col items-center">

<form
	class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
	action="?/register" method="POST" use:enhance bind:this={form}
>
	<input type="email" placeholder="email" name="email" 
		class="px-4 py-2 border border-gray-300 rounded-md" required/>
	<input type="password" placeholder="password" name="password" 
		class="px-4 py-2 border border-gray-300 rounded-md" required/>	
		
	<div>
		<p>Role</p>
			<input id="policy" name="role" type="radio" value="policy"required />
			<label for="policy">Policymaker</label><br>
			<input id="worker" name="role" type="radio" value="worker"required />
			<label for="worker">Worker</label><br>
	</div>

	{#if form?.formErrors}
			<article>
				<div style="color: red;">
					{form.formErrors}
				</div>
			</article>
	{/if}
	
	<button on:click={register} type="submit" class="default-action">Register</button>
</form>
</div>