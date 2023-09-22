import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IAuthor} from "../../types/user/User";
import CommentsServices from "../../services/commentsServices";
import {STATUS} from "../../types/common";

export const fetchComments = createAsyncThunk('comments/fetchComments', async (reviewId: string) => {
    try {
        const resp = await CommentsServices.getAll(reviewId)
        return resp
    } catch (error){
        console.log(error)
    }
})

export const createComment = createAsyncThunk('comments/createComments', async (commentData: commnet) => {
    try {
        const resp = await CommentsServices.create(commentData)
        return resp
    } catch (error){
        console.log(error)
    }
})

interface commnet {
    reviewId: string,
    text: string
}

interface IComment {
    author: string,
    createdAt: string,
    id: string,
    reviewId: string,
    text: string,
    updatedAt: string,
    user: IAuthor,
}

interface IinitState {
    comments: IComment[],
    status: STATUS
}
const initialState: IinitState = {
    comments: [],
    status: STATUS.LOADING
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state: IinitState) => {
            state.comments = [];
            state.status = STATUS.LOADING;
        });

        builder.addCase(fetchComments.fulfilled, (state: IinitState, action: PayloadAction<IComment[]>) => {
            state.comments = action.payload;
            state.status = STATUS.LOADED;
        });

        builder.addCase(createComment.pending, (state: IinitState) => {
            state.status = STATUS.LOADING;
        });

        builder.addCase(createComment.fulfilled, (state: IinitState, action: PayloadAction<IComment>) => {
            state.comments = [
                ...state.comments,
                action.payload
            ]
            state.status = STATUS.LOADED;
        });

    }
})


export const commentsReducer = commentsSlice.reducer;


