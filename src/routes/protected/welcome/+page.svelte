<script lang="ts">
    import { db } from "$lib/firebase/client";
    import { doc, setDoc, collection } from "firebase/firestore";
    import { goto } from '$app/navigation';
    import { page } from "$app/stores";
    import { Checkbox, Label, Select, NumberInput } from "flowbite-svelte";


    let uid: string;
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
            await setDoc(userRef,
            demographic_information,
             {merge: true})
        } catch (error) {
            console.log("There was an error saving your information")
        }
        goto('/protected')
    }


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

<h1>Welcome to the GigConnect data-sharing platform!</h1>
<h2>Before you get started, update your demographics and sharing preferences. You can change these at any time!</h2>

<div class = "flex flex-col w-1/2">
    <div>
    <div class = "p-8">
        <!-- TODO: why does h1 and h2 look the same? -->
        <h1>My Demographics</h1> 
        <div class="py-5">
            <Label>Age</Label>
            <NumberInput class = "border-2" bind:value={age} type = "number"/>
        </div>
        
        <div class="py-5">
            <Label>Gender</Label>
            <Select items={genders} bind:value={gender}/>
            <!-- <select bind:value={gender} class = "border-2">
                {#each genders as g}
                    <option value = {g}>
                        {g}
                    </option>
                {/each}
            </select> -->
        </div>
        
        <div class="py-5">
            <Label>Race</Label>
            <Select items={races} bind:value={race}/>
            <!-- <select bind:value={race} class = "border-2" placeholder = 'Please Select'>
                {#each races as r}
                    <option value = {r}>
                        {r}
                    </option>
                {/each}
            </select> -->
        </div>
        
        <div class="py-5">
            <Label>Hours spent on a W2 job (per week)</Label>
            <NumberInput class = "border-2" bind:value={w2Hours} type = "number"/>
        </div>
        
        <div class="py-5">
            <Label>Estimated hours spent on gigs not part of this platform</Label>
            <NumberInput class = "border-2" bind:value={otherGigHours} type = "number"/>
        </div>
        
        <button on:click = {submitDemographics}>Submit</button></div>
    </div>
    

    <div>
            <div class = "p-8">
                <h1>My Sharing Preferences</h1>
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
            </div>
        
    </div>
</div>
    

