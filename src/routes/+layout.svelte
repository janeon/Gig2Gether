<script lang="ts">
	import "../app.css";
	import Header from '$lib/Header.svelte';
</script>
  
<main class="p-8 space-y-12 font-serif">
	<div class="p-4 rounded-lg">
	<Header />
	<slot />
	</div>
</main>