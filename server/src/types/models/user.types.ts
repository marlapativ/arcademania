export interface IUser {
    name: string,
    email: string,
    username: string,
    password: string,
    accesstoken: string,
    token: [string],
    comparePassword: (password: string) => Promise<boolean>;
}

export interface ISignInUser{
    username: string,
    password: string
}

export interface IUserInfo {
    userId: string;
    name: string;
    icon?: string;
};