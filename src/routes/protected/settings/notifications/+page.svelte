<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { getDoc, updateDoc, doc } from "firebase/firestore";
    import { Checkbox, Select } from 'flowbite-svelte';
    import { onMount } from "svelte";

    let isChecked = false;

    const options = [
        { value: 'day', name: 'Everyday' },
        { value: 'week', name: 'Every Week' },
        { value: 'month', name: 'Every Month' }
    ];

    let selectedOption: string = '';
    let initialOption: string;
    $: dataChanged = selectedOption !== initialOption;

    async function load() {
        const user = $page.data.user;
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.notifications) {
                    isChecked = true;
                    initialOption = data.notifications;
                    selectedOption = data.notifications;
                    isChecked = true;
                }
            }
        }
    }

    const submitReminderPreference = async() => {
        await updateDoc(doc(db, 'users', $page.data.user.uid), {notifications: selectedOption})
        initialOption = selectedOption;
    }

    onMount(() => {
        load();
    });
</script>

<div class="py-5">
    <Checkbox bind:checked={isChecked} class="text-lg font-bold">
        Allow Reminder Notifications
    </Checkbox>

    {#if isChecked}
        <Select bind:value={selectedOption} class="mt-4">
            {#each options as option}
                <option value={option.value}>{option.name}</option>
            {/each}
        </Select>
    {/if}
    <div class="flex flex-col items-center">
    <button
        class={`flex-1 py-2 px-4 my-4 rounded ${dataChanged ? 'bg-black text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'} text-sm md:text-base lg:text-lg truncate`}
        on:click={submitReminderPreference}
        disabled={!dataChanged}>
        Submit
    </button>
    </div>
</div>
