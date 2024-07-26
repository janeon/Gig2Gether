<script lang="ts">
    import HomeCard from "$lib/components/HomeCard.svelte";
    import { onMount } from 'svelte';

    let mobile: boolean;
    onMount(() => {
      mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
    });
  </script>

  {#if mobile}
  <header class="fixed top-0 left-0 w-full p-0 bg-white dark:bg-gray-800 z-10 flex items-center justify-center h-12">
    <h1 class="text-2xl font-bold mb-0">GigConnect</h1>
  </header>
  {/if}
  <div class="flex flex-col items-center min-h-screen px-4 pt-14"> 
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
      {#each [
        { iconClass: 'fa-upload', title: 'Upload', route: '/protected/upload' },
        { iconClass: 'fa-book', title: 'Stories', route: '/protected/stories' },
        { iconClass: 'fa-chart-line', title: 'Trends', route: '/protected' },
        { iconClass: 'fa-cog', title: 'Settings', route: '/protected/settings/account' },
        { iconClass: 'fa-calendar', title: 'Planner', route: '/protected' }
      ] as { iconClass, title, route }}
        <HomeCard {iconClass} {title} {route} mobile={mobile} />
      {/each}
    </div>
  </div>
  