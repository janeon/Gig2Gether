<script lang="ts">
    import { page } from '$app/stores';
</script>

<a
    href="/protected"
    class="hover:underline"
    class:active={$page.url.pathname === '/protected'}>Home</a
>

<a
    href="/protected/settings"
    class="hover:underline"
    class:active={$page.url.pathname === '/protected/settings'}>Settings</a
>
<form action="/logout" method="POST">
    <button type="submit">Log out</button>
  </form>