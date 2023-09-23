import instance from "../axios";


export class AuthService {
    async getMe() {
        try {
            const res = await instance.get('auth/login', { withCredentials: true });
            if (res.status === 200) {
                return res;
            } else {
                throw new Error(`Failed to fetch user data. Status: ${res.status}`);
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService()