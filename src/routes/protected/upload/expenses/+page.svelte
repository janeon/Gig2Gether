<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import MultiSelect from 'svelte-multiselect';
    import { Label, NumberInput, Input, Textarea} from "flowbite-svelte";
    import { currentDate } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    updateTitle(capitalize($page.data.user?.platform) + " Expenses");

    let successMessage = '';
    let errorMessage = '';

    // Uber Expenses
    let uberData = {
        date: currentDate,
        time: '',
        expenseType: [],
        description: '',
        amount: 0,
    }

    // Rover Expenses
    let roverData = {
        date: currentDate,
        time: '',
        expenseType: [],
        description: '',
        amount: 0,
    }

    // UpWork Expenses
    let upworkData = {
        date: currentDate,
        time: '',
        expenseType: [],
        description: '',
        amount: 0,
    }

    const uberExpenseType = ["Car Wash/ Cleaning", "Gas", "Car Rental", "Other"]

    const roverExpenseType = ["Pet Supplies", "Transportation", "Other"]

    const upworkExpenseType = ["Software", "Office Supplies", "Insurance", "Other"]

    async function submitExpenses() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "upload")
        const docRef = doc(collectionRef, "Expenses") // Separate by gig work manual inputs?
        successMessage = "Input Submitted Successfully!"

        if ($page.data.user?.platform == "uber") {
            setDoc(docRef, uberData, { merge: true })
            // successMessage = "Input Submitted Successfully!" - useful when roles work
        }
        else if ($page.data.user?.platform == "rover") {
            setDoc(docRef, roverData, { merge: true })
            // successMessage = "Input Submitted Successfully!"  - useful when roles work
        }
        else if ($page.data.user?.platform == "upwork") {
            setDoc(docRef, upworkData, { merge: true })
            // successMessage = "Input Submitted Successfully!"   - useful when roles work
        }
    }
</script>

<div class="flex flex-row">
    <div class="py-2 flex flex-col items-center w-full">
        {#if $page.data.user?.platform == "uber"}
            <h2 class="text-xl font-semibold mb-4">Uber</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="date" bind:value={uberData.date} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Time</Label>
                    <Input type="text" bind:value={uberData.time} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expense Type</Label>
                    <MultiSelect options={uberExpenseType} bind:value={uberData.expenseType} 
                    style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
                </div>

                <div class="flex flex-col">
                    <Label>Description</Label>
                    <Textarea bind:value={uberData.description} rows="4" 
                    class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"/>
                </div>

                <div class="flex flex-col">
                    <Label>Amount</Label>
                    <NumberInput bind:value={uberData.amount} class="mt-1" />
                </div>
            </div>
        {:else if $page.data.user?.platform == "rover"}
            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="date" bind:value={roverData.date} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Time</Label>
                    <Input type="text" bind:value={roverData.time} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expense Type</Label>
                    <MultiSelect options={roverExpenseType} bind:value={roverData.expenseType} 
                    style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
                </div>

                <div class="flex flex-col">
                    <Label>Description</Label>
                    <Textarea bind:value={roverData.description} rows="4" 
                    class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"/>
                </div>

                <div class="flex flex-col">
                    <Label>Amount</Label>
                    <NumberInput bind:value={roverData.amount} class="mt-1" />
                </div>
            </div>
        {:else if $page.data.user?.platform == "upwork"}
            <h2 class="text-xl font-semibold mb-4">UpWork</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="date" bind:value={upworkData.date} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Time</Label>
                    <Input type="text" bind:value={upworkData.time} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expense Type</Label>
                    <MultiSelect options={upworkExpenseType} bind:value={upworkData.expenseType} 
                    style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
                </div>

                <div class="flex flex-col">
                    <Label>Description</Label>
                    <Textarea bind:value={upworkData.description} rows="4" 
                    class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"/>
                </div>

                <div class="flex flex-col">
                    <Label>Amount</Label>
                    <NumberInput bind:value={upworkData.amount} class="mt-1" />
                </div>
            </div>
        {/if}
        <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={submitExpenses}>
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
