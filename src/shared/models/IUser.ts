export interface IUser {
    _id?: string,
    username: string,
    email: string,
    password: string,
    rol: number,
    firstTimeLogin: boolean,
    verified: boolean
}
