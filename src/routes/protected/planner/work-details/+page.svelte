<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { MultiSelect, Label, NumberInput, Input } from "flowbite-svelte";
    import { get } from 'svelte/store';
    import { goto } from "$app/navigation";

    let successMessage = '';
    let errorMessage = '';

    async function nextPage() {
        goto('./work-breakdown')
    }
    async function previousPage () {
        goto('./work-time')
    }

    // Uber Details
    let uberData = {
        carSit: [],
        vehicleType: '',
        percentPassenger: 0,
        platformCut: 0,
        gas: 0,
        mileage: 0,
        payments: 0,
        miscellanenous: 0,
        healthcare: 0,
    };

    // Rover Details
    let roverData = {
        transportation: [],
        times: [],
        platformCut: 0,
        internetHome: 0,
        gas: 0,
        equipment: 0,
        miscellanenous: 0,
        healthcare: 0,
        damageCost: 0,
        pet: [],
    };

    // UpWork Details
    let upworkData = {
        platformCut: 0,
        internetHome: 0,
        equipment: 0,
        miscellanenous: 0,
        healthcare: 0,
        insurance: 0,
        software: 0,
    };

    const uberCar = [
        { value: "Lease", name: "Financing/ Lease own" },
        { value: "Own", name: "Own" },
    ];

    const roverTransportationTypes = [
        { value: "bus", name: "Bus" },
        { value: "drive", name: "Drive" },
        { value: "uber", name: "Uber" },
        { value: "walk", name: "Walk" },
    ];

    const roverTimesTypes = [
        { value: "8am-9am", name: "8am-9am" },
        { value: "9am-10am", name: "9am-10am" },
        { value: "10am-11am", name: "10am-11am" },
        { value: "11am-12pm", name: "11am-12pm" },
        { value: "12pm-1pm", name: "12pm-1pm" },
        { value: "1pm-2pm", name: "1pm-2pm" },
        { value: "2pm-3pm", name: "2pm-3pm" },
        { value: "3pm-4pm", name: "3pm-4pm" },
        { value: "4pm-5pm", name: "4pm-5pm" },
        { value: "5pm-6pm", name: "5pm-6pm" },
        { value: "6pm-7pm", name: "6pm-7pm" },
        { value: "7pm-8pm", name: "7pm-8pm" },
        { value: "8pm-after", name: "8pm-after" },
    ];

    const roverPetType = [
        { value: "puppy", name: "Small Dog (0-15bs)" },
        { value: "mediumDog", name: "Medium Dog (16-40lbs)" },
        { value: "largeDog", name: "Large Dog (41-100lbs)" },
        { value: "giantDog", name: "Giant Dog (101+lbs)" },
        { value: "cat", name: "Cat" },
    ];

    async function submitDetails() {

        const user = get(page).data.user;

        try {
            const user = get(page).data.user;
            if (!user) {
                errorMessage = 'User not authenticated';
                return;
            }

            const platform = user.platform;
            let data = {};
            let collectionName = '';

            data = roverData;
            collectionName = 'rover';
            
            if (platform === 'uber') {
                data = uberData;
                collectionName = 'uber';
            } else if (platform === 'rover') {
                data = roverData;
                collectionName = 'rover';
            } else if (platform === 'upwork') {
                data = upworkData;
                collectionName = 'upwork';
            } else {
                errorMessage = 'Invalid platform';
                return;
            }

            const manualDocRef = doc(db, 'users', user.uid, 'upload', 'plannerDetails');
            const subCollectionRef = collection(manualDocRef, collectionName);
            const newDocRef = doc(subCollectionRef);

            await setDoc(newDocRef, data);
            successMessage = 'Input Submitted Successfully!';
            errorMessage = '';
        } catch (error) {
            console.error('Error submitting data:', error);
            successMessage = '';
            errorMessage = 'Failed to submit data';
        }
    }
</script>

<div class="flex flex-row">
    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Other Variables</h1>
        {#if $page.data.user?.platform == "uber"}
            <h2 class="text-xl font-semibold mb-4">Uber</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>What is you car situation?</Label>
                    <MultiSelect items={uberCar} type="text" bind:value={uberData.carSit} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Vehicle Type</Label>
                    <Input type = "text" bind:value={uberData.vehicleType} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>% of time with passengers</Label>
                    <NumberInput bind:value={uberData.percentPassenger} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Platform's cut</Label>
                    <NumberInput bind:value={uberData.platformCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Price of gas</Label>
                    <NumberInput bind:value={uberData.gas} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Your car's mileage</Label>
                    <NumberInput bind:value={uberData.mileage} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Monthly car/ rental payments</Label>
                    <NumberInput bind:value={uberData.payments} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Healthcare</Label>
                    <NumberInput bind:value={uberData.healthcare} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Miscellaneous expenses</Label>
                    <NumberInput bind:value={uberData.miscellanenous} class="mt-1" />
                </div>

            </div> 

        {:else if $page.data.user?.platform == "rover"}
            <h2 class="text-xl font-semibold mb-4">Rover</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>What is your transportation type?</Label>
                    <MultiSelect items={roverTransportationTypes} type="text" bind:value={roverData.transportation} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>What are your preffered times?</Label>
                    <MultiSelect items={roverTimesTypes} bind:value={roverData.times} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Platform's cut</Label>
                    <NumberInput bind:value={roverData.platformCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Price of gas</Label>
                    <NumberInput bind:value={roverData.gas} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Equipment Purchase</Label>
                    <NumberInput bind:value={roverData.equipment} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Miscellaneous espenses</Label>
                    <NumberInput bind:value={roverData.miscellanenous} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Healthcare</Label>
                    <NumberInput bind:value={roverData.healthcare} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Costs of damage</Label>
                    <NumberInput bind:value={roverData.damageCost} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Costs of damage</Label>
                    <MultiSelect items={roverPetType} bind:value={roverData.pet} class="mt-1" />
                </div>
            </div>

        {:else if $page.data.user?.platform == "upwork"}
            <h2 class="text-xl font-semibold mb-4">UpWork</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Platform's cut/ Fees</Label>
                    <NumberInput bind:value={upworkData.platformCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Internet/Home</Label>
                    <NumberInput bind:value={upworkData.internetHome} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Equipment Purcase</Label>
                    <NumberInput bind:value={upworkData.equipment} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Miscellaneous expenses</Label>
                    <Input type="text" bind:value={upworkData.miscellanenous} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Healthcare</Label>
                    <NumberInput bind:value={upworkData.healthcare} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Insurance expenses</Label>
                    <NumberInput bind:value={upworkData.insurance} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Software expenses</Label>
                    <NumberInput type="text" bind:value={upworkData.software} class="mt-1" />
                </div>
            </div>
        {/if}
        <div class="flex justify-center mt-4">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={submitDetails}>
                Submit
            </button>
            {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
            {/if}
            {#if errorMessage}
                <p class = "text-red-600 mt-2">{errorMessage}</p>
            {/if}
        </div>

        <div class = "justify-center mt-4">
            <button
            class="bg-black text-white py-2 px-4 rounded"
            on:click={previousPage}>
            Previous
            </button>
            <button
            class="bg-black text-white py-2 px-4 rounded"
            on:click={nextPage}>
            Continue
            </button>
        </div>
    </div>
</div>
