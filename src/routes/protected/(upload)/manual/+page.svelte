<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/components/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { MultiSelect, Label, NumberInput, Input } from "flowbite-svelte";
    import { get } from 'svelte/store';

    let successMessage = '';
    let errorMessage = '';

    // Uber Manual
    let uberData = {
        date: '',
        income: 0,
        tips: 0,
        expenses: 0,
        hoursSpent: 0,
        withholdings: 0,
        schedule: [],
    };

    // Rover Manual
    let roverData = {
        date: '',
        income: 0,
        tips: 0,
        expenses: 0,
        timeSpent: 0,
        platfromCut: 0,
        services: [],
        travelTime: 0,
    };

    // UpWork Manual
    let upworkData = {
        jobCategory: '',
        hourlyCharge: 0,
        hoursPerWeek: 0,
        clientHistory: '',
        experience: [],
        jobDuration: '',
        clientLocation: '',
    };

    const uberSchedule = [
        { value: "M", name: "Monday" },
        { value: "T", name: "Tuesday" },
        { value: "W", name: "Wednesday" },
        { value: "TH", name: "Thursday" },
        { value: "F", name: "Friday" },
        { value: "Sat", name: "Saturday" },
        { value: "Sun", name: "Sunday" },
    ];

    const roverServices = [
        { value: "boarding", name: "Boarding" },
        { value: "house sitting", name: "House Sitting" },
        { value: "drop-in", name: "Drop-In Visits" },
        { value: "day care", name: "Doggy Day Care" },
        { value: "dog walking", name: "Dog Walking" }
    ];

    const upworkExperience = [
        { value: "entry level", name: "Entry-Level" },
        { value: "intermediate level", name: "Intermediate-Level" },
        { value: "expert level", name: "Expert Level" },
    ];

    async function submitManual() {

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

            const manualDocRef = doc(db, 'users', user.uid, 'upload', 'manual');
            const subCollectionRef = collection(manualDocRef, collectionName);
            const newDocRef = doc(subCollectionRef); // this generates the random ID

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
    <UploadSidebar />
    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Manual Upload</h1>
        {#if $page.data.user?.platform == "uber"}
            <h2 class="text-xl font-semibold mb-4">Uber</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="text" bind:value={uberData.date} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Income</Label>
                    <NumberInput bind:value={uberData.income} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Tips</Label>
                    <NumberInput bind:value={uberData.tips} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expenses</Label>
                    <NumberInput bind:value={uberData.expenses} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Hours Spent</Label>
                    <NumberInput bind:value={uberData.hoursSpent} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Withholdings</Label>
                    <NumberInput bind:value={uberData.withholdings} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Weekly Driving Schedule</Label>
                    <MultiSelect items={uberSchedule} bind:value={uberData.schedule} class="mt-1" />
                </div>
            </div> 

        {:else if $page.data.user?.platform == "rover"}
            <h2 class="text-xl font-semibold mb-4">Rover</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="text" bind:value={roverData.date} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Income</Label>
                    <NumberInput bind:value={roverData.income} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expenses</Label>
                    <NumberInput bind:value={roverData.expenses} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Time Spent (Hours)</Label>
                    <NumberInput bind:value={roverData.timeSpent} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Tips</Label>
                    <NumberInput bind:value={roverData.tips} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Platform Cut</Label>
                    <NumberInput bind:value={roverData.platfromCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Services Offered</Label>
                    <MultiSelect items={roverServices} bind:value={roverData.services} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Time spent traveling to gig in minutes</Label>
                    <NumberInput bind:value={roverData.travelTime} class="mt-1" />
                </div>
            </div>

        {:else if $page.data.user?.platform == "upwork"}
            <h2 class="text-xl font-semibold mb-4">UpWork</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Job Category</Label>
                    <Input type="text" bind:value={upworkData.jobCategory} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Hourly Charge/ Fixed price</Label>
                    <NumberInput bind:value={upworkData.hourlyCharge} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Hours Per Week</Label>
                    <NumberInput bind:value={upworkData.hoursPerWeek} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Client History</Label>
                    <Input type="text" bind:value={upworkData.clientHistory} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Experience Level</Label>
                    <MultiSelect items={upworkExperience} bind:value={upworkData.experience} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Job Duration</Label>
                    <Input type="text" bind:value={upworkData.jobDuration} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Client Location</Label>
                    <Input type="text" bind:value={upworkData.clientLocation} class="mt-1" />
                </div>
            </div>
        {/if}
        <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={submitManual}>
                Submit
            </button>
            {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
            {/if}
            {#if errorMessage}
                <p class = "text-red-600 mt-2">{errorMessage}</p>
            {/if}
        </div>
    </div>
</div>
