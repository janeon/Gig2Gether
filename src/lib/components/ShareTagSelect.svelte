<script lang="ts">
    import { page } from "$app/stores";
    import { Checkbox } from "flowbite-svelte";
    import Button from "./ui/button/button.svelte";
    import { addDoc, collection, doc } from "firebase/firestore";
    import { db } from "$lib/firebase/client";
    export let tags : string[]
    export let platform : string
    export let title : string
    export let description : string
    export let url : string
    export let tagSelection : boolean
    export let type : string

    const uberTags = [
        {value: "safety", label: "Safety"},
        {value: "fair pay", label: "Fair Pay"},
        {value: "discrimination", label: "Discrimination"},
        {value: "ratings", label: "Ratings"},
        {value: "working time", label: "Working Time"},
        {value: "care-giving", label: "Care-giving"},
        {value: "stress", label: "Stress (e.g. from precarity)"},
        {value: "understanding algorithms", label: "Understanding Algorithms"},
        {value: "other", label: "Other"}
    ]

    const roverTags = [
        {value: "safety", label: "Safety"},
        {value: "fair pay", label: "Fair Pay"},
        {value: "discrimination", label: "Discrimination"},
        {value: "ratings", label: "Ratings"},
        {value: "working time", label: "Working Time"},
        {value: "care-giving", label: "Care-giving"},
        {value: "stress", label: "Stress (e.g. from precarity)"},
        {value: "understanding algorithms", label: "Understanding Algorithms"},
        {value: "other", label: "Other"}
    ]

    async function uploadContent() {
        if (url) {
            try {
            await addDoc(collection(db, 'stories', type, platform), {
            title,
            description,
            uid: $page.data.user.uid,
            url,
            date: new Date(),
            tags

        })
        } catch {
            console.log("error with adding document")
        }
        }
        else {
            try {
                await addDoc(collection(db, 'stories', type, platform), {
                title,
                description,
                uid: $page.data.user.uid,
                date: new Date(),
                tags

            })
        } catch {
            console.log("error with adding document")
            }
        }
        tagSelection = false
    }
</script>

<h1>What issue would you like to share?</h1>
{#if platform == "rover"}
<Checkbox bind:group={tags} choices={roverTags}/>
{:else if platform == "uber"}
<Checkbox bind:group={tags} choices={uberTags}/>
{/if}
<Button on:click={uploadContent}>Upload Content</Button>