import { writable } from "svelte/store"

export const createFilterStore = (data) => {

    const {subscribe, set, update} = writable({
        data,
        filtered: data,
        platform_filter: ['rover', 'uber', 'upwork'],
        type_filter: ['issue','strategy']
    })

    return {
        subscribe,
        set,
        update
    }
}

export const filterHandler = (store) => {
    store.filtered = store.data.filter((item) => {
        console.log(item)
        //  && store.type_filter.includes(item.type)
        // return (store.platform_filter.includes(item.platform))
        return (store.platform_filter.includes(item.platform) && store.type_filter.includes(item.type))
    })
}