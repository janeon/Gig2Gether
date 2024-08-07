<script lang="ts">
    export let icon: any; // Accepts any component or SVG markup
    export let placeholder = '';
    export let value = ''; // Bind this value to the input
    export let className = '';

    const allowedPattern = /^[\d+\-*/().]*$/;

    function handleInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!allowedPattern.test(input.value)) {
        // Remove invalid characters
        input.value = input.value.replace(/[^0-9+\-*/().]/g, '');
        value = input.value;
        } else {
        value = input.value;
        }
    }

    function handleBlur() {
        // Perform arithmetic calculation
        const result = calculate(value);
        // // Update the input value with the result
        value = result;
    }

  function calculate(expression: string): string {
    try {
      if (allowedPattern.test(expression)) {
        const evaluated = eval(expression);
        if (isNaN(evaluated) || (expression === evaluated.toString())) {
          return expression; // Return original if evaluation is not a number, or no change in value
        }
        return `${expression}=${evaluated}`;
      }
      return expression; // Return original if invalid characters are present
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
      type="text"
      placeholder={placeholder}
      bind:value
      on:input={handleInput}
      on:blur={handleBlur}
      pattern="[0-9]+"
      class={`mt-1 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md w-full ${className}`}    />
  </div>
  