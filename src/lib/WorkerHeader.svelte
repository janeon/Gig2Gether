<script lang="ts">
    import { page } from '$app/stores';
</script>

<!-- class:active={$page.url.pathname === '/protected'} -->
<a
    href="/protected"
    class="hover:underline"
    >Home</a
>

<!-- class:active={$page.url.pathname === '/protected/account'} -->
<a
    href="/protected/account"
    class="hover:underline"
    >Settings</a
>
<form action="/logout" method="POST">
    <button type="submit">Log out</button>
  </form>