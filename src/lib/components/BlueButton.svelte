<script>
    import { goto } from '$app/navigation';
    import { Button } from 'flowbite-svelte';
    export let href = "stay";
    export let buttonText = "";
    export let type = "button";
    export let onclick = handleClick;
  
    function handleClick() {      
      if (href==="stay") return;
      goto(href);
    }
  </script>
  
  <Button 
    class="bg-blue-500 text-white font-bold py-2 px-3 rounded hover:bg-blue-700"
    on:click={onclick} type={type}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="hover:underline">{buttonText}</a>
  </Button>
  