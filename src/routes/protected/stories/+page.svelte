<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<button on:click={goto('/protected/stories/share_strategy')} class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
    <a href="/login" class="hover:underline">Share A Strategy</a>
</button>