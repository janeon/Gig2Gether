<script>
    import { Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import '@fortawesome/fontawesome-free/css/all.min.css'

    export let iconClass = '';
    export let title = '';
    export let description = '';
    export let route = '';
  
  </script>
  
  <Card
    class="flex flex-col items-center justify-center p-4 text-center border border-gray-300 dark:border-gray-700 min-h-[200px] w-full max-w-sm cursor-pointer"
    on:click={() => goto(route)}
  >
    <i class={`fas ${iconClass} text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-gray-900 dark:text-white`}></i>
    <h5 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p class="text-xs sm:text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-400 mt-1 sm:mt-2">
      {description}
    </p>
  </Card>
  