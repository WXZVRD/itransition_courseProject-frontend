import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/user/User";
import UserServices from "../../services/userServices";
import {STATUS} from "../../types/common";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const resp = await UserServices.getAll();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (usersId: string[]) => {
    try {
        await UserServices.delete(usersId);
        return usersId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const blockUsers = createAsyncThunk("users/blockUsers", async (usersId: string[]) => {
    try {
        await UserServices.block(usersId);
        return usersId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const unblockUsers = createAsyncThunk("users/unblockUsers", async (usersId: string[]) => {
    try {
        await UserServices.unblock(usersId);
        return usersId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const makeAdmin = createAsyncThunk("users/makeAdmin", async (usersId: string[]) => {
    try {
        await UserServices.makeAdmin(usersId);
        return usersId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

interface IinitState {
    usersList: IUser[],
    status: STATUS
}
const initialState: IinitState = {
    usersList: [],
    status: STATUS.LOADING
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.usersList = action.payload
                state.status = STATUS.LOADED
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.usersList = []
                state.status = STATUS.ERROR
            })

            .addCase(deleteUsers.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(deleteUsers.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.usersList = state.usersList.filter(user => !action.payload.includes(user.id));
                state.status = STATUS.LOADED
            })
            .addCase(deleteUsers.rejected, (state) => {
                state.usersList = []
                state.status = STATUS.ERROR
            })

            .addCase(blockUsers.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(blockUsers.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.usersList = state.usersList.map(user => ({
                    ...user,
                    isBlocked: action.payload.includes(user.id)
                }));
                state.status = STATUS.LOADED;
            })
            .addCase(blockUsers.rejected, (state) => {
                state.status = STATUS.ERROR
            })

            .addCase(unblockUsers.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(unblockUsers.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.usersList = state.usersList.map(user => ({
                    ...user,
                    isBlocked: !action.payload.includes(user.id)
                }));
                state.status = STATUS.LOADED;
            })
            .addCase(unblockUsers.rejected, (state) => {
                state.usersList = []
                state.status = STATUS.ERROR
            })

            .addCase(makeAdmin.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(makeAdmin.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.usersList = state.usersList.map(user => ({
                    ...user,
                    isAdmin: action.payload.includes(user.id)
                }));
                state.status = STATUS.LOADED;
            })
            .addCase(makeAdmin.rejected, (state) => {
                state.usersList = []
                state.status = STATUS.ERROR
            })
    },
})

export const usersReducer = userSlice.reducer



