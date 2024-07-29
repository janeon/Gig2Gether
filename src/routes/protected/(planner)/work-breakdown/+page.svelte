<script lang="ts">
    import { goto } from "$app/navigation";
  import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';




  async function backClick () {
    goto("/protected/work-results")
  }
</script>

<div class="flex flex-row">
  <div class="w-1/4 p-2">
      <PlannerSidebar />
  </div>

  <div class="w-3/4 flex flex-col items-start p-2">
      <h1 class="text-lg mb-1 font-bold text-center">Breakdowns</h1>

      <div class="flex flex-row space-x-4 w-full">
          <div class="w-1/2">
              <Table>
                  <TableHead>
                      <TableHeadCell>Weekly Expenses</TableHeadCell>
                      <TableHeadCell></TableHeadCell>
                      <TableHeadCell></TableHeadCell>
                      <TableHeadCell></TableHeadCell>
                  </TableHead>
                  <TableBody tableBodyClass="divide-y">
                      <TableBodyRow>
                          <TableBodyCell>Miscellaneous</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Internet/Home</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Equipment</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Insurance</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Software</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell class="font-bold">Total Expenses:</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                  </TableBody>
              </Table>
          </div>

          <div class="w-1/2">
              <Table>
                  <TableHead>
                      <TableHeadCell>Your Stats</TableHeadCell>
                      <TableHeadCell></TableHeadCell>
                      <TableHeadCell></TableHeadCell>
                      <TableHeadCell></TableHeadCell>
                  </TableHead>
                  <TableBody tableBodyClass="divide-y">
                      <TableBodyRow>
                          <TableBodyCell># of services provides</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Time spent working (Daily)</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Time spent on other tasks</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell>Total bonus</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                      <TableBodyRow>
                          <TableBodyCell class="font-bold">Gross earnings</TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                          <TableBodyCell></TableBodyCell>
                      </TableBodyRow>
                  </TableBody>
              </Table>
          </div>
      </div>

      <div class="w-full mt-4">
          <Table>
              <TableHead>
                  <TableHeadCell>Earning Summary</TableHeadCell>
                  <TableHeadCell></TableHeadCell>
                  <TableHeadCell></TableHeadCell>
                  <TableHeadCell></TableHeadCell>
              </TableHead>
              <TableBody tableBodyClass="divide-y">
                  <TableBodyRow>
                      <TableBodyCell>Gross earnings</TableBodyCell>
                      <TableBodyCell></TableBodyCell>
                      <TableBodyCell></TableBodyCell>
                      <TableBodyCell></TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                      <TableBodyCell class="font-bold">Total earnings</TableBodyCell>
                      <TableBodyCell></TableBodyCell>
                      <TableBodyCell></TableBodyCell>
                      <TableBodyCell></TableBodyCell>
                  </TableBodyRow>
              </TableBody>
          </Table>


          <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={backClick}>
                Back
            </button>
            
        </div>
      </div>
  </div>
</div>
