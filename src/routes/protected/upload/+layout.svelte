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


<div class={mobile ? '' : 'flex'}>
    <Sidebar title={title} option="upload"/>
    <div class="flex p-3 flex-1 justify-center h-[85vh] overflow-y-auto">
        <div class="flex flex-col items-center w-full">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <header>
            {#if !mobile}
            <h1 class="text-2xl font-bold">{title}</h1>
            {/if}
        </header>
        <slot/>
    </div>    
    </div>
    </div>
</div>
