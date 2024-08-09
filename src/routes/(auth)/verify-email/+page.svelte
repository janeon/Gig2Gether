<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    const { token, email } = data;

</script>

<div class="flex justify-center min-h-screen ">
    <div class="p-6 rounded-lg text-center relative top-[-10%]">
      {#if (!token && email)}
        <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Email Sent</h1>
        <p class="text-sm md:text-base lg:text-lg text-gray-600 mt-2">
          A verification email has been sent to: <span class="font-semibold">{email}</span>
        </p>
        You may now close this page
      {/if}
    </div>
  </div>