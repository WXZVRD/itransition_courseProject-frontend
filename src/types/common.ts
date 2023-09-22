


export type UserId = string;

export type ReviewId = string;

export type CompositionId = string;

export enum CompositionTypes {
    books = "books",
    films = "films",
    games = "games",
}

export enum ACTION {
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface IComposition{
    author?: string,
    cover?: string,
    id?: string,
    title: string
}

export enum STATUS {
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}
