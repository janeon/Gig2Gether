import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
let db;
let app;
let auth;
const firebaseConfig = {
  apiKey: "AIzaSyCay4GU4vhV6G4GZP9BQjGDXhAfBsKNfLQ",
  appId: "1:408239274811:web:e6827cdc4b431ea811551e",
  authDomain: "robert-kraut-1234.firebaseapp.com",
  projectId: "robert-kraut-1234"
};
app = initializeApp(firebaseConfig);
auth = getAuth(app);
db = getFirestore(app, "gigshare");
export {
  auth as a,
  db as d
};
