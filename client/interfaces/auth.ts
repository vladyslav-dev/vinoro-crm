export interface IUserLogin {
    login?: string;
    password?: string;
}

export interface IUser {
    id?: string;
    avatar?: string;
    username?: string;
    login?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}