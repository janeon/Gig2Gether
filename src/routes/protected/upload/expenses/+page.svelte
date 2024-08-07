<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import MultiSelect from 'svelte-multiselect';
    import { Label, NumberInput, Input, Textarea} from "flowbite-svelte";
    import { currentDate, currentTime } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    import IconNumberInput from '$lib/components/IconNumberInput.svelte';

    updateTitle(capitalize($page.data.user?.platform) + " Expenses");

    let successMessage = '';
    let errorMessage = '';

    let date = currentDate
    let time = currentTime
    // Uber Expenses
    let data = {
        date: new Date(),
        time: '',
        expenseType: [],
        description: '',
        amount: null,
        uid: $page.data.user.uid
    }

    const uberExpenseType = ["Car Wash/ Cleaning", "Gas", "Car Rental", "Other"]

    const roverExpenseType = ["Pet Supplies", "Transportation", "Other"]

    const upworkExpenseType = ["Software", "Office Supplies", "Insurance", "Other"]

    async function submitExpenses() {
        if (!data.amount) {
            errorMessage = "Please Enter an Expense Amount"
            return
        }
        errorMessage = ""
        const collectionRef = collection(db, "upload", "expenses", "entries")// Separate by gig work manual inputs?
        const docRef = doc(collectionRef)
        data.date = new Date(date)
        successMessage = "Input Submitted Successfully!"
        setDoc(docRef, data, { merge: true })
    }
    const dollar = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
    </svg>`;


</script>

<div class="flex flex-row">
    <div class="py-2 flex flex-col items-center w-full">

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Expense Date</Label>
                    <Input type="date" bind:value={date} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Expense Timestamp (time of transaction)</Label> 
                    <Input type="time" bind:value={time} class="mt-1" />
                </div>

                {#if $page.data.user?.platform == "uber"}
                    <div class="flex flex-col">
                        <Label>Expense Type</Label>
                        <MultiSelect options={uberExpenseType} bind:value={data.expenseType} 
                        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                        --sms-focus-border="2px solid blue"/>
                    </div>
                {:else if $page.data.user?.platform == "rover"}
                <div class="flex flex-col">
                    <Label>Expense Type</Label>
                    <MultiSelect options={roverExpenseType} bind:value={data.expenseType} 
                    style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                    --sms-focus-border="2px solid blue"/>
                </div>
                {:else if $page.data.user?.platform == "upwork"}
                    <div class="flex flex-col">
                        <Label>Expense Type</Label>
                        <MultiSelect options={upworkExpenseType} bind:value={data.expenseType} 
                        style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
                        --sms-focus-border="2px solid blue"/>
                    </div>
                {/if}


                <div class="flex flex-col">
                    <Label>Description</Label>
                    <Textarea bind:value={data.description} rows="4" 
                    class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"/>
                </div>

                <div class="flex flex-col">
                    <Label>Amount</Label>
                    <IconNumberInput bind:value={data.amount}
                      icon={dollar}
                      placeholder=""
                    />
                </div>
            </div>
        <!-- {:else if $page.data.user?.platform == "rover"}
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
        {/if} -->
        {#if successMessage}
            <p class="text-green-600 mt-2">{successMessage}</p>
            {/if}
            {#if errorMessage}
             <p class = "text-red-600 mt-2">{errorMessage}</p>
            {/if}
        <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={submitExpenses}>
                Submit
            </button>
        </div>
    </div>
</div>
