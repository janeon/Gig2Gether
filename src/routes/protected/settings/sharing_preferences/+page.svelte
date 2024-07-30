<script lang="ts">
    import { page } from "$app/stores";
    import ToggleGroupItem from "$lib/components/ui/toggle-group/toggle-group-item.svelte";
    import ToggleGroup from "$lib/components/ui/toggle-group/toggle-group.svelte";
    import { db } from "$lib/firebase/client";
    import { collection, doc, getDoc, setDoc } from "firebase/firestore";
    import { Label, Select} from "flowbite-svelte";
    import { updateTitle } from "$lib/stores/title";
	import BlueButton from "$lib/components/BlueButton.svelte";
    import { onMount } from "svelte";

    updateTitle("Sharing Preferences");
    $: sharingData = []
    const sharingOptions = [
        { value: 'private', label: 'Private' },
        { value: 'workers', label: 'Workers' },
        { value: 'policymakers', label: 'Policymakers' },
        { value: 'advocates', label: 'Advocates' }
    ];

    let uploadData = {
        sharing: [],
        data_lifespan: "never",
        location_granularity: "1 mile"
    }

    $: sharePrivate = false
    const lifespanOptions = [
        {value: "never", name: "Never"},
        {value: "1 week", name: "After 1 Week"},
        {value: "1 month", name: "After 1 Month"},
        {value: "6 months", name: "After 6 Months"},
        {value: "1 year", name: "After 1 Year"}
    ]

    const locationOptions = [
        {value: "1 mile", name: "1 Mile Radius"},
        {value: "neighborhood", name: "Neighborhood"},
        {value: "city", name: "City"},
        {value: "county", name: "County"}
    ]

    async function submitPreferences() {
        uploadData.sharing = sharingData.includes('private') ? ['private'] : sharingData
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings")
        const docRef = doc(collectionRef, "sharing")
        setDoc(docRef, uploadData, {merge: true})
    }

    function changeSharingPreferencesSingle() {
        sharingData = []
        sharePrivate = false
    }

    function changeSharingPreferencesMultiple(value:String[]) {
        if (value.includes("private")) {
            sharePrivate = true
        }
        if (sharingData.includes(value)) {
            sharingData = sharingData.filter(item => item !== value);
        } else {
            sharingData = [...sharingData, value];
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
    <h2 class="font-medium mb-5">Who Would You Like to Share Your Worker Data With?</h2>
    {#if sharePrivate}
    <div class="space-y-2">
        <div class="flex justify-center">
          <ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
            <ToggleGroupItem value="private" data-state='on' class="font-bold">Private</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div class="flex justify-center space-x-2">
          <ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
            <ToggleGroupItem value="workers" disabled>Workers</ToggleGroupItem>
            <ToggleGroupItem value="policymakers" disabled>Policymakers</ToggleGroupItem>
            <ToggleGroupItem value="advocates" disabled>Advocates</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    {:else}
    <div class="space-y-2">
        <div class="flex justify-center">
          <ToggleGroup type="multiple" variant="outline" bind:value={sharingData} onValueChange={changeSharingPreferencesMultiple}>
            <ToggleGroupItem value={sharingOptions[0].value} class={sharingData.includes(sharingOptions[0].value) ? 'font-bold' : ''}>
              {sharingOptions[0].label}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div class="flex justify-center space-x-2">
          <ToggleGroup type="multiple" variant="outline" bind:value={sharingData} onValueChange={changeSharingPreferencesMultiple}>
            {#each sharingOptions.slice(1) as { value, label }}
              <ToggleGroupItem value={value} class={sharingData.includes(value) ? 'font-bold' : ''}>
                {label}
              </ToggleGroupItem>
            {/each}
          </ToggleGroup>
        </div>
      </div>
    {/if}
</div>

<div class = "py-5">
<BlueButton onclick={submitPreferences} buttonText="Submit"/>
</div>