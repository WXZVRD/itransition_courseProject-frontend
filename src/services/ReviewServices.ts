
import instance from "../axios";
import {IReview} from "../types/review/Review";
import {CompositionId, ReviewId, UserId} from "../types/common";

class ReviewService{

    async search(searchQuery: string){
        try {
            const response = await instance.get("/review/search", {
                params: {
                    query: searchQuery,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async create(reviewData: any){
        try {
            const review = {
                product: {
                    id: reviewData.composition.id.toString(),
                    title: reviewData.composition.title,
                    type: reviewData.category,
                    averageRating: parseFloat(reviewData.rating)
                },
                title: reviewData.title,
                text: reviewData.text,
                img: reviewData.img,
                tags: reviewData.tags

            }

            console.log(review)
            await instance.post<IReview>("/review/create", review);
        } catch (error) {
            throw error
        }
    }

    async getById(reviewId: ReviewId, userId?: string): Promise<IReview> {
        try {
            const params: Record<string, string | undefined> = {};

            if (userId !== undefined) {
                params.userId = userId;
            }

            const response = await instance.get("/review/getById", {
                params: {
                    reviewId,
                    ...params,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getSimilar(productId: CompositionId): Promise<IReview[]>{
        try {
            const response = await instance.get("/review/similar", {
                params: {
                    productId: productId
                }
            });

            return response.data;
        } catch (error) {
            throw error
        }
    }

    async delete(reviewId: ReviewId) {
        try {
            await instance.delete(`/review/delete/${reviewId}`);
        } catch (error) {
            throw error
        }
    }

    async getTags() {
        interface Tag {
            title: string
        }
        try {
            const tags = await instance.get<Tag[]>(`/review/tags`);
            return tags.data
        } catch (error) {
            throw error
        }
    }

    async uploadImg(imageFile: File): Promise<string>{
        try {
            const formData = new FormData();
            formData.append("img", imageFile);

            const response = await instance.post<string>("/review/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (error) {
            throw error
        }
    }

    async rateProduct(rateForm: any){
        try {
            await instance.post<IReview>("/review/rateProduct", rateForm);
        } catch (error) {
            throw error
        }
    }

    async getTopRated(): Promise<IReview[]> {
        try {
            const response = await instance.get<IReview[]>("/review/topRated");
            return response.data;
        } catch (error) {
            throw error
        }
    }

    async getLatest(): Promise<IReview[]> {
        try {
            const response = await instance.get<IReview[]>("/review/latest");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async like(reviewId: ReviewId, authorId: UserId) {
        try {
            await instance.post<IReview>("/review/putLike", { reviewId, authorId });
        } catch (error) {
            throw error
        }
    }

}

export default new ReviewService()