<script lang="ts">
    import Datepicker from "praecox-datepicker";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { goto } from "$app/navigation";


    async function nextPage() {
        goto('../protected/work-time')
    }

</script>


<div class="flex flex-row">
    <div class="w-1/4 p-2">
        <PlannerSidebar />
    </div>

    <div class="flex flex-col items-center-3/4 p-2 w-full">

        <div class = "flex justify-center">
            <h1 class = "font-bold">What days would you like to work?</h1>
        </div>

        <div class = "flex justify-center">
            <p class = "text-gray-500 mb-7">Click a few dates</p>
        </div>

        <div class="flex justify-center mb-6">
            <Datepicker pickerRule = "free"/>
        </div>


        <div class = "flex justify-center mt-4">
            <button
            class="bg-black text-white py-2 px-4 rounded"
            on:click={nextPage}>
            Continue
            </button>
        </div>
    </div>
</div>