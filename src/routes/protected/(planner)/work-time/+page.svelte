<script lang="ts">
    import { goto } from "$app/navigation";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { writable } from 'svelte/store';

    // Store for selected dates
    let selectedDates = writable([]);

    async function continueClick () {
        goto('/protected/work-results')
    }

    async function backClick () {
        goto('/protected/work-day')
    }
</script>

<div class="flex flex-row">
    <div class="w-1/4 p-2">
        <PlannerSidebar />
    </div>
    <div class="w-3/4 flex flex-col items-start p-2">
        <h1 class="text-lg font-medium mb-1">When would you want to work?</h1>

        
    

        <div class = "flex mt-5">
            <button 
            class = "bg-black text-white py-2 px-4 rounded mr-8"
            on:click={backClick}
            >
            Back
        </button>
            <button 
            class = "bg-black text-white py-2 px-4 rounded"
            on:click={continueClick}
            >
            Continue
        </button>
        </div>

    </div>
</div>
