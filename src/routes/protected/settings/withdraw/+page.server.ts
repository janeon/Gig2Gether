import { db } from "$lib/firebase/client";
import type { Data } from "$lib/types.js";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export async function load({parent}) {
    let postedData = []
    let data = await parent()
    let snapshot = await getDocs(query(collection(db, 'stories', data.user.platform, "posts"), where('uid', "==", data.user.uid), orderBy("date", "desc")))
    snapshot.forEach((doc) => {
        let post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().date.toDate()
        post.type = "Story"
        post.title = doc.data().title
        post.id = doc.id
        postedData.push(post)
    })

    snapshot = await getDocs(query(collection(db, "upload", "expenses", "entries"), where('uid', "==", data.user.uid)))
    let num = 1
    snapshot.forEach((doc) => {
        let post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().date.toDate()
        post.type = "Expense"
        post.title = "Expense #"+num
        post.id = doc.id
        postedData.push(post)
        num++
    })

    snapshot = await getDocs(query(collection(db, "upload", "manual", "entries"), where('uid', "==", data.user.uid)))
    snapshot.forEach((doc) => {
        let post : Data = {date: new Date, type: "", title: "", id: ""}
        post.date = doc.data().date.toDate()
        post.type = "Manual"
        post.title = ""
        if ((typeof doc.data().type) === "object") {
            let title = ""
            for (let item of doc.data().type) {
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



    postedData = postedData.sort((a: Data, b: Data) =>{
        return (a.date.getTime() - b.date.getTime())
    })

    return {
        posts: postedData
    }
}