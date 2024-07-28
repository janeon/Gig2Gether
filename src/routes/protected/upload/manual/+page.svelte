<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import MultiSelect from 'svelte-multiselect';
    import { Label, NumberInput, Input } from "flowbite-svelte";
    import { currentDate } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    updateTitle(capitalize($page.data.user?.platform) + " Manual Upload");

    let successMessage = '';
    let errorMessage = '';

    // Uber Manual
    let uberData = {
        date: currentDate,
        income: 0,
        tips: 0,
        expenses: 0,
        hoursSpent: 0,
        withholdings: 0,
        schedule: [],
    }

    // Rover Manual
    let roverData = {
        date: currentDate,
        income: 0,
        tips: 0,
        expenses: 0,
        timeSpent: 0,
        platfromCut: 0,
        services: [],
        travelTime: 0,
    }

    // UpWork Manual
    let upworkData = {
        jobCategory: '',
        hourlyCharge: 0,
        hoursPerWeek: 0,
        clientHistory: '',
        experience: [],
        jobDuration: '',
        clientLocation: '',
    }

    const uberSchedule = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const roverServices = [ "Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"]

    const upworkExperience = ["Entry-Level", "Intermediate-Level", "Expert Level"]

    async function submitManual() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "upload")
        const docRef = doc(collectionRef, "manual") // Separate by gig work manual inputs?
        successMessage = "Input Submitted Successfully!"
        if ($page.data.user?.platform == "uber") {
            setDoc(docRef, uberData, { merge: true })
        }
        else if ($page.data.user?.platform == "rover") {
            setDoc(docRef, roverData, { merge: true })
        }
        else if ($page.data.user?.platform == "upwork") {
            setDoc(docRef, upworkData, { merge: true })
        }
    }
</script>

<div class="flex flex-row">
    <div class="py-2 flex flex-col items-center w-full">
        {#if $page.data.user?.platform == "uber"}
            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="date" bind:value={uberData.date} class="mt-1" />
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
                    <MultiSelect options={uberSchedule} bind:value={uberData.schedule} 
                    style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
                </div>
            </div>

        {:else if $page.data.user?.platform == "rover"}
            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="date" bind:value={roverData.date} class="mt-1 min-h-5" />
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
                    <Label>Time Spent</Label>
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
                    <MultiSelect options={roverServices} bind:value={roverData.services} 
                    style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
                </div>

                <div class="flex flex-col">
                    <Label>Time spent traveling to gig in minutes</Label>
                    <NumberInput bind:value={roverData.travelTime} class="mt-1" />
                </div>
            </div>

        {:else if $page.data.user?.platform == "upwork"}
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
                    <MultiSelect options={upworkExperience} bind:value={upworkData.experience} style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
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
