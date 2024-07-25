export interface Post {
    title: string,
    description: string,
    url: string,
    uid: string,
    date: Date,
    tags: string[],
    type: string
}

export interface Data {
    type: string,
    date: Date,
    title: string,
    id: string
}