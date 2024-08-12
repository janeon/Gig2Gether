<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import { title as titleStore } from "$lib/stores/title";
    import { onMount, onDestroy } from 'svelte';

    let mobile: boolean;
    onMount(() => {
        mobile = window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) !== null;
    });

    let title:string;

    const unsubscribe = titleStore.subscribe(val => {
        title = val;
    });

    onDestroy(() => {
        unsubscribe();
    });

</script>


<div class={mobile ? 'fixed-y' : 'flex pt-3'}>
    <Sidebar title={title} option="planner"/>
    <div class="flex flex-1 justify-center h-[80vh] overflow-y-auto">
        <div class="flex flex-col items-center w-full h-[100vh]  overflow-y-none">
          <div class="bg-white dark:bg-gray-800 px-5 pb-24 rounded-lg w-full">
            <header class="pt-3">
            {#if !mobile}
            <h1 class="text-2xl font-bold text-center">{title}</h1>
            {/if}
        </header>
        <slot/>
            </div>    
        </div>
    </div>
</div>
