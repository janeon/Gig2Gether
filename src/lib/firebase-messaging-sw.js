console.log('top')
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
console.log('after')
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   };

initializeApp(firebaseConfig)

const messaging = firebase.messaging()
// if ('serviceWorker' in navigator) {
//     console.log('here in sw')
//     // navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }
