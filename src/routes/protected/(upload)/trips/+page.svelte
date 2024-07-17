<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import UploadSidebar from '$lib/UploadSidebar.svelte';
    import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore";
    import { db } from '$lib/firebase/client';
    import Papa from 'papaparse';
    import { page } from '$app/stores';

    let fileuploadprops = {
        id: 'trip_csv'
    };

    async function handleFileInputChange(event) {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            await parseAndUploadCSV(file);
        }
    }

    async function parseAndUploadCSV(file) {
        Papa.parse(file, {
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

        const batch = writeBatch(db);
        const tripDataDocRef = doc(db, "users", user.uid, "uploads", "tripData");

        data.forEach((row, index) => {
            const subDocRef = doc(collection(tripDataDocRef, "trips"), `trip_${index}`);
            batch.set(subDocRef, row);
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
            Trips information are collected per ride, and both trip offers and summaries can be entered manually or via screenshot uploads.
        </p>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <label class="pb-2" for={fileuploadprops.id}>Upload CSV</label>
                <input id={fileuploadprops.id} type="file" accept=".csv" on:change={handleFileInputChange} autocomplete="off" class="mt-1" />
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/trip-screenshot">Upload Screenshots</Button>
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/manual-trips">Manual Upload</Button>
            </div>
        </div>

        <div class="flex items-center mt-4 ml-49 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>
    </div>
</div>
