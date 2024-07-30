import { db } from "$lib/firebase/client";
import type { Data } from "$lib/types.js";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export async function load({parent}) {
    const platforms = ["rover", "uber", "upwork"]
    let postedData = []
    let data = await parent()
    const snapshot = await getDocs(query(collection(db, 'stories', data.user.platform, "posts"), where('uid', "==", data.user.uid), orderBy("date", "desc")))
    snapshot.forEach((doc) => {
        let post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().date.toDate()
        post.type = "story"
        post.title = doc.data().title
        post.id = doc.id
        postedData.push(post)
    })
    return {
        posts: postedData
    }
}