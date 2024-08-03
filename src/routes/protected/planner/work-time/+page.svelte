<script lang="ts">
    import Datepicker from "praecox-datepicker";
    import { goto } from "$app/navigation";
    import ScheduleSelector from 'react-schedule-selector'


    async function nextPage() {
        goto('./work-details')
    }
    async function previousPage () {
        goto('./work-day')
    }

    let schedule = [];

    const handleChange = (newSchedule) => {
        // console.log(newSchedule);
        schedule = newSchedule;
    };

</script>

<div class="flex flex-row">

    <div class="flex flex-col items-center w-3/4 p-2">

        <div class = "justify-center">
            <h1 class = "font-bold">When would you like to work?</h1>
        </div>

        <div class = "w-90">
            <react:ScheduleSelector         
            selection={schedule}
            numDays={5}
            minTime={8}
            maxTime={22}
            hourlyChunks={2}
            onChange={handleChange}/>
        </div>

      
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

