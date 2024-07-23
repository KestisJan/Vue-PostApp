import { defineStore } from "pinia";
import { type IUser } from "@/interface/IUser";
import { type ILoginRequest } from "@/interface/ILogin"; 
import { ref, readonly } from 'vue' 
import { useNotificationStore } from "./NotificationStore";
import { jwtDecode } from 'jwt-decode'
import authenticationService from "@/service/authenticationService";


export const useCurrentUserStore = defineStore('current-user-store', () => {
    const notificationStore = useNotificationStore()
    const storedUser = localStorage.getItem('currentUser')
    const currentUser = ref<IUser | null >(storedUser ? (JSON.parse(storedUser) as IUser): null)

    const reload = async () => {
        try {
          const token = localStorage.getItem('jwtToken');
          
          if (currentUser.value && !token) {
            await logout();
            return;
          }
      
          if (!token) return;
      
          let payload: any;
          try {
            payload = jwtDecode(token);
          } catch (error) {
            console.error('Failed to decode token:', error);
            await logout();
            return;
          }
      
          const currentTime = Math.floor(Date.now() / 1000);
      
          if (!payload || !payload.exp || payload.exp < currentTime) {
            await logout();
            return;
          }
      
          if (!currentUser.value) {
            const userJSON = localStorage.getItem('currentUser');
            if (!userJSON) return null;
      
            let user: IUser;
            try {
              user = JSON.parse(userJSON);
            } catch (error) {
              console.error('Failed to parse user JSON:', error);
              return null;
            }
      
            if (user.id && user.email && user.name) {
              currentUser.value = user;
            }
          }
        } catch (error) {
          console.error('Error during reload:', error);
        }
      };

      const login = async (email: string, password: string): Promise<boolean> => {
        try {
            if (!email || !password) {
                throw Error('Failed to login invalid email or password')
            }

            const loginRequest: ILoginRequest = {
                email,
                password
            }

            const user: IUser | null = await authenticationService.login(loginRequest)

            if (!user) {
                throw new Error('Failed to login: no user received from request.')
            } 
            if (!localStorage.getItem('jwtToken')) {
                throw new Error('Failed to login: no jwtToken was set.')
            }

            currentUser.value = user
            notificationStore.success('Successfully logged in.')

            return true
        } catch (err: any) {
            notificationStore.warning('Failed to login:' + err.message)
            return false
        }
      };
























})