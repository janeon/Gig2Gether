// import { auth, db } from "$lib/firebase/client";
// import { collection, doc, getDoc } from "firebase/firestore";


// export async function load() {
//     console.log("here")
//     console.log(auth.currentUser)
//     const currentUser = auth.currentUser.uid
//     let collectionRef = collection(db, "users", currentUser, "settings")
//     let docRef = doc(collectionRef, "sharing")
//     let docSnap = await getDoc(docRef)
//     let ret = []
//     if (docSnap.exists()) {
//         for (let option of docSnap.data().sharing) {
//             ret.push({value: option, label: (option.charAt(0).toUpperCase() + option.slice(1))})
//         }
//         ret = docSnap.data().sharing
//     }
//     return {
//         sharingSettings : ret
//     }
// }