<script lang="ts">
    import { db } from "$lib/firebase/client";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import { onMount } from 'svelte'
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { goto } from '$app/navigation';

    let uid: string;
    let age: number = 0;
    let gender: string = '';
    let genders = [
        "Male",
        "Female",
        "Non-Binary",
        "Other",
        "Do not wish to share"
    ]
    let race: string = '';
    let races = [
        'American Indian or Alaska Native',
        'Asian',
        'Black or African American',
        'Hispanic or Latino', //Question on whether to include?
        'Middle Eastern or North African',
        'Native Hawaiian or Pacific Islander',
        'White',
        'Multi-Racial',
        'Other',
        "Do not wish to share"
    ]
    let ethnicity : string = ''; // Haven't implemented
    let householdIncome : number = 0; //Unsure what this value should be
    let w2Hours : number = 0;
    let otherGigHours : number = 0;

    let dataToSetToStore;

    // TODO: For prepopulating 
    async function loadDemographics() {
        const docRef = doc(db, "demographics", uid)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            const userRef = doc(db, "demographics", uid);
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
            const userRef = doc(db, "demographics", uid);
            await setDoc(userRef,
            demographic_information,
             {merge: true})
        } catch (error) {
            console.log("There was an error saving your information")
        }
        goto('/protected')
        
    }

    onMount(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                uid = user.uid
                loadDemographics();
            }
            else {
                goto('/login')
            }
        })

    })
</script>
<div class = "flex space-x-4">
    <h2>Age</h2>
    <input class = "border-2" bind:value={age} type = "number"/>
    <p>{age}</p>
</div>

<div class = "flex space-x-4">
    <h2>Gender</h2>
    <select bind:value={gender} class = "border-2">
        {#each genders as g}
            <option value = {g}>
                {g}
            </option>
        {/each}
    </select>
    <p>{gender}</p>
</div>

<div class = "flex space-x-4">
    <h2>Race</h2>
    <select bind:value={race} class = "border-2" placeholder = 'Please Select'>
        {#each races as r}
            <option value = {r}>
                {r}
            </option>
        {/each}
    </select>
    <p>{race}</p>
</div>

<div class = "flex space-x-4">
    <h2>Hours spent on a W2 job (per week)</h2>
    <input class = "border-2" bind:value={w2Hours} type = "number"/>
    <p>{w2Hours}</p>
</div>

<div class = "flex space-x-4">
    <h2>Estimated hours spent on gigs not part of this platform</h2>
    <input class = "border-2" bind:value={otherGigHours} type = "number"/>
    <p>{otherGigHours}</p>
</div>

<button on:click = {submitDemographics}>Submit</button>