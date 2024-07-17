/* eslint-disable prefer-const */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
app = initializeApp(firebaseConfig);

// For authentification
auth = getAuth(app);
db = getFirestore(app, "gigshare");

export const storage = getStorage(app);

