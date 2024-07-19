<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '$lib/firebase/client';
  import { type ConfirmationResult, type RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
  import type { ActionData } from './$types'; 
	export let form : ActionData;
  
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
      confirmationResult = await signInWithPhoneNumber(auth, '+1'+form.phone.value, recaptchaVerifier);
      console.log('SMS sent.');
    } catch (error) {
      console.error('Error during signInWithPhoneNumber', error);
    }
  };

  const verifyCode = async (event: Event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, form.code.value);
      const userCredential = await signInWithCredential(auth, credential);
      const token = await userCredential.user.getIdToken();
      await auth.signOut();
      // console.log('User signed in successfully', token);
      
      const input = document.createElement("input");
            input.type = "hidden";
            input.name = "token";
            input.value = token;
            form.appendChild(input);
            form.submit();
    } catch (error) {
      console.error('Error during signInWithCredential', error);
    }
  };
</script>
<form method="POST" bind:this={form}>
  <div>
    <input type="tel" placeholder="Phone Number" name="phone">
    <button on:click|preventDefault={sendCode}>Send Code</button>

  <div id="recaptcha-container"></div>
  
  <div>
  <input type="text" placeholder="Verification Code" name="code">
    </div>
      <button on:click|preventDefault={verifyCode}>Verify Code</button>
    
  </div>
</form>