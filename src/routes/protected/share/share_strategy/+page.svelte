<script lang="ts">
    import ShareTagSelect from "$lib/components/ShareTagSelect.svelte";
    import ShareVideo from "$lib/components/ShareVideo.svelte";

    $: tags = []
    $: url = ""
    $: title = ""
    $: description = ""

    $: tagSelection = false
</script>

{#if tagSelection}
    <ShareTagSelect bind:tags={tags} platform={"rover"} bind:title={title} bind:description={description} type={'strategy'} bind:url={url} bind:tagSelection={tagSelection}/>
{:else}
    <ShareVideo bind:title={title} bind:tagSelection={tagSelection} bind:description={description} bind:url={url} />
{/if}