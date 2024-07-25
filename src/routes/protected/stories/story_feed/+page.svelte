<script>
    import PostCard from "$lib/components/PostCard.svelte";
    export let data
    import { updateTitle } from "$lib/stores/title";
    updateTitle("Story Feed");
</script>
<div class="justify-items-center">
    {#if data.posts.length > 0}
        {#each data.posts as post}
            <PostCard postData={post}/>
        {/each}
        
    {/if}
</div>