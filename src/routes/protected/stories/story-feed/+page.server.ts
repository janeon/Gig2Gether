import { db } from "$lib/firebase/client";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function load() {
    const platforms = ["rover", "uber", "upwork"]
    let posts = []
    for (let platform of platforms) {
        const snapshot = await getDocs(query(collection(db, 'stories', platform, "posts"), orderBy("date", "desc")))
        snapshot.forEach((doc) => {
            let post = doc.data()
            post.date = post.date.toDate()
            post.id = doc.id
            posts.push(post)
        })
    }
    return {
        posts: posts
    }
}