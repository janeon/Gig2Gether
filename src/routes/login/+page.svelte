<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<!-- https://www.youtube.com/watch?v=BkkiKuDsfus -->
<main class="container">
    {#if form?.formErrors}
        <div data-theme="Light" class="pico-color-pink-500"> {form.formErrors} </div>
    {/if}
    <form method="POST" use:enhance>
        <input type="email" placeholder="email" name="email">
        <input type="password" placeholder="password" name="password">
        <button type="submit">Submit</button>
    </form>
</main>