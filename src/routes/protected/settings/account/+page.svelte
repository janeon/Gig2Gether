<script lang="ts">
    import { page } from "$app/stores";
    import { Label, Input } from "flowbite-svelte";
    import { capitalize } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    import BlueButton from "$lib/components/BlueButton.svelte";
    import { collection, getCountFromServer, query, where, updateDoc, doc } from "firebase/firestore";
    import { db } from "$lib/firebase/client";
    updateTitle("My Account");
    let credentials = $page.data.user?.credentials
    $: username = $page.data.user?.username
    let platform = capitalize($page.data.user?.platform)

    let changeUsername = false
    let newUsername = ""
    $:  usernameError = ""

    const setChangeUsername = () => {
        changeUsername = true
    }

    const submitUsername = async() => {
        if (newUsername.length < 4) {
			usernameError = "Username must be at least 4 characters"
			return
		}
		const count = await getCountFromServer(query(collection(db, 'users'), where('username', '==', newUsername)))
		if (count.data().count > 0) {
			usernameError = "Username is in use"
			return
		}
        usernameError = ""
        await updateDoc(doc(db, 'users', $page.data.user.uid), {username: newUsername})
        username = newUsername
        changeUsername = false
        newUsername = ""
    }
</script>

<div class="py-5">
    <Label class="block mb-4">
        My Email/Phone: {credentials}</Label>
    <Label class="block mb-4">
        Platform: {platform}</Label>
    <Label class="block">
        Username: {username}</Label>
    {#if changeUsername}
        <Input bind:value={newUsername} placeholder="Username" name="username" class="px-4 pt-2 border border-gray-300 rounded-md" />
        <p class="text-xs">Choose a username without any identifiable information.</p>
        <p class="text-red-500">{usernameError}</p>
        <BlueButton onclick={submitUsername} buttonText="Submit"/>
    {:else}
    <BlueButton onclick={setChangeUsername} buttonText="Change Username"/>
    {/if}
</div>
<!-- <div>
    <Label>My Phone</Label>
    <p>{email}</p>
</div> -->
