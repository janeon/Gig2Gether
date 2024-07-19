import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
// import { browser } from '$app/environment';

const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

// For authentification
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app, "gigshare");