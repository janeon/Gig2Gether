<script>
    import ShareSidebar from "$lib/components/ShareSidebar.svelte";

</script>

<div class = "flex flex-row">
    <ShareSidebar/>
    <div class = "p-8">
        <slot/>
    </div>
</div>
