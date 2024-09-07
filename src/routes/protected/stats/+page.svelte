<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
	export let data;
</script>

<Table>
	<TableHead>
		<TableHeadCell>PID</TableHeadCell>
		<TableHeadCell># Shared Stories</TableHeadCell>
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
		  <TableBodyCell>{stat.liked}</TableBodyCell>
		  <TableBodyCell>{stat.incomes}</TableBodyCell>
		  <TableBodyCell>{stat.expenses}</TableBodyCell>
		  <TableBodyCell>{stat.trends}</TableBodyCell>
		</TableBodyRow>
	  {/each}
	</TableBody>
  </Table>