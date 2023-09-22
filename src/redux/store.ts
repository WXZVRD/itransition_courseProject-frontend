import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './slices/authSlice';
import {appReducer} from "./slices/appSlice";
import {commentsReducer} from "./slices/commentsSlice";
import {usersReducer} from "./slices/userSlice";
import {reviewReducer} from "./slices/reviewSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        comments: commentsReducer,
        user: usersReducer,
        reviews: reviewReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch