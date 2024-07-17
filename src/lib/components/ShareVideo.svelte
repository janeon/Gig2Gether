<script lang="ts">
    import { Input, MultiSelect } from "flowbite-svelte";
    import Button from "./ui/button/button.svelte";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import { db, storage } from "$lib/firebase/client";
    import { addDoc, collection } from "firebase/firestore";
    import { page } from "$app/stores";

    export let title = "Untitled Video Post"
    export let description = ""
    let video: File
    export let url = ""
    export let tagSelection : boolean
    // export let tags:string[] = []
    // export let platform = ""

    const uberTags = [
        {value: "safety", name: "Safety"},
        {value: "fair pay", name: "Fair Pay"},
        {value: "discrimination", name: "Discrimination"},
        {value: "ratings", name: "Ratings"},
        {value: "working time", name: "Working Time"},
        {value: "care-giving", name: "Care-giving"},
        {value: "stress", name: "Stress (e.g. from precarity)"},
        {value: "understanding algorithms", name: "Understanding Algorithms"},
        {value: "other", name: "Other"}
    ]

    const roverTags = [
        {value: "safety", name: "Safety"},
        {value: "fair pay", name: "Fair Pay"},
        {value: "discrimination", name: "Discrimination"},
        {value: "ratings", name: "Ratings"},
        {value: "working time", name: "Working Time"},
        {value: "care-giving", name: "Care-giving"},
        {value: "stress", name: "Stress (e.g. from precarity)"},
        {value: "understanding algorithms", name: "Understanding Algorithms"},
        {value: "other", name: "Other"}
    ]

    async function getURL() {
        if (video) {
            try {
                const storageRef = ref(storage, 'stories/strategy/'+$page.data.user.uid+'/'+video.name)
                const result = await uploadBytes(storageRef, video)
                url = await getDownloadURL(result.ref)
                console.log(url)
            } catch (error) {
                console.log("error with video upload")
            }
        }
        tagSelection = true
    }
</script>

<Input placeholder="Untitled Video Post" bind:value={title}/>
<Input placeholder="Write a description here" bind:value={description}/>
<input type="file" id="video" accept = "video/*" on:change={(e) =>{video = e?.target?.files[0]}}/>
<label for="video">Upload video</label>
<Button on:click={getURL}>Add Tags</Button>