import { doc, setDoc } from "firebase/firestore";
import { db, messaging } from "./client";
import { getToken, onMessage } from "firebase/messaging";

const FCM_TOKEN_COLLECTION = "fcmTokens"



export async function requestNotificationsPermissions(uid:string) {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        await saveMessagingDeviceToken(uid)
    } else {
        console.log("Unable to get permission")
    }
}

export async function saveMessagingDeviceToken(uid:string) {
    console.log("waiting")
    let worker = await navigator.serviceWorker.register('../../../src/lib/firebase-messaging-sw.js')
    console.log('finished')
    const msg = await messaging()
    console.log('got msg')
    const fcmToken = await getToken(msg, {vapidKey: import.meta.env.VAPID_PUBLIC_KEY, serviceWorkerRegistration: worker})
    console.log('here2')
    if (fcmToken) {
        console.log("fcmtoken",fcmToken)
        const tokenRef = doc(db, FCM_TOKEN_COLLECTION, uid)
        await setDoc(tokenRef, {fcmToken})
    } else {
        // Need to request permissions for notifications
        requestNotificationsPermissions(uid)
    }
}