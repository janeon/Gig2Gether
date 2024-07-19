<script>
    import SettingsSidebar from "$lib/components/SettingsSidebar.svelte";

</script>

<div class="flex flex-row">
    <SettingsSidebar/>
    <div class="p-8">
        <slot/>
    </div>
</div>