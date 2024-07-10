import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';

const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
};

// Initialize Firebase in Sveltekit way
export let app: FirebaseApp;
if(!getApps().length){
    app = initializeApp(firebaseConfig)
  }
  else{
    app = getApp();
    deleteApp(app);
    app = initializeApp(firebaseConfig);
  }

// For authentification
export const db:Firestore = getFirestore(app, "gigshare");
export const auth: Auth = getAuth(app);
