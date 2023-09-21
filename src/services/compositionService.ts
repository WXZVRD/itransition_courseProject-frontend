import instance from "../axios";
import {IReview} from "../types/review/Review";
import {CompositionTypes, IComposition} from "../types/common";


export class CompositionService{

    async getOne(type: CompositionTypes, query: string) {
        try {
            const response = await instance.get<IComposition[]>(`/api/${type}`, {
                params: {
                    query: query
                }
            });


            return response.data;
        } catch (error) {
            throw error
        }
    }

}

export default new CompositionService