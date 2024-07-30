<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import MultiSelect from 'svelte-multiselect';
    import { Label, NumberInput, Input } from "flowbite-svelte";
    import us_cities from "$lib/us_cities.json";
    import { updateTitle } from "$lib/stores/title";
    import BlueButton from "$lib/components/BlueButton.svelte";
    import { capitalize } from "$lib/utils";
    import { currentDate } from "$lib/utils";
    
    updateTitle(`My ${capitalize($page.data.user?.platform)} Profile`);

    let uberData = {
        rating: 0, car: '', services: [], cities: [], dateJoined: currentDate, date: new Date()
    };
    let roverData = {
        rating: 0, pets: [], services: [], cities: [], dateJoined: currentDate, date: new Date()
    };

    const uberServices = ["UberX", "UberXL", "UberX Share", "UberX Comfort", "Uber Black", "Uber Black SUV", "WAV", "Uber Car Seat X", "Uber Green", "Uber Taxi"];
    const pets = ["Small Dog", "Medium Dog", "Giant Dog", "Cat", "Puppy"];
    const roverServices = ["Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"];

    async function submitProfile() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings");
        const docRef = doc(collectionRef, "profile");
        const data = $page.data.user?.platform === "uber" ? uberData : roverData;
        setDoc(docRef, data, { merge: true });
    }
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
    TODO
{/if}

<BlueButton onclick={submitProfile} buttonText="Submit"/>
