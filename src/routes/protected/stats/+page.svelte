<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
	export let data;
</script>

<Table>
	<TableHead>
		<TableHeadCell>PID</TableHeadCell>
		<TableHeadCell># Shared Stories</TableHeadCell>
		<TableHeadCell># Total Words in Stories</TableHeadCell>
		<TableHeadCell># Liked Stories</TableHeadCell>
		<TableHeadCell># Income Uploads</TableHeadCell>
		<TableHeadCell># Expense Uploads</TableHeadCell>
		<TableHeadCell># Trends Visits</TableHeadCell>
	</TableHead>
	<TableBody>
	  {#each data.stats.slice(1) as stat} 
		<TableBodyRow>
		  <TableBodyCell>{stat.pid}</TableBodyCell>
		  <TableBodyCell>{stat.stories}</TableBodyCell>
		  <TableBodyCell>{stat.totalWords}</TableBodyCell>
		  <TableBodyCell>{stat.liked}</TableBodyCell>
		  <TableBodyCell>{stat.incomes}</TableBodyCell>
		  <TableBodyCell>{stat.expenses}</TableBodyCell>
		  <TableBodyCell>{stat.trends}</TableBodyCell>
		</TableBodyRow>
	  {/each}
	</TableBody>
  </Table>


  <Table>
	<caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
		Tags
	</caption>
	<TableHead>
		<TableHeadCell>Story Type</TableHeadCell>
		{#each Object.entries(data.tags) as [tag, _]} 	
			<TableHeadCell> {tag} </TableHeadCell>
		{/each}
	</TableHead>
	<TableBodyRow>
		<TableBodyCell>Issues</TableBodyCell>
		{#each Object.entries(data.tags) as [_, counts]} 	
			<TableBodyCell> {counts["issues"]} </TableBodyCell>
		{/each}
	</TableBodyRow>
	<TableBodyRow>
		<TableBodyCell>Strategies</TableBodyCell>
		{#each Object.entries(data.tags) as [_, counts]} 	
			<TableBodyCell> {counts["strategies"]} </TableBodyCell>
		{/each}
	</TableBodyRow>
  </Table>


  <Table>
	<caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
		Expense Fields
	</caption>
	<TableHead>
		{#each Object.entries(data.expenseFields) as [name, _]} 	
			<TableHeadCell> {name} </TableHeadCell>
		{/each}
	</TableHead>
	<TableBodyRow>
		{#each Object.entries(data.expenseFields) as [_, value]} 	
			<TableBodyCell> {value} </TableBodyCell>
		{/each}
	</TableBodyRow>
  </Table>
