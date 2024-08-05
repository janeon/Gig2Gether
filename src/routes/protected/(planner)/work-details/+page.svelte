<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/components/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { MultiSelect, Label, NumberInput, Input } from "flowbite-svelte";
    import { goto } from "$app/navigation";


    let successMessage = '';
    let errorMessage = '';

    // Uber Details
    let uberData = {
        carSituation: [],
        vehicleType: 0,
        passengerTime: 0,
        platfromCut: 0,
        gasPrice: 0,
        carMileage: 0,
        carPayments: 0,
        healthcare: 0,
        miscExpenses: 0,
    }

    // Rover Details
    let roverData = {
        transportation: [],
        preferedTimes: [],
        platformCut: 0,
        gas: 0,
        equipment: 0,
        miscExpenses: 0,
        healthCare: 0,
        damageCost: 0,
        petType: [],
    }

    // UpWork Details
    let upworkData = {
        platformCut: 0,
        internetHome: 0,
        equipmentPurchase: 0,
        miscExpenses: 0,
        healthCare: 0,
        insurance: 0,
        software: 0,
    }

    const transportationRover = [
        { value: "Bus", name: "Bus" },
        { value: "Drive", name: "Drive" },
        { value: "Walk", name: "Walk" },
        { value: "Uber", name: "Uber" },
    ]

    const petTypeRover = [
        { value: "smallDog", name: "Small Dog" },
        { value: "mediumDog", name: "Medium Dog" },
        { value: "largeDog", name: "Large Dog" },
        { value: "giantDog", name: "Giant Dog" },
        { value: "cat", name: "Cat" }
    ]

    const roverTimes = [
        { value: "Before-8", name: "Before 8am" },
        { value: "8am-9am", name: "8am-9am" },
        { value: "9am-10am", name: "9am-10am" },
        { value: "10am-11am", name: "10am-11am" },
        { value: "11am-12pm", name: "11am-12pm" },
        { value: "12pm-1pm", name: "12pm-1pm" },
        { value: "1pm-2pm", name: "1pm-2pm" },
        { value: "2pm-3pm", name: "2pm-3pm" },
        { value: "3m-4pm", name: "3m-4pm" },
        { value: "4pm-5pm", name: "4pm-5pm" },
        { value: "5pm-6pm", name: "5pm-6pm" },
        { value: "6m-7pm", name: "6m-7pm" },
        { value: "7pm-8pm", name: "7pm-8pm" },
        { value: "9pm-10pm", name: "9pm-10pm" },
        { value: "10m-11pm", name: "10m-11pm" },
        { value: "11pm+", name: "11pm+" },
    ]


    const carSit = [
        { value: "rent", name: "Renting" },
        { value: "own", name: "Own Car" },
        { value: "financeLease", name: "Financing/Leasing to own" },
    ]

    async function backClick () {
        goto('/protected/work-time')
    }

    async function submitOtherVariables() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "upload")
        const docRef = doc(collectionRef, "plannerVariables") // Separate by gig work manual inputs?
        successMessage = "Input Submitted Successfully!"

        goto('/protected/work-breakdown')
        if ($page.data.user?.platform == "uber") {
            setDoc(docRef, uberData, { merge: true })
            goto('/protected/work-breakdown')
            // successMessage = "Input Submitted Successfully!"  - add when roles are implemented
        }
        else if ($page.data.user?.platform == "rover") {
            setDoc(docRef, roverData, { merge: true })
            goto('/protected/work-breakdown')
            // successMessage = "Input Submitted Successfully!"  - add when roles are implemented
        }
        else if ($page.data.user?.platform == "upwork") {
            setDoc(docRef, upworkData, { merge: true })
            goto('/protected/work-breakdown')
            // successMessage = "Input Submitted Successfully!"  - add when roles are implemented
        }
    }
</script>

<div class="flex flex-row">
    <UploadSidebar />
    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Other Variables</h1>
        {#if $page.data.user?.platform == "uber"}
            <h2 class="text-xl font-semibold mb-4">Uber</h2>

            <div class="w-full max-w-md space-y-5">

                <div class="flex flex-col">
                    <Label>What is your car situation?</Label>
                    <MultiSelect items={carSit} bind:value={uberData.carSituation} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Vehicle Type</Label>
                    <Input type="text" bind:value={uberData.vehicleType} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Percent of time with passengers</Label>
                    <NumberInput bind:value={uberData.passengerTime} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Platform Cut</Label>
                    <NumberInput bind:value={uberData.platfromCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Price of gas</Label>
                    <NumberInput bind:value={uberData.gasPrice} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Your car's mileage</Label>
                    <NumberInput bind:value={uberData.carMileage} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Monthly Car/ rental payments</Label>
                    <NumberInput bind:value={uberData.carPayments} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Healthcare</Label>
                    <NumberInput bind:value={uberData.healthcare} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Miscellaneous Expenses</Label>
                    <NumberInput bind:value={uberData.miscExpenses} class="mt-1" />
                </div>


            </div>

        {:else if $page.data.user?.platform == "rover"}
            <h2 class="text-xl font-semibold mb-4">Rover</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Transportation</Label>
                    <MultiSelect items={transportationRover} bind:value={roverData.transportation} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>What are your prefered times?</Label>
                    <MultiSelect items={roverTimes} bind:value={roverData.preferedTimes} class="mt-1" />
                </div>

            
                <div class="flex flex-col">
                    <Label>Platforms Cut (%)</Label>
                    <NumberInput bind:value={roverData.platformCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Price of gas</Label>
                    <NumberInput bind:value={roverData.gas} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Equipment Purchase</Label>
                    <NumberInput bind:value={roverData.equipment} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Miscellaneous Expenses</Label>
                    <NumberInput bind:value={roverData.miscExpenses} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Healthcare</Label>
                    <NumberInput bind:value={roverData.healthCare} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Cost of Damage</Label>
                    <NumberInput bind:value={roverData.damageCost} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Transportation</Label>
                    <MultiSelect items={petTypeRover} bind:value={roverData.petType} class="mt-1" />
                </div>
            </div>

        {:else if $page.data.user?.platform == "upwork"}
            <h2 class="text-xl font-semibold mb-4">UpWork</h2>

            <div class="w-full max-w-md space-y-5">
                <div class="flex flex-col">
                    <Label>Platforms Cut Percentage</Label>
                    <NumberInput bind:value={upworkData.platformCut} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Internet/Home Fee</Label>
                    <NumberInput bind:value={upworkData.internetHome} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Equipment Purchase</Label>
                    <NumberInput bind:value={upworkData.equipmentPurchase} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Miscellaneous</Label>
                    <NumberInput type="text" bind:value={upworkData.miscExpenses} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Healthcare</Label>
                    <NumberInput bind:value={upworkData.healthCare} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Insurance Expenses</Label>
                    <NumberInput type="text" bind:value={upworkData.insurance} class="mt-1" />
                </div>

                <div class="flex flex-col">
                    <Label>Software Expenses</Label>
                    <NumberInput type="text" bind:value={upworkData.software} class="mt-1" />
                </div>
            </div>
        {/if}
        <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded mr-8"
                on:click={backClick}>
                backClick
            </button>
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={submitOtherVariables}>
                Continue
            </button>
            {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
             {/if}
            {#if errorMessage}
                <p class = "text-red-600 mt-2">{errorMessage}</p>
            {/if}
        </div>
    </div>
</div>
