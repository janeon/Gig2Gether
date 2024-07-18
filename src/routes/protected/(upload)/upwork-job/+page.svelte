<!-- <script lang="ts">
    import { Button } from 'flowbite-svelte';
    import UploadSidebar from '$lib/UploadSidebar.svelte';
    import { getFirestore, collection, doc, setDoc, writeBatch, Timestamp } from "firebase/firestore";
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { db, storage } from '$lib/firebase/client';
    import Papa from 'papaparse';
    import { page } from '$app/stores';

    let fileuploadprops = {
        id: 'job_csv'
    };

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
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected');
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

        const batch = writeBatch(db);
        const jobDataDocRef = doc(db, "users", user.uid, "uploads", "jobData");

        const currentDate = Timestamp.fromDate(new Date());

        data.forEach((row, index) => {
            const subDocRef = doc(collection(jobDataDocRef, "jobs"), `job_${index}`);
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
        <UploadSidebar />
    </div>

    <div class="w-3/4 rounded-md p-6">
        <p class="mb-3">
            After screenshotting your completed job, add screenshots
        </p>

        <p>
            Make sure the following are visible:
        </p>

        <ul class="max-w-md mx-auto space-y-1 list-disc list-inside">
            <li>Job start/end date</li>
            <li>Hourly Charge/ Fixed Price</li>
            <li>Hours Per Week</li>
            <li>Client History</li>
            <li>Job Category</li>
        </ul>

        <p class="mt-4">
            Job information can be entered manually or via screenshot uploads.
        </p>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <label class="pb-2" for={fileuploadprops.id}>Upload CSV</label>
                <input id={fileuploadprops.id} type="file" accept=".csv" on:change={handleFileInputChange} autocomplete="off" class="mt-1" />
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/upwork-job-screenshot">Upload Screenshots</Button>
            </div>
        </div>

        <div class="flex items-center mt-4 ml-49 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>
    </div>
</div> -->

<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import UploadSidebar from '$lib/UploadSidebar.svelte';
    import { getFirestore, collection, doc, setDoc, writeBatch, Timestamp } from "firebase/firestore";
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { db, storage } from '$lib/firebase/client';
    import Papa from 'papaparse';
    import { page } from '$app/stores';

    let fileuploadprops = {
        id: 'job_csv'
    };

    let selectedDate = new Date().toISOString().substring(0, 10); // Default to today's date

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
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected');
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
            const subDocRef = doc(collection(csvDocRef, "jobs"), `job_${index}`);
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
        <UploadSidebar />
    </div>

    <div class="w-3/4 rounded-md p-6">
        <p class="mb-3">
            After screenshotting your completed job, add screenshots
        </p>

        <p>
            Make sure the following are visible:
        </p>

        <ul class="max-w-md mx-auto space-y-1 list-disc list-inside">
            <li>Job start/end date</li>
            <li>Hourly Charge/ Fixed Price</li>
            <li>Hours Per Week</li>
            <li>Client History</li>
            <li>Job Category</li>
        </ul>

        <p class="mt-4">
            Job information can be entered manually or via screenshot uploads.
        </p>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <label class="pb-2" for={fileuploadprops.id}>Upload CSV</label>
                <input id={fileuploadprops.id} type="file" accept=".csv" on:change={handleFileInputChange} autocomplete="off" class="mt-1" />
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/upwork-job-screenshot">Upload Screenshots</Button>
            </div>
        </div>

        <div class="flex items-center mt-4 ml-49 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>
    </div>
</div>
