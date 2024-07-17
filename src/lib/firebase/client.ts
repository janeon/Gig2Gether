/* eslint-disable prefer-const */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, type Auth} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


let db: Firestore;
let app: FirebaseApp;
let auth: Auth;


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


export { RecaptchaVerifier, signInWithPhoneNumber, auth, db, app };