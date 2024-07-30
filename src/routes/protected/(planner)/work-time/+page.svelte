<script lang="ts">
    import Datepicker from "praecox-datepicker";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { goto } from "$app/navigation";


    async function nextPage() {
        goto('../protected/work-details')
    }
    async function previousPage () {
        goto('../protected/work-day')
    }

</script>


<div class="flex flex-row">
    <div class="w-1/4 p-2">
        <PlannerSidebar />
    </div>

    <div class="flex flex-col items-center w-3/4 p-2">

        


        <div class = "justify-center mt-4">
            <button
            class="bg-black text-white py-2 px-4 rounded"
            on:click={previousPage}>
            Previous
            </button>
            <button
            class="bg-black text-white py-2 px-4 rounded"
            on:click={nextPage}>
            Continue
            </button>
        </div>
    </div>
</div>