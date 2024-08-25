<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { page } from "$app/stores";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize, currentDate, currentTime, handleKeyDown, handleRatingsKeyDown, validateData } from "$lib/utils";
    import { profileStatus } from '$lib/stores/profileCompletion';

    import { db } from "$lib/firebase/client";
    import { collection, doc, getDoc, setDoc } from "firebase/firestore";
    
    import { Label, NumberInput, Input, Button, Textarea} from "flowbite-svelte";
    import MultiSelect from 'svelte-multiselect';
    import confetti from 'canvas-confetti';
    
    import us_cities from "$lib/us_cities.json";
	import { vehicleTypes } from "$lib/constants";
    
    updateTitle(`My ${capitalize($page.data.user?.platform)} Profile`);
    let successMessage = ""
    let uploading:boolean = false;

    let uberData = {
        rating: null, car: '', services: [], cities: [], dateJoined: currentDate, timestamp: currentTime, carSit: [], percentPassenger: null, gas: null, mileage: null, payments: null, healthcare: null, equipmentAmount: null, equipment: '', vehicle: []
    };
    let roverData = {
        rating: null, healthcare: null, healthcare_freq: '', other: '', platformCut: 20, equipment: null, pets: [], services: [], cities: [], transportation: [], times : [], dateJoined: currentDate, timestamp: new Date(), otherCost: null
    };
    let upworkData = {
        rating: null, services: [], platformCut: null, internetHome: null, healthcare:null, insurance:null, software: null, jss:null, hourlyCharge: null, dateJoined: currentDate, timestamp: currentTime, equipmentAmount: null, equipment: ''
    };

    const uberServices = ["UberX", "UberXL", "UberX VIP", "UberX Share", "UberX Comfort", "Uber Premier", "WAV", "Uber Car Seat X", "Uber Green", "Uber Taxi", "Uber Pet", "UberX Priority"];
    const pets = ["Small Dog", "Medium Dog", "Giant Dog", "Cat", "Puppy"];
    const roverServices = ["Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"];
    const upworkCategories = ["Development & IT", "Design & Creative", "Finance & Accounting", "Admin & Customer Support", "Engineering & Architecture", "Legal", "Sales & Marketing", "Writing & Translation"];
    const roverTransportationTypes = ["Bus", "Drive", "Uber", "Walk"];
    const roverTimesTypes = ["Morning", "Afternoon", "Evening", "Night"];
    const uberCar = ["Own", "Rent/Lease/Financing","Other"];

    let initialData:any = $page.data.user?.platform === "upwork"? upworkData: $page.data.user?.platform === "uber" ? uberData : roverData

    function updateValue(valid:boolean = false) {
        const color = valid ? "green" : "red";
        profileStatus.set({isCompleted: color });
    }

    // for prepopulating
    async function loadProfile() {
        console.log("Loading profile")
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings");
        const docRef = doc(collectionRef, "profile");
        const docSnap = await getDoc(docRef);
        let data;
        if (!docSnap.exists()) {
            data = $page.data.user?.platform === "upwork"? upworkData: $page.data.user?.platform === "uber" ? uberData : roverData
            await setDoc(docRef, data), {merge: true}
        } else {
            data = docSnap.data();
        }
        const valid = validateData(data)
        console.log("Valid", valid)
        updateValue(valid);
        initialData = { ...data };
        switch ($page.data.user?.platform) {
            case "uber":
                uberData = data;
                break;
            case "rover":
                roverData = data;
                break;
            case "upwork":
                upworkData = data;
                break;
            default:
                break;
        }
    }

    $: dataChanged = JSON.stringify($page.data.user?.platform === "upwork"? upworkData: $page.data.user?.platform === "uber" ? uberData : roverData) !== JSON.stringify(initialData);


    function triggerConfetti() {
        // Trigger confetti
        confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
        });
    }
    async function submitProfile() {
        uploading = true;
        try {
            const collectionRef = collection(db, "users", $page.data.user?.uid, "settings");
            const docRef = doc(collectionRef, "profile");
            const data = $page.data.user?.platform === "uber" ? uberData : roverData;
            await setDoc(docRef, data, { merge: true });
            successMessage = "Profile Updated!"
            // Update initial data after successful submission
            initialData = {...data}
        }
        catch (error) {
            uploading = false;
            console.error("Error updating profile", error);
        }

        if (dataChanged) {
            const valid = validateData($page.data.user?.platform === "upwork"? upworkData: $page.data.user?.platform === "uber" ? uberData : roverData)
            updateValue(valid);
            
            if (valid) 
                triggerConfetti();
        }
        uploading = false;
    }

    let status;

    const unsubscribe = profileStatus.subscribe(value => {
            const status = value.isCompleted;
        });
        
    onMount(() => {
        loadProfile();
    });

    onDestroy(() => {
        unsubscribe();
  });
