import {CompositionId, CompositionTypes, ReviewId, UserId} from "../common";
import {IAuthor} from "../user/User";
import {IProduct} from "../product/product";




export interface IReview {
    id?: ReviewId,
    productId: CompositionId,
    product: IProduct,
    author: UserId
    type: CompositionTypes,
    title: string,
    text: string,
    img?: string,
    tags: string[],
    grade: number,
    likes?: UserId[],
    averageRating?: number,
    createdAt?: string,
    updatedAt?: string,
    reviewerRate?: number,
    user?: IAuthor
}