import { writable } from "svelte/store"

export const createFilterStore = (data) => {

    const {subscribe, set, update} = writable({
        data,
        filtered: data,
        platform_filter: '',
        type_filter: ''
    })

    return {
        subscribe,
        set,
        update
    }
}

export const filterHandler = (store) => {
    store.filtered = store.data.filter((item) => {
        return (item.platform.includes(store.platform_filter) && item.type.includes(store.type_filter))
    })
}