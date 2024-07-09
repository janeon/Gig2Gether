<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase";
    import Sidebar from "$lib/Sidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { MultiSelect, Label, NumberInput, Input } from "flowbite-svelte";
    let email = $page.data.user?.email
    //UBER

    let uberData = {
        rating : 0,
        car : '',
        services : []
    }
    // let uberRating : number = 0
    // let carDriven : string = ''
    // // TODO:: times, cities served, tenure
    // let uberServicesProvided : string[] = []
    //TODO: check services
    const uberServices = [{value: "x", name: "UberX"},
        {value: "xl", name: "UberXL"},
        {value: "share", name: "UberX Share"},
        {value: "comfort", name: "UberX Comfort"},
        {value: "black", name: "Uber Black"},
        {value: "black suv", name: "Uber Black SUV"},
        {value: "WAV", name: "Uber WAV"},
        {value: "car seat", name: "Uber Car Seat X"},
        {value: "green", name: "Uber Green"},
        {value: "taxi", name: "Uber Taxi"}
    ]

    //ROVER

    let roverData = {
        rating : 0,
        pets : [],
        services : []
    }
    // // TODO: Available times
    // let roverRating : number
    // let roverCitiesServed = []
    // // How do we account for different cities (misspellings?)
    // // What should tenure be measured in?
    // let petsAccepted : string[] = []
    const pets = [{value:"small dog", name:"Small Dog"}, 
    {value:"medium dog", name:"Medium Dog"}, 
    {value:"giant dog", name:"Giant Dog"},
    {value:"cat", name:"Cat"},
    {value:"puppy", name:"Puppy"}]
    let roverServicesProvided : string[] = []
    const roverServices = [{value: "boarding", name: "Boarding"},
        {value: "house sitting", name: "House Sitting"},
        {value: "drop-in", name: "Drop-In Visits"},
        {value: "day care", name: "Doggy Day Care"},
        {value: "dog walking", name: "Dog Walking"}
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

<div class = "flex flex-row">
    <Sidebar/>
    <div class = "p-8">
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
                <MultiSelect items={uberServices} bind:value={uberData.services}/>
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
                <MultiSelect items={pets} bind:value={roverData.pets}/>
             </div>

             <div class = "py-5">
                <Label>Services Offered</Label>
                <MultiSelect items={roverServices} bind:value={roverData.services}/>
             </div>
        </div>

        {:else if $page.data.user?.platform == "upwork"}
            <h1>UpWork</h1>
        {/if}
        <button on:click = {submitProfile}>Submit</button>
    </div>
</div>
