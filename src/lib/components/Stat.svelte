<script lang="ts">
	export let docInfo;
</script>

<div class="flex flex-row border-2 items-center">
	<!-- <p class="px-2 border-r-2">{docInfo.timestamp}</p> -->
	<p class="px-2 border-r-2">
		{docInfo.pid}
	</p>

	<p class="px-2 border-r-2">
        {docInfo.stories}
    </p>
	
    <p class="px-2 border-r-2">
        {docInfo.incomes}
    </p>

    <p class="px-2 border-r-2">
        {docInfo.expenses}
    </p>

    <p class="px-2 border-r-2">
        {docInfo.trends}
    </p>
    <!-- <p class="text-blue-500 hover:text-blue-700 underline flex-grow text-center">
		{docInfo.uid}
    </p> -->
</div>
