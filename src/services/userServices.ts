import instance from "../axios";
import {IReview} from "../types/review/Review";
import {UserId} from "../types/common";
import {IUser} from "../types/user/User";


export class UserServices{

    async getAll() {
        try {
            const response = await instance.get<IUser[]>("/user/getUsers");

            return response.data;
        } catch (error) {
            throw error
        }
    }

    async block(userId: string) {
        try {
            await instance.post("/user/blockUser", {userId: userId})
        } catch (error) {
            throw error
        }
    }

    async unblock(userId: UserId) {
        try {
            await instance.post("/user/unblockUser", { userId: userId })
        } catch (error) {
            throw error
        }
    }

    async makeAdmin(userId: UserId) {
        try {
            await instance.post("/user/makeAdmin", {userId: userId})
        } catch (error) {
            throw error
        }
    }

    async delete(userId: UserId) {
        try {
            await instance.post("/user/deleteUser", {userId: userId})
        } catch (error) {
            throw error
        }
    }

}

export default new UserServices