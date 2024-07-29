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

    let age: number = 0;
    let gender: string = '';
    let genders = [
        {value: "male", name: "Male"},
        {value: "female", name: "Female"},
        {value: "non-binary", name: "Non-Binary"},
        {value: "other", name: "Other"},
        {value: null, name: "Do not wish to share"}
    ]
    let race: string = '';
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
    let ethnicity : string = ''; // Haven't implemented
    let householdIncome : number = 0; //Unsure what this value should be
    let w2Hours : number = 0;
    let otherGigHours : number = 0;

    let dataToSetToStore;

    // TODO: For prepopulating 
    async function loadDemographics() {
        const docRef = doc(db, "demographics", $page.data.user.uid)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            const userRef = doc(db, "demographics", $page.data.user.uid);
            dataToSetToStore = {
                // Should check whether we can have undefined values, not zeroes
                age: 0,
                race: "",
                gender: "",
                ethnicity: "",
                householdIncome: 0,
                w2Hours: 0,
                otherGigHours: 0
            };
            await setDoc(userRef,
            dataToSetToStore), {merge: true}
        } else {
            const userData = docSnap.data();
            dataToSetToStore = userData;
        }
        age = dataToSetToStore.age
        gender = dataToSetToStore.gender
        race = dataToSetToStore.race
        ethnicity = dataToSetToStore.ethnicity
        householdIncome = dataToSetToStore.householdIncome
        w2Hours = dataToSetToStore.w2Hours
        otherGigHours = dataToSetToStore.otherGigHours
    }
    async function submitDemographics() {
        let demographic_information = {
            age: age,
            race: race,
            gender: gender,
            ethnicity: ethnicity,
            householdIncome: householdIncome,
            w2Hours: w2Hours,
            otherGigHours: otherGigHours
        }
        try {
            const userRef = doc(db, "demographics", $page.data.user.uid);
            console.log("submitting", demographic_information);
            await setDoc(userRef,
            demographic_information,
             {merge: true})
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
            <NumberInput class = "border-2" bind:value={age} type = "number"/>
        </div>
        
        <div class="py-5">
            <Label>Gender</Label>
            <Select items={genders} bind:value={gender}/>
        </div>
        
        <div class="py-5">
            <Label>Race</Label>
            <Select items={races} bind:value={race}/>
        </div>
        
        <div class="py-5">
            <Label>Hours spent on a full time (W2) job per week</Label>
            <NumberInput class = "border-2" bind:value={w2Hours} type = "number"/>
        </div>
        
        <div class="py-5">
            <Label>Estimated hours spent on gigs not part of this platform</Label>
            <NumberInput class = "border-2" bind:value={otherGigHours} type = "number"/>
        </div>
        
        <BlueButton onclick={submitDemographics} buttonText="Submit"/>
