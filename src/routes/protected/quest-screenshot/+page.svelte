<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import UploadSidebar from '$lib/UploadSidebar.svelte';
    import { Gallery, Label } from 'flowbite-svelte';
    import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { db, storage } from '$lib/firebase/client'; 
    import { page } from '$app/stores';

    let fileuploadprops = {
        id: 'quest_screenshot'
    };

    const images = [
        { alt: 'ubersc4', src: '../quest4.jpg' },
        { alt: 'ubersc3', src: '../quest3.jpg' },
        { alt: 'ubersc2', src: '../quest2.jpg' },
        { alt: 'ubersc1', src: '../quest1.png' }
    ];

    async function handleFileInputChange(event) {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            await handleFileUpload(file);
        }
    }

    async function handleFileUpload(file) {
        if (file) {
            console.log("File selected for upload:", file.name);
            try {
                const storageRef = ref(storage, `uploads/${file.name}`);
                await uploadBytes(storageRef, file);
                console.log("File uploaded to storage:", file.name);

                const downloadURL = await getDownloadURL(storageRef);
                console.log("File download URL:", downloadURL);

                // Save file metadata to Firestore
                await saveFileMetadata(downloadURL, file.name);

                console.log('File uploaded and metadata saved:', file.name);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected');
        }
    }

    async function saveFileMetadata(downloadURL, fileName) {
        const user = $page.data.user;
        if (!user || !user.uid) {
            console.error("User is not logged in");
            return;
        }

        const collectionRef = collection(db, "users", user.uid, "uploads");
        const docRef = doc(collectionRef, "screenshots");

        const fileData = {
            name: fileName,
            url: downloadURL,
            timestamp: new Date()
        };

        await setDoc(docRef, fileData, { merge: true });
        console.log("File metadata saved to Firestore:", fileData);
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
            Upload screenshots related to quest options, progress, and details/criteria. Below are a few examples:
        </p>

        <!-- Add images -->
        <Gallery class="gap-2 grid grid-cols-4">
            {#each images as { alt, src }}
                <div class="w-full h-70 overflow-hidden">
                    <img src={src} alt={alt} class="object-contain w-full h-full" />
                </div>
            {/each}
        </Gallery>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <Label class="pb-2" for={fileuploadprops.id}>Upload file</Label>
                <input id={fileuploadprops.id} type="file" on:change={handleFileInputChange} autocomplete="off" class="mt-1" />
            </div>
        </div>

        <div class="flex items-center mt-4 ml-49 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>
    </div>
</div>



