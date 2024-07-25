<script>
    import { Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import '@fortawesome/fontawesome-free/css/all.min.css'

    export let iconClass = '';
    export let title = '';
    export let route = '';  
    export let mobile = false;

    const descriptions = [
      {"Upload": 'Share daily rates, hours, expenses'},
      {"Stories": 'Exchange strategies and issues'},
      {"Trends":'Visualizations of work/earning trends'},
      {"Settings":'Manage worker profile, account, sharing preferences'},
      {"Planner":'Schedule future work hours, long-term earnings.'}
    ]
    // console.log(mobile);
    

</script>
  <Card padding= {mobile? "xs": "lg"} class="flex flex-col items-center justify-center text-center border border-gray-300 dark:border-gray-700 min-h-[100px] w-full max-w-sm cursor-pointer !important"
    on:click={() => goto(route)}>
    <i class={`fas ${iconClass} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 text-gray-900 dark:text-white`}></i>
    <h5 class="text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p class="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-700 dark:text-gray-400 mt-0 sm:mt-0.5 md:mt-1 lg:mt-1.5">
      {descriptions.find(d => d[title])?.[title]}
    </p>
  </Card>
