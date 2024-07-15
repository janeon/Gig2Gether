<script lang="ts">
	import "../app.css";
	import { goto } from '$app/navigation';
	export const prerender = false
</script>
  
<div>
	<p>Page content goes here</p>
	<button 
	class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
	on:click={() => goto('/register')}
	>
		<a href="/register" class="hover:underline">Register</a>
	</button>
</div>