import { db } from "$lib/firebase/client";
import { collection, getDocs } from "firebase/firestore";

export async function load() {
    console.log("in load")
    const platforms = ["rover", "uber", "upwork"]
    let posts = []
    for (let platform of platforms) {
        const snapshot = await getDocs(collection(db, 'stories', platform, "posts"))
        snapshot.forEach((doc) => {
            let post = doc.data()
            post.date = post.date.toDate()
            posts.push(post)
        })
    }
    return {
        posts: posts
    }
}