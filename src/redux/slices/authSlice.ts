import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user/User";
import { RootState } from "../store";
import AuthService from "../../services/authService";

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
    try {
        const res = await AuthService.getMe();
        return res.data;
    } catch (error) {
        throw error;
    }
});

interface IinitState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: IinitState = {
    user: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuth = true;

                localStorage.setItem("userData", action.payload.token)
                localStorage.setItem("jwt_user_token", action.payload.user)
            });
    },
});

export const authReducer = authSlice.reducer;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;

export const { logout, setUserData } = authSlice.actions;
