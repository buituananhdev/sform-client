export interface IUser {
    name?: string
    password: string
    email: string
}
export interface IAuthState {
    user: IUser
    isLoggedIn?: boolean
}
