<script lang="ts">
    import { db } from "$lib/firebase/client";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import {onMount} from 'svelte'
    import { goto } from '$app/navigation';
    import { page } from "$app/stores";
    import { Label, NumberInput, Select } from "flowbite-svelte";
    import { updateTitle } from "$lib/stores/title";
    import BlueButton from "$lib/components/BlueButton.svelte";
    
    updateTitle("My Demographics");

    let genders = [
        {value: "male", name: "Male"},
        {value: "female", name: "Female"},
        {value: "non-binary", name: "Non-Binary"},
        {value: "other", name: "Other"},
        {value: null, name: "Do not wish to share"}
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
    // Should check whether we can have undefined values, not zeroes
    let dataToSetToStore = { age: 0, gender: '', race: '', ethnicity: '', householdIncome: 0, w2Hours: 0, otherGigHours: 0 };

    // TODO: For prepopulating 
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

    }
    async function submitDemographics() {
        try {
            const userRef = doc(db, "demographics", $page.data.user.uid);
            await setDoc(userRef, dataToSetToStore, {merge: true})
        } catch (error) {
            console.log("There was an error saving your information")
        }
        goto('/protected')
    }

    onMount(() => {
        loadDemographics()
    })

</script>
        <div class="py-5">
            <Label>Age</Label>
            <NumberInput class = "border-2" bind:value={dataToSetToStore.age} type = "number"/>
        </div>
        
        <div class="py-5">
            <Label>Gender</Label>
            <Select items={genders} bind:value={dataToSetToStore.gender}/>
        </div>
        
        <div class="py-5">
            <Label>Race</Label>
            <Select items={races} bind:value={dataToSetToStore.race}/>
        </div>
        
        <!-- <div class="py-5">
            <Label>Hours spent on a full time (W2) job per week</Label>
            <NumberInput class = "border-2" bind:value={dataToSetToStore.w2Hours} type = "number"/>
        </div> -->
        
        <!-- <div class="py-5">
            <Label>Estimated hours spent on gigs not part of this platform</Label>
            <NumberInput class = "border-2" bind:value={dataToSetToStore.otherGigHours} type = "number"/>
        </div> -->
        
        <BlueButton onclick={submitDemographics} buttonText="Submit"/>
