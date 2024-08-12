import { db } from "$lib/firebase/client";
import type { Data } from "$lib/types.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function load({parent}) {
    let postedData = []
    const data = await parent()
    let snapshot = await getDocs(query(collection(db, 'stories', data.user.platform, "posts"), where('uid', "==", data.user.uid)))
    snapshot.forEach((doc) => {
        const post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().date.toDate()
        post.type = "Story"
        post.title = doc.data().title
        post.id = doc.id
        postedData.push(post)
    })

    snapshot = await getDocs(query(collection(db, "upload", "expenses", data.user.platform), where('uid', "==", data.user.uid)))
    let num = 1
    snapshot.forEach((doc) => {
        const post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().timestamp.toDate()
        post.type = "Expense"
        post.title = "Expense #"+num
        post.id = doc.id
        postedData.push(post)
        num++
    })

    snapshot = await getDocs(query(collection(db, "upload", "manual", data.user.platform), where('uid', "==", data.user.uid)))
    snapshot.forEach((doc) => {
        const post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().timestamp.toDate()
        post.type = "Manual"
        post.title = ""
        if ((typeof doc.data().type) === "object") {
            let title = ""
            for (const item of doc.data().type) {
                title += item+", "
            }
            post.title = title.substring(0, title.length - 2)
        }
        else {
            post.title = doc.data().type
        }
        post.id = doc.id
        postedData.push(post)
        num++
    })

    snapshot = await getDocs(query(collection(db, "upload", "csv", "entries"), where('uid', "==", data.user.uid)))
    snapshot.forEach((doc) => {
        const post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().date.toDate()
        post.type = "CSV"
        post.title = doc.data().title
        post.id = doc.id
        postedData.push(post)
    })

    postedData = postedData.sort((a: Data, b: Data) =>{
        return (a.date.getTime() - b.date.getTime())
    })

    return {
        posts: postedData
    }
}