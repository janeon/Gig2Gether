<script lang="ts">
    import { page } from '$app/stores';
</script>

<a
    href="/protected"
    class="hover:underline"
    class:active={$page.url.pathname === '/protected'}>Home</a
>
<form action="/logout" method="POST">
    <button type="submit">Log out</button>
  </form>


  <a
  href="/protected/upload"
  class="hover:underline"
  class:active={$page.url.pathname === '/protected/upload'}>Upload</a
>
