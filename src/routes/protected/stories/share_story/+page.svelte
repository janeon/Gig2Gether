<script lang="ts">
    import { addDoc, collection, doc, getDoc } from "firebase/firestore";
    import { db, storage } from "$lib/firebase/client";
    import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

    import { Button, Input, ButtonGroup, Textarea } from "flowbite-svelte";
    import { ToggleGroupItem, ToggleGroup } from "$lib/components/ui/toggle-group";
    import BlueButton from "$lib/components/BlueButton.svelte";
    import Tags from "$lib/components/tags.svelte";
    
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { updateTitle } from "$lib/stores/title";
    import { goto } from "$app/navigation";
    updateTitle("Share Story");
    
    let tags : string[] = []
    let video: File
    let title : string = ""
    let description : string = ""
    let url : string
    let type : string
    let uploading = false

    $: fileName = video ? video.name : 'No file selected';
    $: postSharing = []
    $: sharePrivate = false
    $: errorMessageType = " "
    $: errorMessageTags = " "
    $: errorMessageSharing = " "


    const commonTags = [
        {value: "fair pay", label: "Fair Pay"},
        {value: "discrimination", label: "Discrimination"},
        {value: "ratings", label: "Ratings"},
        {value: "working time", label: "Working Time"},
        {value: "stress", label: "Stress (e.g. from precarity)"},
        {value: "other", label: "Other"}
    ];

    const uberTags = [
        {value: "safety", label: "Safety"},
        {value: "care-giving", label: "Care-giving"},
        {value: "understanding algorithms", label: "Understanding Algorithms"},
        ...commonTags
    ];

    const roverTags = [
        {value: "safety", label: "Safety"},
        {value: "care-giving", label: "Care-giving"},
        {value: "understanding algorithms", label: "Understanding Algorithms"},
        ...commonTags
    ];

    const upworkTags = [
        {value: "scams", label: "Scams"},
        {value: "getting started", label: "Getting Started"},
        {value: "algorithm functionality", label: "Algorithm Functionality"},
        {value: "customers", label: "Customers"},
        ...commonTags
    ];

    const sharingOptions = [
        { value: 'private', label: 'Private' },
        { value: 'workers', label: 'Workers' },
        { value: 'policymakers', label: 'Policymakers' },
        { value: 'advocates', label: 'Advocates' }
    ];

    function handleClick() {
    const fileInput = document.getElementById('selectedFile');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  }

    async function handleFileChange (event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (url) {
      const imageRef = ref(storage, url)
      try {
        deleteObject(imageRef)
      } catch (error) {
        console.log(error)
      }
      
    }
    if (fileInput.files && fileInput.files.length > 0) {
      video = fileInput.files[0];
      fileName = video.name;
      try {
          const storageRef = ref(storage, 'stories/strategy/'+$page.data.user.uid+'/'+video.name)
          const result = await uploadBytes(storageRef, video)
          url = await getDownloadURL(result.ref)
          console.log('url uploaded')
      } catch (error) {
          console.log("error with video upload")
      }
    }
  }

    async function uploadContent() {
      if (uploading) {
        return
      }
        //error catching
        if (!type) {
            errorMessageType = "Please select a type"
        }
        else {
            errorMessageType = ""
        }

        if (tags.length == 0) {
            console.log("here")
            errorMessageTags = "Please select at least one tag"
        }
        else {
            errorMessageTags = ""
        }

        if (postSharing.length == 0) {
            errorMessageSharing = "Please choose a sharing preference"
        }
        else {
            errorMessageSharing = ""
        }

        if (errorMessageSharing != "" || errorMessageTags != "" || errorMessageType != "") {
            return
        }
        //end of error catching


        if (postSharing.includes('private')) {
            postSharing = ['private']
        }

        uploading = true
        // if (video) {
        //     try {
        //         const storageRef = ref(storage, 'stories/strategy/'+$page.data.user.uid+'/'+video.name)
        //         const result = await uploadBytes(storageRef, video)
        //         url = await getDownloadURL(result.ref)
        //     } catch (error) {
        //         console.log("error with video upload")
        //     }
        // }

        if (url) {
            try {
            await addDoc(collection(db, 'stories', $page.data.user.platform, "posts"), 
            { type, title, description, uid: $page.data.user.uid,
            url, date: new Date(), tags, platform: $page.data.user.platform, likes: [],
            sharing: postSharing

        })
        goto('/protected/stories/story_feed')
        } catch {
            uploading = false
        }
        }
        else {
            try {
                await addDoc(collection(db, 'stories', $page.data.user.platform, "posts"), {
                type, title, description, uid: $page.data.user.uid, date: new Date(),
                likes: [], tags, platform: $page.data.user.platform, sharing: postSharing

            })
            goto('/protected/stories/story_feed')
        } catch {
            uploading = false
            }
        }
    }

    function changeSharingPreferencesSingle() {
        postSharing = []
        sharePrivate = false
    }

    function changeSharingPreferencesMultiple(value:String[]) {
        if (value.includes("private")) {
            sharePrivate = true
        }
        if (postSharing.includes(value)) {
            postSharing = postSharing.filter(item => item !== value);
        } else {
            postSharing = [...postSharing, value];
        }
    }

    onMount(async()=>{
        let collectionRef = collection(db, "users", $page.data.user.uid, "settings")
        let docRef = doc(collectionRef, "sharing")
        let docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            postSharing = docSnap.data().sharing
        }
        if (postSharing.includes('private')) {
            sharePrivate = true
        }
    })

