<script lang="ts">
    import { authUser } from "$lib/authstore";
    import { db } from "$lib/firebase.client";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import {onMount} from 'svelte'
    import {getAuth, onAuthStateChanged} from 'firebase/auth';
    import { goto } from '$app/navigation';
    let uid: string;
    let age: number = 0;
    let gender: string = '';
    let genders = [
        "Male",
        "Female",
        "Non-Binary",
        "Other"
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
        'Other'
    ]
    let ethnicity : string = ''; // Haven't implemented
    let householdIncome : number = 0; //Unsure what this value should be
    let w2Hours : number = 0;
    let otherGigHours : number = 0;

    let dataToSetToStore : object;

    async function loadDemographics() {
        console.log(uid);
        const docRef = doc(db, "users", uid)
        console.log("here1")
        const docSnap = await getDoc(docRef);
        console.log("here2")
        if (!docSnap.exists()) {
            const userRef = doc(db, "users", uid);
            dataToSetToStore = {
                email: $authUser!.email,
                demographics: {}
            };
            await setDoc(userRef,
            dataToSetToStore), {merge: true}
        } else {
            const userData = docSnap.data();
            dataToSetToStore = userData;
        }

        authUser.update(curr => {
            return {
                ...curr,
                $authUser,
                data: dataToSetToStore,
                loading:false 
            }
        })
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
        console.log(demographic_information)
        try {
            const userRef = doc(db, "users", uid);
            const docSnap = await getDoc(userRef);
            if (!docSnap) {
                console.log("no snap")
            }
            console.log(userRef)
            await setDoc(userRef,
            {
            demographics: demographic_information
        },
             {merge: true})
        } catch (error) {
            console.log("There was an error saving your information")
        }
        
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
    <input class = "border-2" bind:value = {age} type = "number"/>
    <p>{age}</p>
</div>

<div class = "flex space-x-4">
    <h2>Gender</h2>
    <select bind:value = {gender} class = "border-2">
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
    <select bind:value = {race} class = "border-2" placeholder = 'Please Select'>
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
    <input class = "border-2" bind:value = {w2Hours} type = "number"/>
    <p>{w2Hours}</p>
</div>

<div class = "flex space-x-4">
    <h2>Estimated hours spent on gigs not part of this platform</h2>
    <input class = "border-2" bind:value = {otherGigHours} type = "number"/>
    <p>{otherGigHours}</p>
</div>

<button on:click = {submitDemographics}>Submit</button>