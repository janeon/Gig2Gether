<script lang="ts">
    import { page } from "$app/stores";
    import { Checkbox, Radio } from "flowbite-svelte";
    import ToggleGroupItem from "$lib/components/ui/toggle-group/toggle-group-item.svelte";
    import ToggleGroup from "$lib/components/ui/toggle-group/toggle-group.svelte";
    import {Button} from "$lib/components/ui/button";
    import { addDoc, collection, doc, getDoc } from "firebase/firestore";
    import { db, storage } from "$lib/firebase/client";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import {Input} from '$lib/components/ui/input'
    import {Label} from "$lib/components/ui/label";
    import { onMount } from "svelte";
    let tags : string[] = []
    let video: File
    let title : string = "Untitled Story"
    let description : string = ""
    let url : string
    let type : string
    $: postSharing = []
    $: sharePrivate = false
    $: errorMessageType = " "
    $: errorMessageTags = " "
    $: errorMessageSharing = " "

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
        //error catching
        if (!type) {
            errorMessageType = "Please select a type"
        }
        else {
            errorMessageType = ""
        }

        if (tags.length == 0) {
            errorMessageTags = "Please select at least one tag"
        }
        else {
            errorMessageTags = ""
        }

        if (postSharing.length == 0) {
            errorMessageSharing = "Please choose a sharing preference"
        }
        else {
            errorMessageSharing = ""
        }

        if (errorMessageSharing != "" || errorMessageTags != "" || errorMessageType != "") {
            return
        }

        if (postSharing.includes('private')) {
            postSharing = ['private']
        }
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
            await addDoc(collection(db, 'stories', $page.data.user.platform, "posts"), {
            type,
            title,
            description,
            uid: $page.data.user.uid,
            url,
            date: new Date(),
            tags,
            likes: [],
            platform: $page.data.user.platform,
            sharing: postSharing

        })
        } catch {
            console.log("error with adding document")
        }
        }
        else {
            try {
                console.log(type)
                console.log(title, description, $page.data.user.uid, tags)
                await addDoc(collection(db, 'stories', $page.data.user.platform, "posts"), {
                type,
                title,
                description,
                uid: $page.data.user.uid,
                date: new Date(),
                likes: [],
                tags,
                platform: $page.data.user.platform,
                sharing: postSharing

            })
        } catch {
            console.log("error with adding document here")
            }
        }
    }

    function changeSharingPreferencesSingle() {
        postSharing = []
        sharePrivate = false
    }

    function changeSharingPreferencesMultiple(item:String[]) {
        if (item.includes("private")) {
            sharePrivate = true
        }
    }

    onMount(async()=>{
        let collectionRef = collection(db, "users", $page.data.user.uid, "settings")
        let docRef = doc(collectionRef, "sharing")
        let docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            // for (let option of docSnap.data().sharing) {
            //     .push({value: option, label: (option.charAt(0).toUpperCase() + option.slice(1))})
            // }
            postSharing = docSnap.data().sharing
        }
        if (postSharing.includes('private')) {
            sharePrivate = true
        }
    })

</script>
<p class="text-red-500">{errorMessageType}</p>
<div class="flex flex-row space-x-2">
    <Label> Story Type: </Label>
    <Radio name="type" bind:group={type} value="issue" >Issue</Radio>
    <Radio name="type" bind:group={type} value="strategy" >Strategy</Radio>
</div>
<h1>What tags would you like to use?</h1>
<p>Tags make your content more easily searchable!</p>
<p class="text-red-500">{errorMessageTags}</p>
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
<div class = "py-5">
    <Label>Who Would You Like to Share Your Worker Data With?</Label>
    <p class="text-red-500">{errorMessageSharing}</p>
    {#if sharePrivate}
    <ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
        <ToggleGroupItem value="private" data-state='on'>Private</ToggleGroupItem>
        <ToggleGroupItem value="workers" disabled>Workers</ToggleGroupItem>
        <ToggleGroupItem value="policymakers" disabled>Policymakers</ToggleGroupItem>
        <ToggleGroupItem value="advocates" disabled>Advocates</ToggleGroupItem>
    </ToggleGroup>
    {:else}
    <ToggleGroup type="multiple" bind:value={postSharing} onValueChange={changeSharingPreferencesMultiple}>
        <ToggleGroupItem value="private" data-state='off'>Private</ToggleGroupItem>
        <ToggleGroupItem value="workers">Workers</ToggleGroupItem>
        <ToggleGroupItem value="policymakers">Policymakers</ToggleGroupItem>
        <ToggleGroupItem value="advocates">Advocates</ToggleGroupItem>
    </ToggleGroup>
    {/if}
</div>
<div>
    <Button on:click={uploadContent}>Upload Content</Button>
</div>
