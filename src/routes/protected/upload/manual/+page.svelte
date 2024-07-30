<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import MultiSelect from 'svelte-multiselect';
    import { Label, NumberInput, Input, P } from "flowbite-svelte";
    import { currentDate } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    import { error } from "@sveltejs/kit";
    updateTitle(capitalize($page.data.user?.platform) + " Manual Upload");

    let successMessage = '';
    let errorMessage = '';
    let timeError = ''
    let typeError = ''
    let incomeError = ''

    let date = currentDate
    let end_date = currentDate
    // Uber Manual
    let uberData = {
        date: new Date(),
        income: null,
        tips: null,
        expenses: null,
        hoursSpent: null,
        withholdings: null,
        schedule: [],
        uid: $page.data.user.uid
    }

    // Rover Manual
    let roverData = {
        date: new Date(), //Called date for same values for other uploads (but is start date)
        end_date: new Date(),
        income: null,
        tips: null,
        expenses: null,
        timeSpent: null,
        platfromCut: null,
        type: [],
        travelTime: null,
        uid: $page.data.user.uid
    }

    // UpWork Manual
    let upworkData = {
        date: new Date(), //Called date for same values for other uploads (but is start date)
        end_date: new Date(),
        type: '',
        hourlyCharge: null,
        hoursPerWeek: null,
        clientHistory: '',
        experience: [],
        jobDuration: '',
        clientLocation: '',
        uid: $page.data.user.uid
    }

    const uberSchedule = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const roverServices = [ "Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"]

    const upworkExperience = ["Entry-Level", "Intermediate-Level", "Expert Level"]

    async function submitManual() {
        // if ($page.data.user?.platform == "uber") {
        //     if (uberData.income == 0) {
        //         incomeError = "Please Input Income" 
        //     }
        //     else {
        //         incomeError = ""
        //     }
        //     if (uberData.hoursSpent == 0) {
        //         timeError = "Please Add Hours Spent"
        //     }
        //     else {
        //         timeError = ""
        //     }
        //     if (uberData.hoursSpent == 0) {
        //         timeError = "Please Add Hours Spent"
        //     }
        //     else {
        //         timeError = ""
        //     }
        // }
        if ($page.data.user?.platform == "rover") {
            if (!roverData.timeSpent) {
                console.log('time')
                timeError = "Please Add Hours Spent"
            }
            else {
                timeError = ""
            }
            if (!roverData.income) {
                console.log('income')
                incomeError = "Please Add Income"
            }
            else {
                incomeError = ""
            }
            if (!roverData.type.length) {
                console.log('s')
                typeError = "Please Add Service(s)"
            }
            else {
                typeError = ""
            }
            if (typeError !== "" || incomeError !== "" || timeError !== "") {
                console.log('here')
                return
            }
        }
        else if ($page.data.user?.platform === "upwork") {
            if (!upworkData.hoursPerWeek) {
                timeError = "Please Add Hours Spent per Week"
            }
            else {
                timeError = ""
            }
            if (!upworkData.hourlyCharge) {
                incomeError = "Please Add Hourly Rate"
            }
            else {
                incomeError = ""
            }
            if (upworkData.type === "") {
                typeError = "Please Add Job Category"
            }
            else {
                typeError = ""
            }
            if (typeError == "" || incomeError == "" || timeError == "") {
                console.log('here')
                return
            }
        }
        const collectionRef = collection(db, "upload", "manual", "entries")
        const docRef = doc(collectionRef) // Separate by gig work manual inputs?
        successMessage = "Input Submitted Successfully!"
        if ($page.data.user?.platform == "uber") {
            uberData.date = new Date(date)
            setDoc(docRef, uberData, { merge: true })
        }
        else if ($page.data.user?.platform == "rover") {
            roverData.date = new Date(date)
            roverData.end_date = new Date(end_date)
            setDoc(docRef, roverData, { merge: true })
        }
        else if ($page.data.user?.platform == "upwork") {
            upworkData.date = new Date(date)
            upworkData.end_date = new Date(end_date)
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
                    <Input type="date" bind:value={date} class="mt-1" />
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
                    <Label>Start Date</Label>
                    <Input type="date" bind:value={date} class="mt-1 min-h-5" />
                </div>
                <div class="flex flex-col">
                    <Label>End Date</Label>
                    <Input type="date" bind:value={end_date} class="mt-1 min-h-5" />
                </div>

                <div class="flex flex-col">
                    <Label>Income</Label>
                    <p class="text-red-500">{incomeError}</p>
                    <NumberInput bind:value={roverData.income} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expenses</Label>
                    <NumberInput bind:value={roverData.expenses} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Time Spent</Label>
                    <p class="text-red-500">{timeError}</p>
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
                    <p class="text-red-500">{typeError}</p>
                    <MultiSelect options={roverServices} bind:value={roverData.type} 
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
                    <Label>Start Date</Label>
                    <Input type="date" bind:value={date} class="mt-1 min-h-5" />
                </div>

                <div class="flex flex-col">
                    <Label>End Date</Label>
                    <Input type="date" bind:value={end_date} class="mt-1 min-h-5" />
                </div>
                
                <div class="flex flex-col">
                    <Label>Job Category</Label>
                    <p class="text-red-500">{typeError}</p>
                    <Input type="text" bind:value={upworkData.type} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Hourly Charge/ Fixed price</Label>
                    <p class="text-red-500">{incomeError}</p>
                    <NumberInput bind:value={upworkData.hourlyCharge} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Hours Per Week</Label>
                    <p class="text-red-500">{timeError}</p>
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
        {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
             {/if}
            {#if errorMessage}
                <p class = "text-red-600 mt-2">{errorMessage}</p>
            {/if}
        <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={submitManual}>
                Submit
            </button>
        </div>
    </div>
</div>
