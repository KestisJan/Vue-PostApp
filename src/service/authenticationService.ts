import axios from "axios";
import { type ILoginRequest} from "@/interface/ILogin";
import { type ILoginResponse } from "@/interface/ILogin";
import { type IUser } from "@/interface/IUser";


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true


axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default {
    async login(loginRequest: ILoginRequest): Promise<IUser | null> {

        try {
            const response = await axios.post<ILoginResponse>('/login', loginRequest, {
                headers: {'Content-Type': 'application/json'}
            })

            if (!response || !response.data) {
                console.error('Failed to login. No response or empty response data.')
                throw new Error('Failed to login. No response or empty response data.')
            }

            const { accessToken, user } = response.data

            if (!accessToken) {
                console.error('Failed to login. No JWT token received.');
                throw new Error('Failed to login. No JWT token received')
            }
            if (!user) {
                console.error('Failed to login. No user received.')
                throw new Error('Failed to login. No user received.');
            }

            localStorage.setItem('jwtToken', accessToken);
            localStorage.setItem('currentUser', JSON.stringify(user));

            return user;

        } catch (err: any) {
            console.error('Login failed:', err?.response || err);
            throw Error(
                `Failed to login. Status: ${err?.response?.status || 'unknown'} ${err?.response?.statusText || ''}. Message: ${err?.response?.data || err.message}`
            )
        }

    },

    async getUserById(id: number): Promise<IUser | null> {
        if (!localStorage.getItem('currentUser')) {
            console.error("Can't fetch use while not logged in");
            throw new Error("Cant fetch user while not logged in");
        }

        try {
            const response = await axios.get<IUser>(`/users/${id}`)

            return response.data;
        } catch (err: any) {
            console.error(`Failed to fetch user. Status: ${err?.response?.status || 'unknown'} ${err?.response?.statusText || ''}. Message: ${err?.response?.data || err.message}`);
            throw new Error(
                `Failed to fetch user. Status: ${err?.response?.status || 'unknown'} ${err?.response?.statusText || ''}. Message: ${err?.response?.data || err.message}`
            );
        }

    },

    async logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
    },
}