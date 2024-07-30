import { page } from "$app/stores";
import { db } from "$lib/firebase/client";
import { collection, getDocs, query, where } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const stratRef = collection(db, "stories", "strategy", $page.data.user.platform)
    const issueRef = collection(db, "stories", "issue", $page.data.user.platform)

    const stratQuery = query(stratRef, where("uid", "==", $page.data.user.uid))
    const issueQuery = query(issueRef, where("uid", "==", $page.data.user.uid))

    const stratSnapshot = await getDocs(stratQuery)

	return {
		
	};
}