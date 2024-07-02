import { type ConfirmationResult, PhoneAuthProvider, RecaptchaVerifier, getAuth, onAuthStateChanged, signInWithPhoneNumber, signInWithCredential, useDeviceLanguage, signOut} from "firebase/auth";
import { app } from "./index";
import { get, writable } from "svelte/store";
import { browser } from '$app/environment';
import { setWindowProp } from "../services/window";

export const auth = getAuth(app);

export async function phoneSignIn(phoneNumber: string) {
    const recaptchaVerifier = get(recaptchaStore);

    if (!recaptchaVerifier) {
        throw new Error("RecaptchaVerifier not found");
    }

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

    confirmationResultStore.set(confirmationResult);
}

export async function verifyCode(code: string) {
    const confirmationResult = get(confirmationResultStore);

    if (!confirmationResult) {
        throw new Error("ConfirmationResult not found");
    }

    try {
        await confirmationResult.confirm(code);

        const userCredential = PhoneAuthProvider.credential(confirmationResult.verificationId, code);

        signInWithCredential(auth, userCredential);
    } catch (error) {
        console.error(error);
    }
}

export async function signOutAsync() {
    signOut(auth);
}

export const userStore = writable(auth.currentUser, (set) => {
    const unsubscribe = onAuthStateChanged(auth, set);
  
    return () => unsubscribe();
  });

export const confirmationResultStore = writable<ConfirmationResult | null>(null);
export const recaptchaStore = writable<RecaptchaVerifier | null>(null);

export const recaptchaValidStore = writable<boolean>(false, (set) => {
    if (!browser) {
        return;
    }
    useDeviceLanguage(auth);

    // const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    //     size: "normal",
    //     callback: () => {
    //       set(true);
    //     },
    //   });
      
    // recaptchaStore.set(recaptchaVerifier);
    // recaptchaVerifier.render().then((widgetId) => { 
    //     setWindowProp("recaptchaWidgetId", widgetId);
    // })
});