<script lang="ts">
    import { db } from "$lib/firebase/client";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import {onMount} from 'svelte'
    import { page } from "$app/stores";
    import { Label, NumberInput, Select } from "flowbite-svelte";
    import { updateTitle } from "$lib/stores/title";
    
    updateTitle("My Demographics");

    let genders = [
        {value: "male", name: "Male"},
        {value: "female", name: "Female"},
        {value: "non-binary", name: "Non-Binary"},
        {value: "other", name: "Other"},
        {value: null, name: "Do not wish to disclose"}
    ]
    
    let races = [
        {value: "american indian/alaska", name: 'American Indian or Alaska Native'},
        {value: "asian", name: 'Asian'},
        {value: "black/african american", name: 'Black or African American'},
        {value: "hispanic/latino", name: 'Hispanic or Latino'}, //Question on whether to include?
        {value: "mena", name: 'Middle Eastern or North African'},
        {value: "hawaiian/pi", name: 'Native Hawaiian or Pacific Islander'},
        {value: "white", name: 'White'},
        {value: "multi", name: 'Multi-Racial'},
        {value: "other", name: 'Other'},
        {value: null, name: "Do not wish to share"}
    ]
    let dataToSetToStore:any = { age: null, gender: '', race: ''};
    let initialData:any;

    $: dataChanged = JSON.stringify(dataToSetToStore) !== JSON.stringify(initialData);

    // For prepopulating 
    async function loadDemographics() {
        const docRef = doc(db, "demographics", $page.data.user.uid)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            const userRef = doc(db, "demographics", $page.data.user.uid);
            await setDoc(userRef,
            dataToSetToStore), {merge: true}
        } else {
            const userData = docSnap.data();
            dataToSetToStore = userData;
        }
        initialData = { ...dataToSetToStore };
    }
    
    async function submitDemographics() {
        try {
            const userRef = doc(db, "demographics", $page.data.user.uid);
            await setDoc(userRef, dataToSetToStore, {merge: true})
            // Update initial data after successful submission
            initialData = {...dataToSetToStore}
        } catch (error) {
            console.log("There was an error saving your information")
        }
    }

    onMount(() => {
        loadDemographics()
    })

</script>
        <div class="flex flex-col">
            <Label>Age</Label>
            <NumberInput bind:value={dataToSetToStore.age} type = "number"/>

            <Label class="mt-4">Gender</Label>
            <Select items={genders} bind:value={dataToSetToStore.gender}/>

            <Label class="mt-4">Race</Label>
            <Select items={races} bind:value={dataToSetToStore.race}/>
        </div>

        <div class="flex justify-center mt-4">
            <button
            class={`flex-1 py-2 rounded ${dataChanged ? 'bg-black text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'} text-sm md:text-base lg:text-lg truncate`}
            on:click={submitDemographics}>
            Submit
            </button>
        </div>
