import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';
import { getStorage } from 'firebase/storage';


export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;


const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
 storageBucket: import.meta.env.VITE_STORAGE_BUCKET
};

// Initialize Firebase
app = initializeApp(firebaseConfig);

// For authentification
auth = getAuth(app);
db = getFirestore(app, "gigshare");

export const storage = getStorage(app);
// export const initializeFirebase = () => {
//  if (!browser) {
//   throw new Error("Can't use the Firebase client on the server.");
//  }
//  if (!app) {
//   console.log("NO ERROR WITH FIREBASE")
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
//   db = getFirestore(app, "gigshare")
//   console.log(app)
// }
// else {
//   console.log("ERROR WITH FIREBASE")
//   console.log("auth in client ",auth)
// }
 
// };