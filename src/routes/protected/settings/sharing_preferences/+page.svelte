<script lang="ts">
    import { page } from "$app/stores";
    import ToggleGroupItem from "$lib/components/ui/toggle-group/toggle-group-item.svelte";
    import ToggleGroup from "$lib/components/ui/toggle-group/toggle-group.svelte";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, Select, Toggle } from "flowbite-svelte";

    $: sharingData = []
    let uploadData = {
        sharing: [],
        data_lifespan: "",
        location_granularity: ""
    }

    $: sharePrivate = false
    $: privateString = ''
    const sharingOptions = [{
        value : "me", label: "Me, myself, and I"
    },
    {
        value: "workers", label: "Other workers"
    },
    {
        value: "researchers", label: "Researchers"
    },
    {
        value: "policymakers", label: "Policymakers"
    }
    ]

    const lifespanOptions = [
        {value: "never", label: "Never"},
        {value: "1 week", label: "1 Week"},
        {value: "1 month", label: "1 Month"},
        {value: "6 months", label: "6 Months"},
        {value: "1 year", label: "1 Year"}
    ]

    const locationOptions = [
        {value: "1 mile", label: "1 Mile Radius"},
        {value: "neighborhood", label: "Neighborhood"},
        {value: "city", label: "City"},
        {value: "county", label: "County"}
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
</script>

<div class = "py-5">
    <Label>Who Would You Like to Share Your Worker Data With?</Label>
    {#if sharePrivate}
    <ToggleGroup type="single" bind:value={privateString} onValueChange={changeSharingPreferencesSingle}>
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
    <!-- <ToggleGroup type="multiple" bind:value={sharingData}>
        <ToggleGroupItem value="private" on:change={changeSharingPreferences}>Private</ToggleGroupItem>
    </ToggleGroup> -->
        <!-- {#if sharePrivate}
            <Toggle class="py-2" color={"red"} on:click={changeSharingPreferences}>Private</Toggle>
            <Toggle class="py-2" color={"red"} disabled>Workers</Toggle>
            <Toggle class="py-2" color={"red"} disabled>Policymakers</Toggle>
            <Toggle class="py-2" color={"red"} disabled>Advocates</Toggle>
        {:else}
            <Toggle class="py-2" color={"red"} on:click={changeSharingPreferences}>Private</Toggle>
            <Toggle class="py-2" color={"red"} value={"workers"} group={uploadData.sharing}>Workers</Toggle>
            <Toggle class="py-2" color={"red"} value={"policymakers"} group={uploadData.sharing}>Policymakers</Toggle>
            <Toggle class="py-2" color={"red"} value={"advocates"} group={uploadData.sharing}>Advocates</Toggle>
        {/if} -->
        <p>{sharingData} HERE</p>
    <!-- <Checkbox bind:group={uploadData.sharing} choices={sharingOptions} /> -->
</div>
<h1>Data Options</h1>
<div class = "py-5">
    <Label>Data Lifespan</Label>
    <Select bind:value={uploadData.data_lifespan} choices={lifespanOptions}/>
</div>
<div>
    <Label>Location Granularity</Label>
    <Select bind:value={uploadData.location_granularity} choices={locationOptions}/>
</div>
<button on:click = {submitPreferences} class="py-5">Submit</button>