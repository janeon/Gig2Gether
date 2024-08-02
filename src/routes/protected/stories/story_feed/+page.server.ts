import { db } from "$lib/firebase/client";
import { collection, getDoc, getDocs, orderBy, query, doc } from "firebase/firestore";

export async function load() {
    const platforms = ["rover", "uber", "upwork"]
    let posts = []
    for (let platform of platforms) {
        const snapshot = await getDocs(query(collection(db, 'stories', platform, "posts"), orderBy("date", "desc")))
        snapshot.forEach(async(item) => {
            let userRef = await getDoc(doc(db, 'users', item.data().uid))
            let post = item.data()
            post.date = post.date.toDate()
            post.id = item.id
            if (userRef.exists()) {
                post.username = userRef.data().username
            }
            posts.push(post)
        })
    }

    return {
        posts: posts
    }
}