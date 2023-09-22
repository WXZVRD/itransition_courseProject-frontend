import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IReview } from "../../types/review/Review";
import ReviewServices from "../../services/ReviewServices";
import {STATUS} from "../../types/common";

export const fetchReview = createAsyncThunk("reviews/fetchReview", async (userId: string) => {
    try {
        const resp = await ReviewServices.getByUser(userId);
        console.log(resp)
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const deleteReview = createAsyncThunk("reviews/deleteReview", async (reviewIds: string[]) => {
    try {
        const resp = await ReviewServices.delete(reviewIds);
        console.log(resp)
        return reviewIds;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

interface IInitState {
    reviewList: IReview[];
    status: STATUS
}

const initialState: IInitState = {
    reviewList: [],
    status: STATUS.LOADING
};

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReview.pending, (state) => {
                state.reviewList = [];
                state.status = STATUS.LOADING
            })
            .addCase(fetchReview.fulfilled, (state, action: PayloadAction<IReview[]>) => {
                state.reviewList = action.payload;
                state.status = STATUS.LOADED
            })
            .addCase(fetchReview.rejected, (state) => {
                state.reviewList = [];
                state.status = STATUS.ERROR
            })
            .addCase(deleteReview.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(deleteReview.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.reviewList = state.reviewList.filter(review => !action.payload.includes(review.id || ""));
                state.status = STATUS.LOADED;
            })
            .addCase(deleteReview.rejected, (state) => {
                state.status = STATUS.ERROR
            });




    },
});

export const reviewReducer = reviewSlice.reducer;
