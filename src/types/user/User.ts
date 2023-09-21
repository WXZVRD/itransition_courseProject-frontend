import {UserId} from "../common";


export interface IUser {
    id: UserId,
    name: string,
    avatar: string,
    isAdmin: boolean,
    isBlocked: boolean,
    likes: number
}

export interface IAuthor {
    id: UserId,
    name: string,
    secondName?: string,
    avatar: string,
    likes: number
}
