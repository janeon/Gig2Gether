<script>
    import { goto } from '$app/navigation';
    import { Button } from 'flowbite-svelte';
    export let href = "/";
    export let buttonText = "";
    export let type = "button";
  
    function handleClick() {      
      if (href==="stay") return;
      goto(href);
    }
  </script>
  
  <Button 
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    on:click={handleClick} type={type}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="hover:underline">{buttonText}</a>
  </Button>
  