</script>
<p class="text-red-500">{errorMessageType}</p>
<!-- Issue/Strategy Selection -->

<div class="flex justify-center py-2">
    <div class="flex items-center space-x-2">
    <h2 class="font-medium whitespace-nowrap">Story Type:</h2>
    <ButtonGroup>
      {#each ['issue', 'strategy'] as option}
        <Button
        on:click={() => type = option}
        class={`flex-1 ${type === option ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200 text-gray-600 font-normal'} ${type === option ? 'focus:outline-none ring-2 ring-blue-500' : ''} hover:bg-transparent hover:text-current`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      {/each}
    </ButtonGroup>
  </div>
</div>

<!-- Tag selection -->
<h1 class="font-medium whitespace-nowrap py-5">
    Tag your story with related topics!</h1>
<p class="text-red-500">{errorMessageTags}</p>
{#if $page.data.user.platform == "rover"}
  <Tags tags={roverTags} bind:bindGroup={tags} />
{:else if $page.data.user.platform == "uber"}
  <Tags tags={uberTags} bind:bindGroup={tags} />
{:else if $page.data.user.platform == "upwork"}
  <Tags tags={upworkTags} bind:bindGroup={tags} />
{/if}
<p>{tags}</p>

<div class="py-5">
Title:
<Input placeholder="Short summary" bind:value={title}/>

<div class="mt-4">
Description:
<Textarea id="description" placeholder="Elaborate on your story here"
bind:value={description}
class="resize-none"
style="
  background-color: rgb(249, 250, 251); /* Light background */
  border: 1px solid rgb(209, 213, 219); /* Gray border */
  border-radius: 0.375rem; /* Rounded corners */
  padding: 0.5rem; /* Padding inside textarea */
  color: rgb(31, 41, 55); /* Text color */
"/>
</div>

<!-- https://stackoverflow.com/questions/1084925/input-type-file-show-only-button -->
<div class="flex items-center space-x-4 pt-5 justify-center">
    <input 
      type="button" 
      value="Browse" 
      on:click={handleClick} 
      class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700" 
    />
    <p class="text-center">{fileName}</p>
  </div>
  
  <input 
    type="file" 
    id="selectedFile" 
    style="display: none;" 
    accept="video/*,image/*" 
    on:change={handleFileChange} 
  />

  <div class = "flex items-center justify-center">
    {#if url}
    <img src={url} class="rounded-sm mt-2 object-contain w-1/2 " alt="" />
    {/if}
  </div>
</div>


<div class = "py-5">
    <h2 class="font-medium mb-5">Who Would You Like to Share Your Worker Data With?</h2>
    <p class="text-red-500">{errorMessageSharing}</p>
    {#if sharePrivate}
    <div class="space-y-2">
        <div class="flex justify-center">
          <ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
            <ToggleGroupItem value="private" data-state='on' class="font-bold">Private</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div class="flex justify-center space-x-2">
          <ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
            <ToggleGroupItem value="workers" disabled>Workers</ToggleGroupItem>
            <ToggleGroupItem value="policymakers" disabled>Policymakers</ToggleGroupItem>
            <ToggleGroupItem value="advocates" disabled>Advocates</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    {:else}
    <div class="space-y-2">
        <div class="flex justify-center">
          <ToggleGroup type="multiple" variant="outline" bind:value={postSharing} onValueChange={changeSharingPreferencesMultiple}>
            <ToggleGroupItem value={sharingOptions[0].value} class={postSharing.includes(sharingOptions[0].value) ? 'font-bold' : ''}>
              {sharingOptions[0].label}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div class="flex justify-center space-x-2">
          <ToggleGroup type="multiple" variant="outline" bind:value={postSharing} onValueChange={changeSharingPreferencesMultiple}>
            {#each sharingOptions.slice(1) as { value, label }}
              <ToggleGroupItem value={value} class={postSharing.includes(value) ? 'font-bold' : ''}>
                {label}
              </ToggleGroupItem>
            {/each}
          </ToggleGroup>
        </div>
      </div>
    {/if}
</div>

<div class="flex justify-center py-5">
  {#if uploading}
  <Button 
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    on:click={uploadContent}>
    <i class="fa-solid fa-spinner loadingSpinner animate-spin" />
  </Button>
  {:else}
  <BlueButton onclick={uploadContent} buttonText="Upload Content"></BlueButton>
  {/if}
</div>