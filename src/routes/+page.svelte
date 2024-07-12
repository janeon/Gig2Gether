<script lang="ts">
	import { goto } from '$app/navigation';

	function login() {
		goto('/login');
	}
</script>

<button on:click={login}>Login</button>
