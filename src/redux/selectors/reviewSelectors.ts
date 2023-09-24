import {RootState} from "../store";

export const selectReviews = (state: RootState) => state.reviews.reviewList
export const selectReviewsStatus = (state: RootState) => state.reviews.status