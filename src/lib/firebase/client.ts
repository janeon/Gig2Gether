/* eslint-disable prefer-const */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, type Auth} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getMessaging, isSupported } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

let db: Firestore;
let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage;


const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
 messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID
};

// Initialize Firebase
app = initializeApp(firebaseConfig);

// For authentification
auth = getAuth(app);
db = getFirestore(app, "gigshare");
storage = getStorage(app);
let messaging = async () => await isSupported() && getMessaging(app)
// const analytics = getAnalytics(app);

export { RecaptchaVerifier, signInWithPhoneNumber, auth, db, app, storage, messaging};