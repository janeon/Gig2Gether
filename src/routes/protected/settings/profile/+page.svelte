<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import Sidebar from "$lib/components/SettingsSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import MultiSelect from 'svelte-multiselect'
    import {Label, NumberInput, Input } from "flowbite-svelte";
    import us_cities from "$lib/us_cities.json"
    //UBER

    let uberData = {
        rating : 0,
        car : '',
        services : [],
        cities : [],
        dateJoined : new Date()
    }
    // let uberRating : number = 0
    // let carDriven : string = ''
    // // TODO:: times, cities served, tenure
    // options for years and months and days (default to 0)
    // make a document that holds cities
    // work on times
    // let uberServicesProvided : string[] = []
    //TODO: check services
    const uberServices = ["UberX",
        "UberXL",
        "UberX Share",
        "UberX Comfort",
        "Uber Black",
        "Uber Black SUV",
        "WAV",
        "Uber Car Seat X",
        "Uber Green",
        "Uber Taxi"
    ]

    //ROVER

    let roverData = {
        rating : 0,
        pets : [],
        services : [],
        cities : [],
        dateJoined : new Date()
    }
    // // TODO: Available times
    // let roverRating : number
    // let roverCitiesServed = []
    // // How do we account for different cities (misspellings?)
    // // What should tenure be measured in?
    // let petsAccepted : string[] = []
    const pets = ["Small Dog", 
    "Medium Dog", 
    "Giant Dog",
    "Cat",
    "Puppy"]

    const roverServices = ["Boarding",
        "House Sitting",
        "Drop-In Visits",
        "Doggy Day Care",
        "Dog Walking"
    ]

    // Cancellation policy?

    async function submitProfile() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings")
        const docRef = doc(collectionRef, "profile")
        if ($page.data.user?.platform == "uber") {
            setDoc(docRef, uberData, {merge: true})
        }
        else if ($page.data.user?.platform == "rover") {
            setDoc(docRef, roverData, {merge: true})
        }
    }
</script>

<h1>Worker Information</h1>
{#if $page.data.user?.platform == "uber"}
    <h1>Uber</h1>
    <div class = "py-5">
        <Label>Uber Rating</Label>
        <NumberInput type="number"  bind:value={uberData.rating}/>
        </div>

    <div class = "py-5">
        <Label>Car Driven</Label>
        <Input bind:value={uberData.car} />
    </div>

    <div class = "py-5">
        <Label>Services Provided</Label>
        <MultiSelect options={uberServices} bind:selected={uberData.services}/>
    </div>

    <div class = "py-5">
        <Label>Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={uberData.cities}/>
        </div>

        <div class = "py-5">
        <Label>Date of Joining Uber</Label>
        <Input type="date" bind:selected={uberData.dateJoined}/>
        </div>


{:else if $page.data.user?.platform == "rover"}
<div>
    <h1>Rover</h1>
    <!-- Need to incorporate available times -->
        <div class = "py-5">
        <Label>Rover Rating</Label>
        <NumberInput type="number"  bind:value={roverData.rating}/>
        </div>

        <div class = "py-5">
        <Label>Pets Accepted</Label>
        <MultiSelect options={pets} bind:selected={roverData.pets}/>
        </div>

        <div class = "py-5">
        <Label>Services Offered</Label>
        <MultiSelect options={roverServices} bind:selected={roverData.services}/>
        </div>

        <div class = "py-5">
        <Label>Cities Served</Label>
        <MultiSelect options={us_cities.cities} bind:selected={roverData.cities}/>
        </div>

        <div class = "py-5">
        <Label>Date of Joining Rover</Label>
        <Input type="date" bind:selected={roverData.dateJoined}/>
        </div>
</div>

{:else if $page.data.user?.platform == "upwork"}
    <h1>UpWork</h1>
{/if}
<button on:click = {submitProfile}>Submit</button>