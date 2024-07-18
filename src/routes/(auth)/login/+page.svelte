<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '$lib/firebase/client';
	import { type ConfirmationResult, PhoneAuthProvider, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
	import type { ActionData } from './$types'; 
	export let form : ActionData;
	import { getUser } from '$lib/utils'
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let token: string;
	// $: console.log("token", token);
	
	let recaptchaVerifier: RecaptchaVerifier;
	let confirmationResult: ConfirmationResult;
  
	onMount(() => {
	  recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
		'size': 'invisible',
		'callback': (response) => {
		  // reCAPTCHA solved, allow signInWithPhoneNumber.
		  console.log('reCAPTCHA solved.');
		}
	  });
	});
  
	const sendCode = async () => {
	  try {
		confirmationResult = await signInWithPhoneNumber(auth, '+1'+form.username.value, recaptchaVerifier);
		console.log('SMS sent.');
	  } catch (error) {
		console.error('Error during signInWithPhoneNumber', error);
	  }
	};
	
	let signInMethod : string;
	
	const emailOrPhone = async () => {
		if (form.username.value.includes('@')) {
			signInMethod = 'email';
		} else {
			signInMethod = 'phone';
			sendCode();
		}
	}
	
	async function login(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission
        let cred = null;
		try {
			try {
				if (signInMethod == 'email') {
					cred = await signInWithEmailAndPassword(auth, form.username.value, form.password.value);
				}
				if (signInMethod == 'phone') {
					const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, form.code.value);
					cred = await signInWithCredential(auth, credential);
				}
			} catch (error) {
				form.formErrors = (error as Error).message;
			}
			token = await cred.user.getIdToken();
			await auth.signOut();
			const uid = cred.user.uid;
			const user = await getUser(uid);
			if (user == null) {
				form.formErrors = 'User not found, please register first';
				return;
			}
			
			// console.log('User signed in successfully', token);
			
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = "token";
			input.value = token;
			form.appendChild(input);
			form.submit();

		} catch (err) {
			form.formErrors = err.code.split('/')[1];
			console.error(err);
		}
    }
  </script>
  
  <form method="POST" use:enhance bind:this={form}
  class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
  >	
  <div class="relative inline-block">
	<input type="text" placeholder="Email or Phone Number" name="username" 
	class="px-4 py-2 border border-gray-300 rounded-md" required/>
	<button on:click|preventDefault={emailOrPhone}
	class="absolute top-0 right-0 h-full px-4 py-2 bg-blue-500 text-white rounded-r-md"
	>Go</button>
  </div>
  
	<div id="recaptcha-container"></div>
	{#if signInMethod == 'email'}
		<input type="password" placeholder="password" name="password" 
		class="px-4 py-2 border border-gray-300 rounded-md"/>
	{:else if signInMethod == 'phone'}
		<input type="text" placeholder="Verification Code" name="code"
		class="px-4 py-2 border border-gray-300 rounded-md" required>
	{/if}

	{#if form?.formErrors}
		<article>
			<div style="color: red;">
				{form.formErrors}
			</div>
		</article>
	{/if}

	<button on:click={login} type="submit" class="default-action">Login</button>
  </form>