<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { getFirestore, collection, doc, setDoc, writeBatch, Timestamp } from "firebase/firestore";
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { db, storage } from '$lib/firebase/client';
    import Papa from 'papaparse';
    import { page } from '$app/stores';
    import BlueButton from '$lib/components/BlueButton.svelte';
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    import {invalidateAll} from '$app/navigation'

    updateTitle(capitalize($page.data.user?.platform) + " CSV Upload");
    let fileuploadprops = {
        id: 'trip_csv'
    };

    let csv : File
    let url: string
    let date = new Date()
    let successMessage = '';
    let errorMessage ='';
    let uploading = false

    async function handleFileInputChange(event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
        csv = fileInput.files[0]
        }
    }

    async function uploadCSVFile() {
        if (uploading) {
            return
        }
        if (csv) {
            errorMessage = ""
            uploading = true
            console.log("File selected for upload:", csv.name);
            try {
                const storageRef = ref(storage, `uploads/${csv.name}`);
                await uploadBytes(storageRef, csv);
                console.log("File uploaded to storage:", csv.name);

                url = await getDownloadURL(storageRef);
                console.log("File download URL:", url);

                // Parse and upload CSV data to Firestore
                await parseAndUploadCSV();

                console.log('File uploaded and metadata saved:', csv.name);
                successMessage = 'File uploaded successfully!'; 
            } catch (error) {
                uploading = false
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

    async function parseAndUploadCSV() {
        Papa.parse(csv, {
            header: true,
            complete: async function(results) {
                console.log("Parsed CSV data:", results.data);
                await uploadCSVDataToFirestore(results.data);
            },
            error: function(error) {
                console.error("Error parsing CSV file:", error);
            }
        });
    }

    async function uploadCSVDataToFirestore(data) {
        const user = $page.data.user;
        if (!user || !user.uid) {
            console.error("User is not logged in");
            return;
        }

        const collectionRef = collection(db, "upload", "csv", "entries")// Separate by gig work manual inputs?
        const docRef = doc(collectionRef)

        await setDoc(docRef, {
            name: fileuploadprops.id,
            url: url,
            date: date,
            type: "CSV"
        });

        const batch = writeBatch(db);
        data.forEach((row, index) => {
            const subDocRef = doc(collection(docRef, "trips"), `trip_${index}`);
            const rowData = {
                ...row,
                date: date,
                csvDownloadURL: url
            };
            batch.set(subDocRef, rowData);
        });

        try {
            await batch.commit();
            console.log("CSV data successfully uploaded to Firestore.");
            invalidateAll()
        } catch (error) {
            uploading = false
            console.error("Error uploading CSV data to Firestore:", error);
        }
    }
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>

<div class="text-center">
        <p class="">
            Trips information are collected per ride, and both trip offers and summaries can be entered manually or via screenshot uploads.
        </p>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <label class="pb-2" for={fileuploadprops.id}>Upload CSV</label>
                <input id={fileuploadprops.id} type="file" accept=".csv" on:change={handleFileInputChange} autocomplete="off" class="mt-1" />
                {#if uploading}
                    <Button 
                    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    on:click={uploadCSVFile}>
                    <i class="fa-solid fa-spinner loadingSpinner animate-spin" />
                </Button>
                {:else}
                <BlueButton onclick={uploadCSVFile} buttonText="Upload File"/>
                {/if}
                {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
                 {/if}
                {#if errorMessage}
                 <p class = "text-red-600 mt-2">{errorMessage}</p>
                {/if}
            </div>
        </div>

        <!-- <div class="flex items-center mt-4 ml-49 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div> -->
</div>

