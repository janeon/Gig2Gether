<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import Sidebar from "$lib/components/SettingsSidebar.svelte";
    import { stringLength } from "@firebase/util";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Checkbox, Label, Select } from "flowbite-svelte";

    let uploadData = {
        sharing: [],
        data_lifespan: "",
        location_granularity: ""
    }
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
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings")
        const docRef = doc(collectionRef, "sharing")
        setDoc(docRef, uploadData, {merge: true})
    }
</script>

<div class = "py-5">
    <Label>Who Would You Like to Share Your Worker Data With?</Label>
    <Checkbox bind:group={uploadData.sharing} choices={sharingOptions} />
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