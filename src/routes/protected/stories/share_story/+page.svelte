<script lang="ts">
    import { page } from "$app/stores";
    import { Checkbox, Radio } from "flowbite-svelte";
    import {Button} from "$lib/components/ui/button";
    import { addDoc, collection } from "firebase/firestore";
    import { db, storage } from "$lib/firebase/client";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import {Input} from '$lib/components/ui/input'
    import {Label} from "$lib/components/ui/label";
    let tags : string[] = []
    let video: File
    let title : string = "Untitled Story"
    let description : string = ""
    let url : string
    let type : string
    $: error = false
    let sharingSettings = $page.data.sharingSettings
    let postSharing = []
    let errorMessage : string = " "

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

    const upworkTags = [
        {value: "scams", label: "Scams"},
        {value: "getting started", label: "Getting Started"},
        {value: "algorithm functionality", label: "Algorithm Functionality"},
        {value: "customers", label: "Customers"},
        {value: "stress", label: "Stress (e.g. from precarity)"},
        {value: "fair pay", label: "Fair Pay"},
        {value: "discrimination", label: "Discrimination"},
        {value: "working time", label: "Working Time"},
        {value: "ratings", label: "Ratings"},
        {value: "other", label: "Other"}
    ]

    async function uploadContent() {
        if (!type) {
            errorMessage = "Please select a type"
            return
        }
        else {
            errorMessage = " "
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

            if (url) {
                try {
                await addDoc(collection(db, 'stories', type, $page.data.user.platform), {
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
                    console.log(type)
                    console.log(title, description, $page.data.user.uid, tags)
                    await addDoc(collection(db, 'stories', type, $page.data.user.platform), {
                    title,
                    description,
                    uid: $page.data.user.uid,
                    date: new Date(),
                    tags

                })
            } catch {
                console.log("error with adding document here")
                }
            }
        }
    }

</script>
<p class="text-red-500">{errorMessage}</p>
<div class="flex flex-row space-x-2">
    <Label> Story Type: </Label>
    <Radio name="type" bind:group={type} value="issue" >Issue</Radio>
    <Radio name="type" bind:group={type} value="strategy" >Strategy</Radio>
</div>
<h1>What tags would you like to use?</h1>
<p>Tags make your content more easily searchable!</p>
{#if $page.data.user.platform == "rover"}
<Checkbox bind:group={tags} choices={roverTags}/>
{:else if $page.data.user.platform == "uber"}
<Checkbox bind:group={tags} choices={uberTags}/>
{:else if $page.data.user.platform == "upwork"}
<Checkbox bind:group={tags} choices={upworkTags}/>
{/if}

<Input placeholder="Untitled Video Post" bind:value={title}/>
<Input placeholder="Write a description here" bind:value={description}/>
<input type="file" id="video" accept = "video/* image/*" on:change={(e) =>{video = e?.target?.files[0]}}/>
<!-- <Checkbox bind:group={postSharing} choices={sharingSettings}/> -->
<div>
    <Button on:click={uploadContent}>Upload Content</Button>
</div>
