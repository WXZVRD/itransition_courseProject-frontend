import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/user/User";
import {RootState} from "../store";

interface IinitState {
    user: IUser | null,
    isAuth: Boolean
}

const initialState: IinitState = {
    user: null,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAuthData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.user = {
                id: '',
                name: '',
                avatar: '',
                isAdmin: false,
                isBlocked: false,
                likes: 0
            }
            state.isAuth = false
        },
    }
})


export const authReducer = authSlice.reducer;


export const isAuth = (state: RootState) => Boolean(state.auth.user)

export const { logout, getAuthData } = authSlice.actions;
