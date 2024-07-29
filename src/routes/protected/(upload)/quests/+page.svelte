<!-- <script lang="ts">
    import { Button } from 'flowbite-svelte';
    import UploadSidebar from '$lib/components/UploadSidebar.svelte';
    import { getFirestore, collection, doc, setDoc, writeBatch, Timestamp } from "firebase/firestore";
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { db, storage } from '$lib/firebase/client';
    import Papa from 'papaparse';
    import { page } from '$app/stores';

    let fileuploadprops = {
        id: 'quest_csv'
    };

    let selectedDate = new Date().toISOString().substring(0, 10); 

    let successMessage = '';
    let errorMessage ='';

    async function handleFileInputChange(event) {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            await uploadCSVFile(file);
        }
    }

    async function uploadCSVFile(file) {
        if (file) {
            console.log("File selected for upload:", file.name);
            try {
                const storageRef = ref(storage, `uploads/${file.name}`);
                await uploadBytes(storageRef, file);
                console.log("File uploaded to storage:", file.name);

                const downloadURL = await getDownloadURL(storageRef);
                console.log("File download URL:", downloadURL);

                // Parse and upload CSV data to Firestore
                await parseAndUploadCSV(file, downloadURL);

                console.log('File uploaded and metadata saved:', file.name);
                successMessage = 'File uploaded successfully!'; 
            } catch (error) {
                console.error('Error uploading file:', error);
                successMessage = '';
                errorMessage = 'Error uploading file.';
            }
        } else {
            console.error('No file selected');
            errorMessage = "No file selected"
            successMessage='';
        }
    }

    async function parseAndUploadCSV(file, downloadURL) {
        Papa.parse(file, {
            header: true,
            complete: async function(results) {
                console.log("Parsed CSV data:", results.data);
                await uploadCSVDataToFirestore(results.data, downloadURL);
            },
            error: function(error) {
                console.error("Error parsing CSV file:", error);
            }
        });
    }

    async function uploadCSVDataToFirestore(data, downloadURL) {
        const user = $page.data.user;
        if (!user || !user.uid) {
            console.error("User is not logged in");
            return;
        }

        const currentDate = Timestamp.fromDate(new Date(selectedDate));
        const uniqueDocId = doc(collection(db, "users", user.uid, "uploads")).id;
        const csvDocRef = doc(db, "users", user.uid, "uploads", uniqueDocId);

        await setDoc(csvDocRef, {
            name: fileuploadprops.id,
            url: downloadURL,
            date: currentDate
        });

        const batch = writeBatch(db);
        data.forEach((row, index) => {
            const subDocRef = doc(collection(csvDocRef, "quests"), `quest_${index}`);
            const rowData = {
                ...row,
                date: currentDate,
                csvDownloadURL: downloadURL
            };
            batch.set(subDocRef, rowData);
        });

        try {
            await batch.commit();
            console.log("CSV data successfully uploaded to Firestore.");
        } catch (error) {
            console.error("Error uploading CSV data to Firestore:", error);
        }
    }
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>

<div class="flex flex-row">
    <div class="w-1/4">
        <UploadSidebar/>
    </div>

    <div class="w-3/4 rounded-md p-6">
        <p class="mb-3">
            We are collecting Quest offers to assess their quality, fairness, and achievability across drivers.
        </p>

        <p>
            Quests include those that were:
        </p>

        <ul class="max-w-md mx-auto space-y-1 list-disc list-inside">
            <li>Received and not accepted</li>
            <li>Received but not completed</li>
            <li>Received and completed</li>
        </ul>

        <p class="mt-4">
            Quest information can be entered manually or via screenshot uploads.
        </p>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <label class="pb-2" for={fileuploadprops.id}>Upload CSV</label>
                <input id={fileuploadprops.id} type="file" accept=".csv" on:change={handleFileInputChange} autocomplete="off" class="mt-1" />
                {#if successMessage}
                    <p class="text-green-600 mt-2">{successMessage}</p>
                {/if}
                {#if errorMessage}
                    <p class = "text-red-600 mt-2">{errorMessage}</p>
                {/if}
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href = "/protected/quest-screenshot">Upload Screenshots</Button>
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/manual-quests">Manual Upload</Button>
            </div>
        </div>

        <div class="flex items-center mt-4 ml-59 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>
    </div>
</div> -->
<script lang="ts">
  import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
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
      </div>
  </div>
</div>
