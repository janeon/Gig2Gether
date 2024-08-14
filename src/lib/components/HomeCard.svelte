<script>
  import { Card } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import '@fortawesome/fontawesome-free/css/all.min.css';

  export let iconClass = '';
  export let title = '';
  export let route = '';
  export let mobile = false;
  export let buttons = []; // Array of button objects

  // Helper to generate button styles based on index
  let lastColorIndex = -1;

const getButtonStyle = (index) => {
  const colors = [
    // "rgb(208, 219, 234)", // First color
    "rgb(217, 172, 147)", // Second color
    // "rgb(232, 213, 159)"  // Third color
  ];
  
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * colors.length);
  } while (randomIndex === lastColorIndex);
  
  lastColorIndex = randomIndex;
  
  return `background-color:${colors[randomIndex]}`;
};

</script>

<Card padding={mobile ? "xs" : "lg"} class="flex flex-col items-center justify-center text-center border border-gray-300 dark:border-gray-700 min-h-[100px] w-full max-w-sm cursor-pointer overflow-hidden">
  <a href={route} on:click={() => goto(route)}>
  <i class={`fas ${iconClass} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 text-gray-900 dark:text-white`}></i>
  <h5 class="text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white" >
    {title}
  </h5>
  </a>
  <!-- Add the buttons here with responsive sizes -->
  <div class="mt-2 flex flex-wrap justify-center gap-2">

    {#each buttons as { label, route }, index}
      {#if label && route}
      <button class={`py-1 px-2 rounded-md text-black font-medium w-full sm:w-auto 
      ${mobile ? 'text-[12px]' : 'text-xxs sm:text-xxs md:text-xs lg:text-sm'}`} 
              style="background-color:rgb(208, 219, 234)"
          on:click={() => goto(route)}>
          {label}
        </button>
      {/if}
    {/each}
  </div>
</Card>
