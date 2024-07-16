<script lang="ts">
    import ShareTagSelect from "$lib/components/ShareTagSelect.svelte";

    $: tags = []
</script>

<ShareTagSelect tags={tags} platform={"rover"} />
<p>{tags}</p>