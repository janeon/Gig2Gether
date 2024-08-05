<script lang="ts">
    import { goto } from "$app/navigation";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Datepicker from "praecox-datepicker";



    let dates = [];
    // let isDone = false;


    async function continueClick () {
        goto('/protected/work-time')
    }

  
</script>

<div class = "flex flex-row">

    <div class = "w-1/4 p-2">
        <PlannerSidebar/>
    </div>

    <div class = "flex flex-col w-3/4 p-2 items-center">
        <h1 class = "font-bold text-2xl">What days would you like to work?</h1>
        <h1 class = "text-m">click a few dates</h1>
        <div class  = "flex justify-center mt-7">
            <Datepicker pickerRule = "free" class = "h-110 w-110" />
            <!-- {#if isDone = true }
                
            {/if} -->
        </div>

        <div class = "flex mt-5">
            <button 
            class = "bg-black text-white py-2 px-4 rounded"
            on:click={continueClick}
            >
            Continue
        </button>
        </div>
    </div>

</div>