<script lang="ts">
	import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '$lib/firebase/client';
	import { type ConfirmationResult, PhoneAuthProvider, signInWithCredential, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
	import type { ActionData } from './$types'; 
	import { getUser } from '$lib/utils'
	import { enhance } from '$app/forms';
	import { Button, Input, Alert } from 'flowbite-svelte';
	import BlueButton from '$lib/components/BlueButton.svelte';
  	import { BlenderPhoneSolid, EnvelopeSolid, EyeOutline, EyeSlashOutline, FileCopySolid, PhoneOutline, PhoneSolid } from 'flowbite-svelte-icons';
  	
	let show = false;
	export let form : ActionData;
	let token: string;
	// $: console.log("token", token);
	
	let recaptchaVerifier: RecaptchaVerifier;
	let confirmationResult: ConfirmationResult;
	let signInMethod : string = "";
  
	function passwordReset() {
		auth.useDeviceLanguage();
		sendPasswordResetEmail(auth, form.credentials.value)
		.then(() => {
			form.formErrors = "Password reset email sent!";
			// ..
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			form.formErrors = (error as Error).message;
		});
	}
  
	const sendCode = async () => {
	  try {
		confirmationResult = await signInWithPhoneNumber(auth, '+1'+form.credentials.value, recaptchaVerifier);
		console.log('SMS sent.');
	  } catch (error) {
		console.error('Error during signInWithPhoneNumber', error);
	  }
	};
	
	const emailOrPhone = async () => {
		if (form.credentials.value.includes('@')) {
			signInMethod = 'email';
		} else {
			signInMethod = 'phone';
			recaptchaVerifier = await new RecaptchaVerifier(auth, 'recaptcha-container', {
			'size': 'invisible',
			'callback': (response) => {
			// reCAPTCHA solved, allow signInWithPhoneNumber.
			console.log('reCAPTCHA solved.');}
			});
			sendCode();
		}
	}
	
	async function login(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission
        let cred = null;
		try {
			try {
				if (signInMethod == 'email') {
					cred = await signInWithEmailAndPassword(auth, form.credentials.value, form.password.value);
				}
				else if (signInMethod == 'phone') {
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

	function go(event) {
		if (event.key === 'Enter')	{
			event.preventDefault();
			emailOrPhone();
		}
	}	
  
</script>
  
<div class="flex justify-center min-h-screen pt-16">
	<form method="POST" use:enhance bind:this={form} class="flex flex-col gap-4 p-8 space-y-4 bg-white rounded-md w-full max-w-md">
		<div class="relative inline-block">
			<Input type="text" placeholder="Email or Phone Number" name="credentials" class="px-4 py-2 border border-gray-300 rounded-md" on:keypress={go} required>
				<button slot="left" class="pointer-events-auto">
					{#if signInMethod == 'email'}
						<EnvelopeSolid class="w-6 h-6" />
					{:else if signInMethod == 'phone'}
						<PhoneSolid class="w-6 h-6" />
					{:else}
						<BlenderPhoneSolid class="w-6 h-6" />
					{/if}
				</button>
			</Input>
			<Button on:click={emailOrPhone} class="absolute top-0 right-0 h-full px-4 py-2 bg-blue-500 text-white rounded-r-md">Go</Button>
		</div>
	
		{#if signInMethod == 'email'}
		<div>
			<Input name="password" id="show-password" type={show ? 'text' : 'password'} placeholder="Password" size="lg" class="px-4 py-2 border border-gray-300 rounded-md">
			  <button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
				{#if show}
				  <EyeOutline class="w-6 h-6" />
				{:else}
				  <EyeSlashOutline class="w-6 h-6" />
				{/if}
			  </button>
			</Input>
		</div>

		<button type="button" class="text-blue-500" on:click={() => passwordReset()}>Forgot Password?</button>
		
		{:else if signInMethod == 'phone'}
		<Input type="text" placeholder="Verification Code" name="code" class="px-4 py-2 border border-gray-300 rounded-md" required>
			<button slot="left" class="pointer-events-auto">
				<FileCopySolid class="w-6 h-6" />
			</button>
		</Input>
		{/if}
		<BlueButton onclick={login} type="submit" buttonText="Login"></BlueButton>
	
		{#if form?.formErrors}
		<Alert type="danger" class="text-red-500">
			{form.formErrors}
		</Alert>
		{/if}
	</form>
	<div id="recaptcha-container"></div>
  </div>