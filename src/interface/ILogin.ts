import { type IUser } from "./IUser"

export interface ILoginRequest {
    email: string
    password: string
  }

  
export interface ILoginResponse {
  accessToken: string
  user: IUser
}
