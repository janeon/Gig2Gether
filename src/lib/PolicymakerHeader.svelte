<script lang="ts">
    import { page } from '$app/stores';
    import {handleLogout} from '$lib/utils';
</script>

<a
    href="/protected"
    class="hover:underline"
    class:active={$page.url.pathname === '/protected'}>Home</a
>
<button class="hover:underline" on:click={handleLogout}>Logout</button>