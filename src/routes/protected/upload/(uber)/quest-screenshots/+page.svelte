<script lang="ts">
    import { Button, Gallery } from 'flowbite-svelte';
    import { collection, doc, setDoc, writeBatch, Timestamp } from "firebase/firestore";
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { db, storage } from '$lib/firebase/client';
    import Papa from 'papaparse';
    import { page } from '$app/stores';

    let fileuploadprops = {
        id: 'quest_csv'
    };

    let selectedDate = new Date().toISOString().substring(0, 10); 

    let successMessage = '';
    let errorMessage ='';

    const images = [
        { alt: 'ubersc4', src: '/quest4.jpg' },
        { alt: 'ubersc3', src: '/quest3.jpg' },
        { alt: 'ubersc2', src: '/quest2.jpg' },
        { alt: 'ubersc1', src: '/quest1.png' }
    ];

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

        <p class="mb-3">
            Upload screenshots related to quest options, progress, and details/criteria. Below are a few examples:
        </p>

        <Gallery class="gap-2 grid grid-cols-4">
            {#each images as { alt, src }}
                <div class="w-full h-70 overflow-hidden">
                    <img src={src} alt={alt} class="object-contain w-full h-full" />
                </div>
            {/each}
        </Gallery>

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
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/quests">Manual Upload</Button>
            </div>
        </div>

        <div class="flex items-center mt-4 ml-59 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>
    </div>
</div>

