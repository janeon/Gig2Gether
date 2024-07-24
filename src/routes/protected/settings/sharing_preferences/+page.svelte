<script lang="ts">
    import { page } from "$app/stores";
    import ToggleGroupItem from "$lib/components/ui/toggle-group/toggle-group-item.svelte";
    import ToggleGroup from "$lib/components/ui/toggle-group/toggle-group.svelte";
    import { db } from "$lib/firebase/client";
    import { collection, doc, getDoc, setDoc } from "firebase/firestore";
    import { Label, Select} from "flowbite-svelte";
    import { onMount } from "svelte";

    $: sharingData = []
    let uploadData = {
        sharing: [],
        data_lifespan: "never",
        location_granularity: "1 mile"
    }

    $: sharePrivate = false
    const lifespanOptions = [
        {value: "never", name: "Never"},
        {value: "1 week", name: "1 Week"},
        {value: "1 month", name: "1 Month"},
        {value: "6 months", name: "6 Months"},
        {value: "1 year", name: "1 Year"}
    ]

    const locationOptions = [
        {value: "1 mile", name: "1 Mile Radius"},
        {value: "neighborhood", name: "Neighborhood"},
        {value: "city", name: "City"},
        {value: "county", name: "County"}
    ]

    async function submitPreferences() {
        if (sharingData.includes('private')) {
            uploadData.sharing = ['private']
        }
        else {
            uploadData.sharing = sharingData
        }
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings")
        const docRef = doc(collectionRef, "sharing")
        setDoc(docRef, uploadData, {merge: true})
    }

    function changeSharingPreferencesSingle() {
        sharingData = []
        sharePrivate = false
    }

    function changeSharingPreferencesMultiple(item:String[]) {
        if (item.includes("private")) {
            sharePrivate = true
        }
    }

    onMount(async() => {
        let collectionRef = collection(db, "users", $page.data.user.uid, "settings")
        let docRef = doc(collectionRef, "sharing")
        let docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            sharingData = docSnap.data().sharing
            uploadData.data_lifespan = docSnap.data().data_lifespan
            uploadData.location_granularity = docSnap.data().location_granularity
        }
        if (sharingData.includes('private')) {
            sharePrivate = true
        }
    })
</script>

<div class = "py-5">
    <Label>Who Would You Like to Share Your Worker Data With?</Label>
    {#if sharePrivate}
    <ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
        <ToggleGroupItem value="private" data-state='on'>Private</ToggleGroupItem>
        <ToggleGroupItem value="workers" disabled>Workers</ToggleGroupItem>
        <ToggleGroupItem value="policymakers" disabled>Policymakers</ToggleGroupItem>
        <ToggleGroupItem value="advocates" disabled>Advocates</ToggleGroupItem>
    </ToggleGroup>
    {:else}
    <ToggleGroup type="multiple" bind:value={sharingData} onValueChange={changeSharingPreferencesMultiple}>
        <ToggleGroupItem value="private" data-state='off'>Private</ToggleGroupItem>
        <ToggleGroupItem value="workers">Workers</ToggleGroupItem>
        <ToggleGroupItem value="policymakers">Policymakers</ToggleGroupItem>
        <ToggleGroupItem value="advocates">Advocates</ToggleGroupItem>
    </ToggleGroup>
    {/if}
</div>
<h1>Data Options</h1>
<div class = "py-5">
    <Label>Data Lifespan</Label>
    <Select bind:value={uploadData.data_lifespan} items={lifespanOptions}/>
</div>
<div>
    <Label>Location Granularity</Label>
    <Select bind:value={uploadData.location_granularity} items={locationOptions}/>
</div>
<button on:click = {submitPreferences} class="py-5">Submit</button>