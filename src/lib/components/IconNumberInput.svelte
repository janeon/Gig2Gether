<script lang="ts">
    export let icon: any; // Accepts any component or SVG markup
    export let placeholder = '';
    export let value = ''; // Bind this value to the input
    export let className = '';


    function handleBlur() {
        // Perform arithmetic calculation
        console.log("value", value);
        // const result = calculate(value);
        console.log("result", result);
        // // Update the input value with the result
        // value = result;
    }

  function calculate(expression: string): string {
    try {
      // Evaluate the arithmetic expression
      const evaluated = eval(expression);
      if (isNaN(evaluated)) {
        return expression; // Return original if evaluation is not a number
      }
      return `${expression}=${evaluated}`;
    } catch (error) {
      return expression; // Return original if there's an error in evaluation
    }
  }
  </script>
  
  <div class="relative flex items-center">
    {#if icon}
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
        {#if typeof icon === 'string'}
          {@html icon}
        {:else if typeof icon === 'function'}
          <svelte:component this={icon} class="w-6 h-6 text-gray-500" />
        {/if}
      </span>
    {/if}
    <input
      type="number"
      placeholder={placeholder}
      bind:value
      on:blur={handleBlur}
      class={`mt-1 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md w-full ${className}`}    />
  </div>
  