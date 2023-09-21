import instance from "../axios";
import {ReviewId} from "../types/common";


export class CommentsServices{

    async getAll( reviewId: ReviewId) {
        try {
            const response = await instance.get("/comment/getAll", {
                params: {
                    reviewId
                }
            });

            return response.data;
        } catch (error) {
            throw error
        }
    }

    async create(comment: any) {
        try {
            const resp = await instance.post("/comment/create", comment);
            return resp.data
        } catch (error) {
            throw error
        }
    }
}

export default new CommentsServices()