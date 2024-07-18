<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import UploadSidebar from '$lib/components/UploadSidebar.svelte';
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
            After accessing the “Payments” screen on Rover, navigate to the desired service and screenshot all necessary information.
        </p>

        <p>
            Make sure the following are visible:
        </p>

        <ul class="max-w-md mx-auto space-y-1 list-disc list-inside">
            <li>Date and Time of Start</li>
            <li>Date and Time of End</li>
            <li>Type of work</li>
            <li>Income and Platform cut</li>
        </ul>

        <div class="flex justify-start mt-6">
            <div class="flex flex-col items-center space-y-4 ml-56">
                <Button class="bg-black text-white rounded px-6 py-3" size="xl" href="/protected/rover-screenshot">Upload Screenshots</Button>
            </div>
        </div>

        <div class="flex items-center mt-4 ml-59 text-black cursor-pointer">
            <i class="fas fa-play fa-2x mr-2"></i>
            <span>Learn more on how to add files or enter details</span>
        </div>

    </div>
</div>
