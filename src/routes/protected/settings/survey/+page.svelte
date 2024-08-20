<script lang="ts">
    import { page } from '$app/stores';
	import { updateTitle } from '$lib/stores/title';
    import { onMount } from 'svelte';
    
    onMount(() => {
        updateTitle('Survey Page');    
    });
    
    
</script>