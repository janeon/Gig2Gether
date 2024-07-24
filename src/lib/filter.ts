import { writable } from "svelte/store"

export const createFilterStore = (data) => {

    const {subscribe, set, update} = writable({
        data,
        filtered: data,
        filter: ''
    })

    return {
        subscribe,
        set,
        update
    }
}

export const filterHandler = (store) => {
    store.filtered = store.data.filter((item) => {
        return item.platform.includes(store.filter)
    })
    console.log(store.filtered)
}