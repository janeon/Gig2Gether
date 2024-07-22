<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 
	import { onMount } from 'svelte';
	
	import { type ConfirmationResult, PhoneAuthProvider, signInWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
	import { auth, RecaptchaVerifier, db, signInWithPhoneNumber } from '$lib/firebase/client';
	import { doc, setDoc } from 'firebase/firestore';
	
	export let form : ActionData;
	let token: string;
	let recaptchaVerifier: RecaptchaVerifier;
	let confirmationResult: ConfirmationResult;
	let signInMethod : string;

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

	const emailOrPhone = async () => {
		if (form.username.value.includes('@')) {
			signInMethod = 'email';
		} else {
			signInMethod = 'phone';
			sendCode();
		}
	}

	async function register(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission

        try {
			let cred = null;
			try {
				if (signInMethod == 'email') {
					cred = await createUserWithEmailAndPassword(auth, form.username.value, form.password.value);
				}
				if (signInMethod == 'phone') {
					const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, form.code.value);
					cred = await signInWithCredential(auth, credential);
				}
			} catch (error) {
				form.formErrors = (error as Error).message;
			}
            token = await cred.user.getIdToken();
			try {
				const user = cred.user
				const docRef = doc(db, 'users', user.uid)
				await setDoc(docRef, {
					username: form.username.value,
					role: "worker",
					platform: form.platform.value
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

<div class="flex content-evenly justify-center flex-row">
	<form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
		action="?/register" method="POST" use:enhance bind:this={form}>
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

		<div class = "flex flex-row space-x-2">
			<input id="rover" name="platform" type="radio" value="rover"required />
			<label for="rover">Rover</label><br>
			<input id="uber" name="platform" type="radio" value="uber"required />
			<label for="uber">Uber</label><br>
			<input id="upwork" name="platform" type="radio" value="upwork"required />
			<label for="upwork">Upwork</label><br>
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