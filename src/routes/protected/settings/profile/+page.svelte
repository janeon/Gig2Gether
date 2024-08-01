<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, getDoc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input } from "flowbite-svelte";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize, currentDate } from "$lib/utils";
	import { onMount } from "svelte";
    import MultiSelect from 'svelte-multiselect';
    import BlueButton from "$lib/components/BlueButton.svelte";
    import us_cities from "$lib/us_cities.json";
    
    updateTitle(`My ${capitalize($page.data.user?.platform)} Profile`);

    let uberData = {
        rating: 0, car: '', services: [], cities: [], dateJoined: currentDate, date: new Date()
    };
    let roverData = {
        rating: 0, pets: [], services: [], cities: [], dateJoined: currentDate, date: new Date()
    };
    let upworkData = {
        rating: 0, services: [], jss:0, hourlyCharge: 0, dateJoined: currentDate
    };

    const uberServices = ["UberX", "UberXL", "UberX Share", "UberX Comfort", "Uber Black", "Uber Black SUV", "WAV", "Uber Car Seat X", "Uber Green", "Uber Taxi"];
    const pets = ["Small Dog", "Medium Dog", "Giant Dog", "Cat", "Puppy"];
    const roverServices = ["Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"];
    const upworkCategories = ["Development & IT", "Design & Creative", "Finance & Accounting", "Admin & Customer Support", "Engineering & Architecture", "Legal", "Sales & Marketing", "Writing & Translation"];


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
    <div class="py-5">
        <Label>Rover Rating</Label>
        <NumberInput type="number" bind:value={roverData.rating} />
    </div>

    <div class="py-5">
        <Label>Pets Accepted</Label>
        <MultiSelect options={pets} bind:selected={roverData.pets}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-5">
        <Label>Services Offered</Label>
        <MultiSelect options={roverServices} bind:selected={roverData.services}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-5">
        <Label>Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={roverData.cities}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    </div>

    <div class="py-5">
        <Label>Date of Joining Rover</Label>
        <Input type="date" bind:value={roverData.dateJoined} />
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

<BlueButton onclick={submitProfile} buttonText="Submit"/>
