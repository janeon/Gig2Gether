<script lang="ts">
    import SettingsSidebar from "$lib/components/SettingsSidebar.svelte";
    import { title as titleStore } from "$lib/stores/title";
    import { onMount, onDestroy } from 'svelte';

    let mobile: boolean;
    onMount(() => {
        mobile = window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) !== null;
        // console.log("mobile", mobile);
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
    <SettingsSidebar title={title}/>
    <div class="p-3 flex-1 h-[80vh] overflow-y-scroll w-full">
        <header>
            {#if !mobile}
            <h1 class="text-lg font-bold">{title}</h1>
            {/if}
        </header>
        <slot/>
    </div>
</div>
