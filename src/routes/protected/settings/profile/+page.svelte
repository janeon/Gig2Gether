<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, getDoc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input, MultiSelect as FBMS } from "flowbite-svelte";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize, currentDate } from "$lib/utils";
	import { onMount } from "svelte";
    import MultiSelect from 'svelte-multiselect';
    import BlueButton from "$lib/components/BlueButton.svelte";
    import us_cities from "$lib/us_cities.json";
    
    updateTitle(`My ${capitalize($page.data.user?.platform)} Profile`);
    let successMessage = ""

    let uberData = {
        rating: null, car: '', services: [], cities: [], dateJoined: currentDate, timestamp: new Date()
    };
    let roverData = {
        rating: null, healthcare: null, healthcare_freq: '', other: '', platformCut: 20, equipment: null, pets: [], services: [], cities: [], transportation: [], times : [], dateJoined: currentDate, timestamp: new Date()
    };
    let upworkData = {
        rating: null, services: [], jss:null, hourlyCharge: null, dateJoined: currentDate, timestamp: new Date()
    };

    const uberServices = ["UberX", "UberXL", "UberX Share", "UberX Comfort", "Uber Black", "Uber Black SUV", "WAV", "Uber Car Seat X", "Uber Green", "Uber Taxi"];
    const pets = ["Small Dog", "Medium Dog", "Giant Dog", "Cat", "Puppy"];
    const roverServices = ["Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"];
    const upworkCategories = ["Development & IT", "Design & Creative", "Finance & Accounting", "Admin & Customer Support", "Engineering & Architecture", "Legal", "Sales & Marketing", "Writing & Translation"];
    const roverTransportationTypes = ["Bus", "Drive", "Uber", "Walk"];
    const roverTimesTypes = ["Morning", "Afternoon", "Evening", "Night"];

    // for prepopulating
    async function loadProfile() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings");
        const docRef = doc(collectionRef, "profile");
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log("No profile found");
        } else {
            const data = docSnap.data();
            if ($page.data.user?.platform === "uber") {
                uberData = data;
            } else if ($page.data.user?.platform === "rover") {
                roverData = data;
            } else if ($page.data.user?.platform === "upwork") {
                upworkData = data;
            }
        }
    }

    async function submitProfile() {
        try {
            const collectionRef = collection(db, "users", $page.data.user?.uid, "settings");
            const docRef = doc(collectionRef, "profile");
            const data = $page.data.user?.platform === "uber" ? uberData : roverData;
            await setDoc(docRef, data, { merge: true });
            successMessage = "Profile Updated!"
        }
        catch (error) {
            console.error("Error updating profile", error);
        }
    }

    onMount(() => {
        loadProfile();
    });
</script>

{#if $page.data.user?.platform === "uber"}
    <div class="py-5">
        <Label>Uber Rating</Label>
        <NumberInput type="number" bind:value={uberData.rating} />
    </div>

    <div class="py-5">
        <Label>Car Driven</Label>
        <Input bind:value={uberData.car} />
    </div>

    <div class="py-5">
        <Label>Services Provided</Label>
        <MultiSelect options={uberServices} bind:selected={uberData.services}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-5">
        <Label>Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={uberData.cities}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-5">
        <Label>Date of Joining Uber</Label>
        <Input type="date" size="md" bind:value={uberData.dateJoined} />
    </div>

{:else if $page.data.user?.platform === "rover"}
    <div class="py-3">
        <Label>Rover Rating</Label>
        <NumberInput type="number" bind:value={roverData.rating} />
    </div>

    <div class="py-3">
        <Label>Pets Accepted</Label>
        <MultiSelect options={pets} bind:selected={roverData.pets}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-3">
        <Label>Services Offered</Label>
        <MultiSelect options={roverServices} bind:selected={roverData.services}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-3">
        <Label>How do you transit to work?</Label>
        <MultiSelect options={roverTransportationTypes} bind:value={roverData.transportation} 
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"/>
    </div>

    <div class="py-3">
        <Label>Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={roverData.cities}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-3">
        <Label>Date of Joining Rover</Label>
        <Input type="date" bind:value={roverData.dateJoined} />
    </div>

    <div class="py-3">
        <Label>What times do you prefer to work?</Label>
        <MultiSelect options={roverTimesTypes} bind:value={roverData.times} 
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
        --sms-focus-border="2px solid blue"/>
    </div>

    <div class="py-3">
        <Label>Healthcare Costs</Label>
        <NumberInput type="number" bind:value={roverData.healthcare} />
    </div>

    <div class="py-3">
        <Label>Frequency of Healthcare Charge</Label>
        <Input type="text" bind:value={roverData.healthcare_freq} placeholder="Annually, quarterly ..."/>
    </div>

    <div class="py-3">
        <Label>Equipment Costs</Label>
        <NumberInput bind:value={roverData.equipment} class="mt-1" placeholder="For leashes, bikes, etc"/>
    </div>

    <div class="py-3">
        <Label>Platform's Cut (%)</Label>
        <NumberInput bind:value={roverData.platformCut} class="mt-1"/>
    </div>

    <div class="py-3">
        <Label>Any other costs we missed?</Label>
        <Input type="text" bind:value={roverData.other} class="mt-1"/>
    </div>
{:else if $page.data.user?.platform === "upwork"}

<div class="py-5">
    <Label>Upwork Rating</Label>
    <NumberInput type="number" bind:value={upworkData.rating} />
</div>

<div class="py-5">
    <Label>Work Categories</Label>
    <MultiSelect options={upworkCategories} bind:selected={roverData.services}
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
        --sms-focus-border="2px solid blue"
    />
</div>

<div class="py-5">
    <Label>Job Success Score</Label>
    <NumberInput type="number" bind:value={upworkData.jss} />
</div>

<div class="py-5">
    <Label>Hourly Charge</Label>
    <NumberInput type="number" bind:value={upworkData.hourlyCharge} />
</div>

<div class="py-5">
    <Label>Date of Joining Upwork</Label>
    <Input type="date" bind:value={upworkData.dateJoined} />
</div>
{/if}

<div class="flex justify-center">
    <p class="text-green-600 m-2">{successMessage}</p>
        <BlueButton onclick={submitProfile} buttonText="Submit"/>
</div>
