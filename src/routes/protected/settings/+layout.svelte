<script lang="ts">
    import SettingsSidebar from "$lib/components/SettingsSidebar.svelte";
    import { onMount } from 'svelte';

    let mobile: boolean;
    onMount(() => {
      mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
      console.log("mobile", mobile)
      ;
    });
</script>

{#if mobile}
    <SettingsSidebar/>
    <div class="min-h-screen flex flex-col items-center p-4">
        <div class="w-full max-w-sm p-6">
            <slot/>
        </div>
    </div>
{:else}

    <div class="flex flex-row">
        <SettingsSidebar/>
        <div class="p-8">
            <slot/>
        </div>
    </div>
{/if}