</script>
<div class="flex flex-row">
    <div class="py-2 flex flex-col items-center w-full">
        <div class="w-full max-w-md space-y-5">
{#if $page.data.user?.platform === "uber"}

    <div class="flex flex-col">
        <Label>Uber Rating</Label>
        <NumberInput on:keydown={handleRatingsKeyDown} type="number" bind:value={uberData.rating} max=5/>
    
        <Label class="mt-4">Date of Joining Uber</Label>
        <Input type="date" size="md" bind:value={uberData.dateJoined} />

        <Label class="mt-4">Services Provided</Label>
        <MultiSelect options={uberServices} bind:selected={uberData.services}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />

        <Label class="mt-4">Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={uberData.cities}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />

        <Label class="mt-4">Car Driven</Label>
        <Input bind:value={uberData.car} />

        <Label class="mt-4">What is you car situation?</Label>
        <MultiSelect options={uberCar} bind:value={uberData.carSit} 
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"/>
    
        <Label class="mt-4">Vehicle Type</Label>
        <MultiSelect options={vehicleTypes} bind:value={uberData.vehicle} 
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"/>
    
        <Label class="mt-4">Estimated % time with passengers (% non-idle time)</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={uberData.percentPassenger} class="mt-1" />
    
        <Label class="mt-4">Estimated Price of gas</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={uberData.gas} class="mt-1" />

        <Label class="mt-4">Your car's mileage</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={uberData.mileage} class="mt-1" />
    
        <Label class="mt-4">Monthly car/ rental payments</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={uberData.payments} class="mt-1" />
    
        <Label class="mt-4">Healthcare</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={uberData.healthcare} class="mt-1" />
    

        <Label class="mt-4">Other expenses/equipments</Label>
        <Textarea type="text" bind:value={uberData.equipment} class="mt-1" />
        
        <Label class="mt-4">Cost of other equipment/expenses</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={uberData.equipmentAmount} class="mt-1" />
    
    </div>

{:else if $page.data.user?.platform === "rover"}
    <div class="flex flex-col">
        <Label class="mt-4">Rover Rating</Label>
        <NumberInput on:keydown={handleRatingsKeyDown} type="number" bind:value={roverData.rating} max=5/>

        <Label class="mt-4">Pets Accepted</Label>
        <MultiSelect options={pets} bind:selected={roverData.pets}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />
    
        <Label class="mt-4">Services Offered</Label>
        <MultiSelect options={roverServices} bind:selected={roverData.services}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />

        <Label class="mt-4">How do you transit to work?</Label>
        <MultiSelect options={roverTransportationTypes} bind:value={roverData.transportation} 
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"/>

        <Label class="mt-4">Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={roverData.cities}
            style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
            --sms-focus-border="2px solid blue"
        />

        <Label class="mt-4">Date of Joining Rover</Label>
        <Input type="date" bind:value={roverData.dateJoined} />
    
        <Label class="mt-4">What times do you prefer to work?</Label>
        <MultiSelect options={roverTimesTypes} bind:value={roverData.times} 
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
        --sms-focus-border="2px solid blue"/>
    
        <Label class="mt-4">Healthcare Costs</Label>
        <NumberInput on:keydown={handleKeyDown} type="number" bind:value={roverData.healthcare} on:keydown={handleKeyDown} />

        <Label class="mt-4">Frequency of Healthcare Charge</Label>
        <Input type="text" bind:value={roverData.healthcare_freq} placeholder="Annual, quarterly, monthly ..."/>
    
        <Label class="mt-4">Equipment Costs</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={roverData.equipment} class="mt-1" placeholder="For leashes, bikes, etc"/>
    
        <Label class="mt-4">Platform's Cut (%)</Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={roverData.platformCut} class="mt-1"/>
    
        <Label class="mt-4">Any other costs we missed?</Label>
        <Textarea type="text" bind:value={roverData.other} class="mt-1" />

        <Label class="mt-4">Cost of Missed Expenses </Label>
        <NumberInput on:keydown={handleKeyDown} bind:value={roverData.otherCost} class="mt-1"/>
    </div>
{:else if $page.data.user?.platform === "upwork"}
<div class="flex flex-col">
    <Label>Upwork Rating</Label>
    <NumberInput type="number" bind:value={upworkData.rating} on:keydown={handleRatingsKeyDown} />

    <Label>Work Categories</Label>
    <MultiSelect options={upworkCategories} bind:selected={upworkData.services}
        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
        --sms-focus-border="2px solid blue"
    />

    <Label>Job Success Score</Label>
    <NumberInput on:keydown={handleKeyDown} type="number" bind:value={upworkData.jss} on:keydown={handleKeyDown} />
</div>

<div class="flex flex-col">
    <Label>Hourly Charge</Label>
    <NumberInput on:keydown={handleKeyDown} type="number" bind:value={upworkData.hourlyCharge} on:keydown={handleKeyDown} />
</div>

<div class="flex flex-col">
    <Label>Platform's cut/ Fees</Label>
    <NumberInput on:keydown={handleKeyDown} bind:value={upworkData.platformCut} class="mt-1" />
</div>

<div class="flex flex-col">
    <Label>Software costs</Label>
    <NumberInput on:keydown={handleKeyDown} type="text" bind:value={upworkData.software} class="mt-1" />
</div>

<div class="flex flex-col">
    <Label>Healthcare</Label>
    <NumberInput on:keydown={handleKeyDown} bind:value={upworkData.healthcare} class="mt-1" />
</div>

<div class="flex flex-col">
    <Label>Insurance expenses</Label>
    <NumberInput on:keydown={handleKeyDown} bind:value={upworkData.insurance} class="mt-1" />
</div>

<div class="flex flex-col">
    <Label>Home Internet</Label>
    <NumberInput on:keydown={handleKeyDown} bind:value={upworkData.internetHome} class="mt-1" />
</div>

<div class="flex flex-col">
    <Label>Other Equipment/Expenses</Label>
    <NumberInput on:keydown={handleKeyDown} bind:value={upworkData.equipmentAmount} class="mt-1" />
    <Label>Describe expense</Label>
    <Input type="text" bind:value={upworkData.equipment} class="mt-1" />
</div>

<div class="flex flex-col">
    <Label>Date of Joining Upwork</Label>
    <Input type="date" bind:value={upworkData.dateJoined} />
</div>
{/if}


    {#if uploading}
    <div class="flex justify-center">
    <Button 
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    on:click={submitProfile}>
    <i class="fa-solid fa-spinner loadingSpinner animate-spin" />
    </Button>
    </div>
    
    {:else}
    <div class="flex justify-center mt-2">
    <p class="text-green-600 m-2">{successMessage}</p>
    </div>
    <div class="flex flex-col items-center gap-4 mt-6">
    <button
        class={`flex-1 py-2 px-5 rounded ${dataChanged ? 'bg-black text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'} text-sm md:text-base lg:text-lg truncate`}
        on:click={submitProfile}
        disabled={!dataChanged}>
        Update
    </button>
    </div>
    {/if}
</div>
</div>
</div>
