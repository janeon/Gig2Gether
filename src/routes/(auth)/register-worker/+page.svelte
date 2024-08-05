<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 
	import { onMount } from 'svelte';
	
	import { type ConfirmationResult, PhoneAuthProvider, signInWithCredential, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
	import { auth, RecaptchaVerifier, db, signInWithPhoneNumber } from '$lib/firebase/client';
	import { collection, doc, getCountFromServer, query, setDoc, where } from 'firebase/firestore';

	import { Button, Input, Label, Radio, Alert } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import BlueButton from '$lib/components/BlueButton.svelte';
	
	export let form : ActionData;
	let token: string;
	let recaptchaVerifier: RecaptchaVerifier;
	let confirmationResult: ConfirmationResult;
	let signInMethod : string;
	let selectedPlatform : string = "";
	let show1 = false;
	let show2 = false;

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
		confirmationResult = await signInWithPhoneNumber(auth, '+1'+form.credentials.value, recaptchaVerifier);
		console.log('SMS sent.');
	  } catch (error) {
		form.formErrors = (error as Error).message;
		console.error('Error during signInWithPhoneNumber', error);
	  }
	};

	const emailOrPhone = async () => {
		if (form.credentials.value.includes('@')) {
			signInMethod = 'email';
		} else {
			signInMethod = 'phone';
			sendCode();
		}
	}

	async function register(event: Event): Promise<void> {
		event.preventDefault(); // Prevent the default form submission
		// let username: form.username.value
		if (form.username.value.length < 4) {
			form.formErrors = "Username must be at least 4 characters"
			return
		}
		const count = await getCountFromServer(query(collection(db, 'users'), where('username', '==', form.username.value)))
		if (count.data().count > 0) {
			form.formErrors = "Username is in use"
			return
		}

		if (form.password.value != form.confirm.value) {
			form.formErrors = "Passwords do not match"
			return
		}

        try {
			let cred = null;
			try {
				if (signInMethod == 'email') {
					cred = await createUserWithEmailAndPassword(auth, form.credentials.value, form.password.value);
					sendEmailVerification(auth.currentUser)
					.then(() => {
						console.log('Email verification sent');
					});
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
					credentials: form.credentials.value,
					role: "worker",
					platform: selectedPlatform
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

	function go(event) {
		if (event.key === 'Enter')	{
			event.preventDefault();
			emailOrPhone();
		}
	}	
</script>

<div class="flex justify-center min-h-screen pt-16">
	<form method="POST" use:enhance bind:this={form} 
		class="flex flex-col gap-4 p-8 space-y-4 bg-white rounded-md w-full max-w-md">
		<div class="flex justify-center space-x-4">
			<h3>Platform:</h3>
			<div class="flex items-center">
				<Radio id="rover" name="platform" value="rover" bind:group={selectedPlatform} />
				<Label for="rover" class="ml-2">Rover</Label>
			  </div>
			  
			  <div class="flex items-center">
				<Radio id="uber" name="platform" value="uber" bind:group={selectedPlatform} />
				<Label for="uber" class="ml-2">Uber</Label>
			  </div>
			  
			  <div class="flex items-center">
				<Radio id="upwork" name="platform" value="upwork" bind:group={selectedPlatform} />
				<Label for="upwork" class="ml-2">Upwork</Label>
			  </div>
		</div>
		{#if selectedPlatform}
		<div class="relative inline-block">
			<Input type="text" placeholder="Email or Phone Number" name="credentials" class="px-4 py-2 border border-gray-300 rounded-md" on:keypress={go} required />
			<Button on:click={emailOrPhone} class="absolute top-0 right-0 h-full px-4 py-2 bg-blue-500 text-white rounded-r-md">Go</Button>
		</div>
		{/if}
		
		{#if signInMethod == 'email'}
		<div>
			<Input placeholder="Username" name="username" class="px-4 pt-2 border border-gray-300 rounded-md" />
			<p class="text-xs">Choose a username without any identifiable information.</p>
		</div>
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
		<BlueButton onclick={register} type="submit" buttonText="Register" href="/protected"/>
		{:else if signInMethod == 'phone'}
		<div>
			<Input placeholder="Username" name="username" class="px-4 pt-2 border border-gray-300 rounded-md" />
			<p class="text-xs">Choose a username without any identifiable information.</p>
		</div>
		<Input type="text" placeholder="Verification Code" name="code" class="px-4 py-2 border border-gray-300 rounded-md" required />
		<BlueButton onclick={register} type="submit" buttonText="Register" href="/protected"/>
		{/if}
	
		{#if form?.formErrors}
		<Alert type="danger" class="text-red-500">
			{form.formErrors}
		</Alert>
		{/if}

	</form>
	<div id="recaptcha-container"></div>
</div> 