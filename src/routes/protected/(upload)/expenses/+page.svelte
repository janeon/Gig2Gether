<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/components/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { MultiSelect, Label, NumberInput, Input } from "flowbite-svelte";
    import { get } from "svelte/store";


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

                const manualDocRef = doc(db, 'users', user.uid, 'upload', 'expenses');
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
        <h1 class="text-2xl font-bold mb-6">Expenses</h1>
        {#if $page.data.user?.platform == "uber"}
            <h2 class="text-xl font-semibold mb-4">Uber</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="text" bind:value={uberData.date} class="mt-1" />
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
            <h2 class="text-xl font-semibold mb-4">Rover</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Date</Label>
                    <Input type="text" bind:value={roverData.date} class="mt-1" />
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
                    <Input type="text" bind:value={upworkData.date} class="mt-1" />
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
