import {RootState} from "../store";

export const selectUserList = (state: RootState) => state.user.usersList
export const selectUserListStatus = (state: RootState) => state.user.status