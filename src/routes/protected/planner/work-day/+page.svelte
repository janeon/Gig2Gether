<script lang="ts">
    import SveltyPicker from "svelty-picker";
    import { goto } from "$app/navigation";
    import { updateTitle } from "$lib/stores/title";
    import ScheduleSelector from 'react-schedule-selector';
	import { Button } from "flowbite-svelte";
    
    let next = false;
    const handleClick = () => next ? goto('./work-breakdown') : next = true;
  
    next ? updateTitle("What time would you like to work?") : updateTitle("What days are you planning work for?");
  
    function calculateDaysBetween([start, end]: [string, string]): number {
      const startDate = new Date(start).getTime();
      const endDate = new Date(end).getTime();
        return (endDate - startDate) / (1000 * 3600 * 24) + 1;
    }
    
    let selectedDates = ['', ''];

    let schedule = [];
    const handleChange = (newSchedule) => {
      schedule = newSchedule;
    };
  
    // Get today's date
    const today = new Date();
  </script>
  
  <div class="flex flex-row">
    <div class="flex flex-col items-center-3/4 p-2 w-full">
  
      {#if next}
      <div class="w-90">
        <react:ScheduleSelector         
          selection={schedule}
          selectionScheme="square"
          minTime={8}
          maxTime={22}
          hourlyChunks={1}
          startDate={selectedDates[0]}
          numDays={calculateDaysBetween(selectedDates)}
          onChange={handleChange}
        />
      </div>
      {:else}
      <div class="flex justify-center">
        <p class="text-gray-500 mb-7">Select a Range of Dates</p>
      </div>
      <div class="flex justify-center mb-6">
        <SveltyPicker 
          isRange={true}
          pickerOnly={true}
          startDate={today}
          bind:value={selectedDates}
        />
      </div>
      {/if}
      
        {#if next}
        <div class="w-full flex justify-between mt-4">
          <Button on:click={() => next = false} color="dark">Previous</Button>
          <Button on:click={handleClick} color="blue">Continue</Button>
        </div>
        {:else}
        <div class="flex justify-center mt-4">
        <button
          class="bg-black text-white py-2 px-4 rounded"
          on:click={handleClick}>
          Continue
        </button>
        </div>
        {/if}
    </div>
  </div>
  