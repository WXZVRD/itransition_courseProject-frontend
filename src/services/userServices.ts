import instance from "../axios";
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

    async getOneUser( userId: string ) {
        try {
            console.log("FETCHING USER SERVICE")

            const response = await instance.get<IUser>("/user/getOneUser", {
                params: {
                    userId
                }
            });

            return response.data;
        } catch (error) {
            throw error
        }
    }

    async block(usersId: string[]) {
        try {
            await instance.post("/user/blockUser", usersId)
        } catch (error) {
            throw error
        }
    }

    async unblock(usersId: string[]) {
        try {
            await instance.post("/user/unblockUser", usersId)
        } catch (error) {
            throw error
        }
    }

    async makeAdmin(usersId: string[]) {
        try {
            await instance.post("/user/makeAdmin", usersId)
        } catch (error) {
            throw error
        }
    }

    async delete(usersId: string[]) {
        try {
            await instance.post("/user/deleteUser", usersId)
        } catch (error) {
            throw error
        }
    }

}

export default new UserServices