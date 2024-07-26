<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { MultiSelect, Label, NumberInput, Input } from "flowbite-svelte";

    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    updateTitle(capitalize($page.data.user?.platform) + " Expenses");

    let successMessage = '';
    let errorMessage = '';

    // Uber Expenses
    let uberData = {
        date: '',
        time: '',
        expenseType: [],
        description: '',
        amount: 0,
    }

    // Rover Expenses
    let roverData = {
        date: '',
        time: '',
        expenseType: [],
        description: '',
        amount: 0,
    }

    // UpWork Expenses
    let upworkData = {
        date: '',
        time: '',
        expenseType: [],
        description: '',
        amount: 0,
    }

    const uberExpenseType = [
        { value: "cleaning", name: "Car Wash/ Cleaning" },
        { value: "gas", name: "Gas" },
        { value: "rental", name: "Car Rental" },
        { value: "other", name: "Other" },
    ]

    const roverExpenseType = [
        { value: "supplies", name: "Pet Supplies" },
        { value: "transport", name: "Transportation" },
        { value: "other", name: "Other" },
    ]

    const upworkExpenseType = [
        { value: "software", name: "Software" },
        { value: "supplies", name: "Office Supplies" },
        { value: "insurance", name: "Insurance" },
        { value: "other", name: "Other" },
    ]

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
                    <MultiSelect items={uberExpenseType} bind:value={uberData.expenseType} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Description</Label>
                    <textarea bind:value={uberData.description} rows="4" class="mt-1 border border-gray-300 rounded px-3 py-2"></textarea>
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
                    <MultiSelect items={roverExpenseType} bind:value={roverData.expenseType} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Description</Label>
                    <textarea bind:value={roverData.description} rows="4" class="mt-1 border border-gray-300 rounded px-3 py-2"></textarea>
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
                    <MultiSelect items={upworkExpenseType} bind:value={upworkData.expenseType} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Description</Label>
                    <textarea bind:value={upworkData.description} rows="4" class="mt-1 border border-gray-300 rounded px-3 py-2"></textarea>
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
