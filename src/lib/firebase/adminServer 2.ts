import admin, { type ServiceAccount } from "firebase-admin";

export function getFirebaseServer():
    | { error: false; data: typeof admin; app: admin.app.App}
    | { error: true; msg: string } {
    try {
        if (!admin.apps.length) {
            const serviceAccount = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
            const cert = admin.credential.cert(serviceAccount);
            admin.initializeApp({ credential: cert });
        }
        return { error: false, data: admin, app:admin.apps[0] };
    } catch (error) {
        console.error(error);
        return { error: true, msg: "Error initializing firebase server" };
    }
}
