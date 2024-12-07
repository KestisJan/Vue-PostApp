import type { IAuthor } from "./IAuthors";

export interface IPostAuthor {
    id?: number
    title?: string
    body?: string
    authorId?: number
    userId?: number
    created_at?: Date
    updated_at?: Date
    author?: IAuthor
}